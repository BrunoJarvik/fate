"use client"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { loadStripe, StripeElementsOptions, type PaymentRequest } from "@stripe/stripe-js"
import { Elements, PaymentElement, useElements, useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

type Plan = {
  name: string
  price: string
  cycle: string
  features: string[]
  badge?: string
  gifts?: string[]
  popular?: boolean
  valueNote?: string
  planKey: "oneMonth" | "threeMonths" | "twelveMonths"
}
const plans: Plan[] = [
  {
    name: "Daily Prayer Access",
    price: "$0.99/day",
    cycle: "",
    features: [
      "1-day free trial",
      "Guided prayers, reminders, journaling",
      "Cancel anytime",
    ],
    badge: "Start Free",
    popular: true,
    valueNote: "Billed weekly at $7 after 1-day free",
    planKey: "oneMonth",
  },
  {
    name: "Daily Prayer Access",
    price: "$0.99/day",
    cycle: "",
    features: [
      "1-day free trial",
      "Guided prayers, reminders, journaling",
      "Cancel anytime",
    ],
    valueNote: "Billed weekly at $7 after 1-day free",
    planKey: "threeMonths",
  },
  {
    name: "Daily Prayer Access",
    price: "$0.99/day",
    cycle: "",
    features: [
      "1-day free trial",
      "Guided prayers, reminders, journaling",
      "Cancel anytime",
    ],
    valueNote: "Billed weekly at $7 after 1-day free",
    planKey: "twelveMonths",
  },
]

export function Pricing() {
  const [open, setOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  function handleSelect(p: Plan) {
    setSelectedPlan(p)
    setOpen(true)
    console.log("start_checkout", { plan: p.name })
  }

  useEffect(() => {
    async function createIntent() {
      if (!open || !selectedPlan) return
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: selectedPlan.planKey }),
        })
        const data = await res.json()
        if (data?.clientSecret) setClientSecret(data.clientSecret)
      } catch (e) {
        console.error(e)
      }
    }
    createIntent()
  }, [open, selectedPlan])

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!clientSecret) return undefined
    return { clientSecret, appearance: { theme: "stripe" } }
  }, [clientSecret])

  return (
    <section id="pricing" className="border-y border-border/60 bg-muted">
      <div className="container px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl md:text-4xl text-center md:text-left">Choose your plan</h2>
        <p className="mt-2 text-neutral-700 text-center md:text-left">
          14-day money-back guarantee on your first purchase. Cancel anytime in-app.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Card key={i} className={cn("rounded-2xl border", p.popular ? "border-primary shadow-soft" : "")}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-semibold">{p.name}</div>
                  {p.badge && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-col">
                  <div className="text-3xl font-bold">{p.price} <span className="text-lg font-normal">/day</span></div>
                  {p.valueNote && <div className="mt-1 text-sm text-primary">{p.valueNote}</div>}
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f, idx) => <li key={idx}>• {f}</li>)}
                </ul>
                {p.gifts && (
                  <div className="mt-4 rounded-xl border border-dashed border-border bg-white p-4">
                    <div className="text-sm font-medium">Free Gifts:</div>
                    <ul className="mt-2 space-y-2 text-sm">
                      {p.gifts.map((g, idx) => <li key={idx}>🎁 {g}</li>)}
                    </ul>
                  </div>
                )}
                <Button onClick={() => handleSelect(p)} className="mt-6 h-11 w-full rounded-2xl font-bold text-white">
                  Start 1-Day Free Trial
                </Button>
                <p className="mt-3 text-xs text-neutral-600">Then $7/week. Cancel anytime.</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-xs text-neutral-600">
          * 14-day money-back guarantee on your first purchase. Cancel anytime in-app.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Pay securely. Apple Pay / Google Pay appears when available.
            </DialogDescription>
          </DialogHeader>
          {clientSecret && options && (
            <Elements stripe={stripePromise!} options={options}>
              <CheckoutContents planName={selectedPlan?.name || ""} onClose={() => setOpen(false)} />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function CheckoutContents({ planName, onClose }: { planName: string; onClose: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentRequestAvailable, setPaymentRequestAvailable] = useState(false)
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    async function setupPRB() {
      if (!stripe) return
      const prInit = {
        country: "US",
        currency: "usd",
        total: { label: planName || "Daily Prayer", amount: 0 }, // Stripe will use PI amount
        requestPayerName: true,
        requestPayerEmail: true,
      }
      const pr = stripe.paymentRequest(prInit)
      const result = await pr.canMakePayment()
      if (result) {
        setPaymentRequest(pr)
        setPaymentRequestAvailable(true)
      } else {
        setPaymentRequest(null)
        setPaymentRequestAvailable(false)
      }
    }
    setupPRB()
  }, [stripe, planName])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setProcessing(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    })
    setProcessing(false)
    if (error) {
      alert(error.message)
    } else {
      console.log("purchase", { plan: planName })
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {paymentRequestAvailable && paymentRequest && (
        <div className="rounded-xl border p-3">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
          <div className="mt-2 text-xs text-neutral-600">Or pay with card</div>
        </div>
      )}
      <PaymentElement options={{ layout: "tabs" }} />
      <Button type="submit" disabled={!stripe || processing} className="h-11 w-full rounded-2xl font-bold text-white">
        {processing ? "Processing…" : "Complete Purchase"}
      </Button>
      <div className="text-xs text-neutral-600">You’ll receive an email receipt.</div>
    </form>
  )
}


