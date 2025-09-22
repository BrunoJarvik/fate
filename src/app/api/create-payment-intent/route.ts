import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripeSecret = process.env.STRIPE_SECRET_KEY

if (!stripeSecret) {
  console.warn("STRIPE_SECRET_KEY is not set. The create-payment-intent route will return 500.")
}

const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: "2024-06-20" }) : (null as unknown as Stripe)

// Small plan → amount (in cents) mapping. Keep amounts on the server.
const PLAN_TO_AMOUNT: Record<string, number> = {
  oneMonth: 1499,
  threeMonths: 3499,
  twelveMonths: 9999,
}

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
    }

    const body = await request.json().catch(() => ({})) as { plan?: string; email?: string }
    const plan = body.plan || "oneMonth"
    const amount = PLAN_TO_AMOUNT[plan]

    if (!amount) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { plan },
      receipt_email: body.email?.toString().slice(0, 200),
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error("create-payment-intent error", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
