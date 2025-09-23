"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Pricing() {
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        console.error("No checkout URL received")
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }

  const plans = [
    {
      name: "Monthly",
      price: "$7.00",
      cycle: "/week",
      features: [
        "Daily 5-minute guided prayers",
        "Custom reminders & streak tracking",
        "Cancel anytime",
      ],
    },
    {
      name: "Annual", 
      price: "$59.99",
      cycle: "/year",
      features: [
        "Everything in Monthly",
        "Save 40% vs monthly billing",
        "Priority support",
      ],
      badge: "Most Popular",
      popular: true,
      savings: "Save 40%"
    },
    {
      name: "Lifetime",
      price: "$149",
      cycle: "",
      features: [
        "Everything in Annual",
        "Pay once, pray forever",
        "Lifetime updates",
      ],
      badge: "Best Value"
    }
  ]

  return (
    <section id="pricing" className="border-y border-border/60 bg-muted">
      <div className="container px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl md:text-4xl text-center md:text-left">Choose your plan</h2>
        <p className="mt-2 text-neutral-700 text-center md:text-left">
          7-day free trial. Cancel anytime.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Card key={i} className={`rounded-2xl border ${plan.popular ? "border-primary shadow-soft" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-semibold">{plan.name}</div>
                  {plan.badge && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.cycle && <span className="text-neutral-600">{plan.cycle}</span>}
                </div>
                {plan.savings && (
                  <div className="mt-1 text-sm text-primary">{plan.savings}</div>
                )}
                <ul className="mt-4 space-y-2 text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Single CTA */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handleCheckout}
            className="h-12 w-full md:w-auto md:px-8 rounded-2xl font-bold text-white text-lg"
          >
            Start 7-day free trial
          </Button>
          <p className="mt-3 text-sm text-neutral-600">
            Then $7/week. Apple Pay, Google Pay, and cards accepted. Cancel anytime.
          </p>
        </div>

        <p className="mt-6 text-xs text-neutral-600 text-center">
          * 14-day money-back guarantee on your first purchase. Cancel anytime in-app.
        </p>
      </div>
    </section>
  )
}


