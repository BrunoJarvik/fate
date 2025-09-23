import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripeSecret = process.env.STRIPE_SECRET_KEY
const monthlyPriceId = process.env.STRIPE_PRICE_MONTHLY || process.env.STRIPE_WEEKLY_PRICE_ID // fallback to weekly

if (!stripeSecret) {
  console.warn("STRIPE_SECRET_KEY is not set. The create-checkout-session route will return 500.")
}
if (!monthlyPriceId) {
  console.warn("STRIPE_PRICE_MONTHLY is not set. The create-checkout-session route will return 500.")
}

const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : (null as unknown as Stripe)

export async function POST(req: Request) {
  if (!stripe || !monthlyPriceId) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: monthlyPriceId, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
      // Enables Card + Apple Pay + Google Pay where eligible:
      automatic_payment_methods: { enabled: true },
      success_url: `${origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (e) {
    console.error("create-checkout-session error", e)
    return NextResponse.json({ error: "Unable to create session" }, { status: 500 })
  }
}


