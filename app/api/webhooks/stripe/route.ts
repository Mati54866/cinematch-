import { NextRequest, NextResponse } from 'next/server'
import { stripe, getStripeWebhookSecret } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/admin'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, getStripeWebhookSecret())
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  const admin = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.user_id
        const customerId = session.customer as string

        if (userId) {
          const { error: updateError } = await admin
            .from('profiles')
            .update({
              plan: 'pro',
              stripe_customer_id: customerId,
              stripe_subscription_id: session.subscription as string,
            })
            .eq('id', userId)

          if (updateError) throw updateError
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile, error: profileError } = await admin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profileError) throw profileError
        if (!profile) throw new Error('Stripe customer profile not found')

        const isActive = ['active', 'trialing'].includes(subscription.status)
        const { error: updateError } = await admin
          .from('profiles')
          .update({
            plan: isActive ? 'pro' : 'free',
            stripe_subscription_id: subscription.id,
          })
          .eq('id', profile.id)

        if (updateError) throw updateError
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile, error: profileError } = await admin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profileError) throw profileError
        if (!profile) throw new Error('Stripe customer profile not found')

        const { error: updateError } = await admin
          .from('profiles')
          .update({
            plan: 'free',
            stripe_subscription_id: null,
          })
          .eq('id', profile.id)

        if (updateError) throw updateError
        break
      }

      default:
        // Unhandled event type
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
