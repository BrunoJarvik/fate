"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type Plan = {
  name: string
  price: string
  cycle: string
  features: string[]
  badge?: string
  gifts?: string[]
  popular?: boolean
  valueNote?: string
}
const plans: Plan[] = [
  {
    name: "1 month of prayer sessions",
    price: "$14.99",
    cycle: "",
    features: [
      "Daily prayers, reminders, journaling, intentions wall",
      "Cancel anytime",
    ],
  },
  {
    name: "3 months of prayer sessions",
    price: "$34.99",
    cycle: "",
    features: [
      "Everything in 1 month",
      "Save 22% vs paying monthly",
    ],
    badge: "Most Popular",
    gifts: [
      "Guided Audio Pack: Morning & Evening reset (downloadable)",
      "Printable Prayer Journal (PDF): 30 days of prompts",
      "90-Day Reconnection Challenge: email coaching & milestone badges",
    ],
    popular: true,
    valueNote: "Save 22% + Gifts",
  },
  {
    name: "12 months of prayer sessions",
    price: "$99.99",
    cycle: "",
    features: [
      "Everything in 1 month",
      "Save 44% vs paying monthly",
    ],
    badge: "Best Value",
    gifts: [
      "All 3-Month Gifts",
      "Quarterly Live Retreat (virtual): exclusive members’ session",
      "Seasonal Scripture Cards (digital): printable set each quarter",
    ],
    valueNote: "Save 44% + All Gifts",
  },
]

export function Pricing() {
  const [open, setOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  function handleSelect(p: Plan) {
    setSelectedPlan(p)
    setOpen(true)
    // Analytics stub
    console.log("start_checkout", { plan: p.name })
  }

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
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-3xl font-bold">{p.price}</span>
                  {p.cycle && <span className="text-neutral-600">{p.cycle}</span>}
                </div>
                {p.valueNote && <div className="mt-1 text-sm text-primary">{p.valueNote}</div>}
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
                <Button
                  onClick={() => handleSelect(p)}
                  className="mt-6 h-11 w-full rounded-2xl font-bold text-white"
                >
                  {p.popular
                    ? "Get 3 Months + Gifts"
                    : p.name.includes("12 months")
                      ? "Go Annual + All Gifts"
                      : "Start 1 Month"}
                </Button>
                <p className="mt-3 text-xs text-neutral-600">
                  Gifts delivered instantly via email after checkout.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-xs text-neutral-600">
          * 14-day money-back guarantee on your first purchase. Cancel anytime in-app.
        </p>
      </div>

      {/* Mock Checkout Dialog (replace with Stripe later) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Checkout (Mock)</DialogTitle>
            <DialogDescription>
              This is a placeholder for Stripe (cards) and Apple Pay / Google Pay. See TODOs in code.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-600">Selected plan</div>
                <div className="text-lg font-semibold">{selectedPlan?.name}</div>
              </div>
              <div className="text-lg font-semibold">{selectedPlan?.price}</div>
            </div>
            <div className="mt-4 grid gap-3">
              <input className="h-11 rounded-xl border px-3 text-sm" placeholder="Email" aria-label="Email" />
              <input className="h-11 rounded-xl border px-3 text-sm" placeholder="Name" aria-label="Name" />
            </div>
            <Button
              className="mt-4 h-11 w-full rounded-2xl font-bold text-white"
              onClick={() => {
                console.log("purchase_mock", { plan: selectedPlan?.name })
                alert("Mock purchase complete! (Integrate Stripe here.)")
                setOpen(false)
              }}
            >
              Complete Purchase (Mock)
            </Button>
            <p className="mt-2 text-xs text-neutral-600">You won’t be charged in this mock flow.</p>
          </div>
          <div className="mt-2 text-xs text-neutral-600">
            TODO: Replace this dialog with Stripe Payment Element and Payment Request Button (Apple Pay/Google Pay).
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}


