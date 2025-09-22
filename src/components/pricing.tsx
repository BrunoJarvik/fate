"use client"
import { PrayerPricingWidget } from "./PrayerPricingWidget"

export function Pricing() {
  const handleCheckout = async (plan: "monthly" | "annual" | "lifetime", context: {
    currency: string
    price: number
    coupon?: string
    paymentMethod?: "stripe" | "apple" | "google" | "card"
  }) => {
    console.log("start_checkout", { plan, ...context })
    
    try {
      // For subscription-based checkout (1-day trial + $7/week)
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          plan, 
          paymentMethod: context.paymentMethod,
          coupon: context.coupon 
        }),
      })
      
      const data = await res.json()
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        console.error("No checkout URL received")
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }

  return (
    <section id="pricing" className="border-y border-border/60 bg-muted">
      <div className="container px-4 py-12 md:py-16">
        <PrayerPricingWidget
          pricing={{
            currency: "USD",
            monthlyPrice: 7.00, // $7/week displayed as weekly
            annualPrice: 59.99, // Annual discount
            lifetimePrice: 149, // One-time payment
            annualSavingsLabel: "Save 40%"
          }}
          features={[
            { label: "Daily 5-minute guided prayers" },
            { label: "1-day free trial, then $7/week" },
            { label: "Custom reminders & streak tracking" },
            { label: "Gentle intentions wall & community" },
            { label: "Audio library & offline mode" },
            { label: "Cancel anytime in-app" }
          ]}
          testimonials={[
            { quote: "I felt numb for months. Now I look forward to 5 quiet minutes with God every morning.", author: "Grace M." },
            { quote: "These short prayers reset my day. I start calm instead of anxious.", author: "Sophia L." },
            { quote: "The gentle reminders + streak changed everything. Small steps, big change.", author: "Chloe R." }
          ]}
          trialMode="free-trial"
          onCheckout={handleCheckout}
          defaultPlan="monthly"
          supportEmail="support@closertohope.com"
          termsUrl="/terms"
          privacyUrl="/privacy"
          showCoupon={true}
          enableApplePay={true}
          enableGooglePay={true}
          enableCardForm={true}
        />
        
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-600">
            * 14-day money-back guarantee on your first purchase. Cancel anytime in-app.
          </p>
        </div>
      </div>
    </section>
  )
}


