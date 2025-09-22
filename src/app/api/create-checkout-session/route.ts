import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripeSecret = process.env.STRIPE_SECRET_KEY
const weeklyPriceId = process.env.STRIPE_WEEKLY_PRICE_ID // price_... for $7/week

const stripe = stripeSecret ? new Stripe(stripeSecret) : (null as unknown as Stripe)

export async function POST(req: Request) {
  if (!stripe || !weeklyPriceId) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: weeklyPriceId, quantity: 1 }],
      subscription_data: { trial_period_days: 1 },
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error("create-checkout-session error", e)
    return NextResponse.json({ error: "Unable to create session" }, { status: 500 })
  }
}


