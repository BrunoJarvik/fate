"use client"

import { useState, useId } from "react"

type TrialMode = "free-trial" | "money-back" | "none"

interface Pricing {
  currency: "USD" | "EUR" | "GBP" | string
  monthlyPrice: number
  annualPrice: number
  lifetimePrice?: number
  annualSavingsLabel?: string
}

interface Feature {
  label: string
  premiumOnly?: boolean
}

interface Testimonial {
  quote: string
  author: string
}

interface Props {
  pricing?: Pricing
  features?: Feature[]
  testimonials?: Testimonial[]
  trialMode?: TrialMode
  onCheckout: (plan: "monthly" | "annual" | "lifetime", context: {
    currency: string
    price: number
    coupon?: string
    paymentMethod?: "stripe" | "apple" | "google" | "card"
  }) => void
  onToggleTrialMode?: (mode: TrialMode) => void
  defaultPlan?: "monthly" | "annual" | "lifetime"
  showCoupon?: boolean
  enableApplePay?: boolean
  enableGooglePay?: boolean
  enableCardForm?: boolean
  termsUrl?: string
  privacyUrl?: string
  supportEmail?: string
  locale?: string
}

const defaultPricing: Pricing = {
  currency: "USD",
  monthlyPrice: 9.99,
  annualPrice: 59.99,
  lifetimePrice: 149,
  annualSavingsLabel: "Save 40%"
}

const defaultFeatures: Feature[] = [
  { label: "Daily 5-minute guided prayers" },
  { label: "Custom reminders & streak tracking", premiumOnly: true },
  { label: "Full audio library & offline mode", premiumOnly: true },
  { label: "Community reflections", premiumOnly: true }
]

const defaultTestimonials: Testimonial[] = [
  { quote: "I never missed a day this month.", author: "Sarah" },
  { quote: "Five minutes that changed my mornings.", author: "Daniel" },
  { quote: "Simple, focused, and uplifting.", author: "Layla" }
]

export function PrayerPricingWidget({
  pricing = defaultPricing,
  features = defaultFeatures,
  testimonials = defaultTestimonials,
  trialMode = "free-trial",
  onCheckout,
  onToggleTrialMode: _onToggleTrialMode,
  defaultPlan = "annual",
  showCoupon = true,
  enableApplePay = true,
  enableGooglePay = true,
  enableCardForm = true,
  termsUrl = "/terms",
  privacyUrl = "/privacy",
  supportEmail = "support@yourapp.com",
  locale
}: Props) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual" | "lifetime">(defaultPlan)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">("idle")
  
  const radioGroupId = useId()
  const couponId = useId()

  const formatPrice = (price: number, currency: string) => {
    try {
      return new Intl.NumberFormat(locale || navigator.language, {
        style: "currency",
        currency
      }).format(price)
    } catch {
      return `${currency} ${price}`
    }
  }

  const handlePlanSelect = (plan: "monthly" | "annual" | "lifetime") => {
    setSelectedPlan(plan)
  }

  const handleCheckout = (paymentMethod: "stripe" | "apple" | "google" | "card") => {
    const price = selectedPlan === "monthly" 
      ? pricing.monthlyPrice 
      : selectedPlan === "annual" 
        ? pricing.annualPrice 
        : pricing.lifetimePrice || 0

    onCheckout(selectedPlan, {
      currency: pricing.currency,
      price,
      coupon: appliedCoupon || undefined,
      paymentMethod
    })
  }

  const handleCouponApply = () => {
    // Stub validation - in real implementation, validate against backend
    if (couponCode.toLowerCase() === "save10") {
      setAppliedCoupon(couponCode)
      setCouponStatus("success")
    } else {
      setCouponStatus("error")
    }
  }

  const getTrustText = () => {
    switch (trialMode) {
      case "free-trial":
        return "7-day free trial. Cancel anytime before it ends."
      case "money-back":
        return `7-day money-back guarantee. If it's not for you, email ${supportEmail} for a full refund.`
      case "none":
        return "Cancel anytime. Keep your progress."
    }
  }

  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: pricing.monthlyPrice,
      microcopy: "Cancel anytime.",
      popular: false
    },
    {
      id: "annual",
      name: "Annual",
      price: pricing.annualPrice,
      microcopy: "Best value for building a lasting habit.",
      popular: true,
      savings: pricing.annualSavingsLabel
    },
    ...(pricing.lifetimePrice ? [{
      id: "lifetime" as const,
      name: "Lifetime",
      price: pricing.lifetimePrice,
      microcopy: "Pay once, pray forever.",
      popular: false
    }] : [])
  ]

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto", padding: "0 16px" }}>
      {/* Section Header */}
      <header style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ margin: "0 0 8px 0", fontSize: "2rem", fontWeight: "bold" }}>
          Choose your plan
        </h2>
        <p style={{ margin: 0, opacity: 0.8 }}>
          Start your daily 5-minute prayer habit today.
        </p>
      </header>

      {/* Pricing Cards */}
      <div 
        role="radiogroup" 
        aria-labelledby={radioGroupId}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "48px"
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            role="radio"
            aria-checked={selectedPlan === plan.id}
            tabIndex={selectedPlan === plan.id ? 0 : -1}
            onClick={() => handlePlanSelect(plan.id as "monthly" | "annual" | "lifetime")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handlePlanSelect(plan.id as "monthly" | "annual" | "lifetime")
              }
            }}
            data-event="plan_select"
            data-plan={plan.id}
            style={{
              position: "relative",
              border: selectedPlan === plan.id ? "2px solid #007bff" : "1px solid #ddd",
              borderRadius: "12px",
              padding: "24px",
              cursor: "pointer",
              backgroundColor: selectedPlan === plan.id ? "#f8f9ff" : "#fff",
              outline: "none"
            }}
          >
            {plan.popular && (
              <div style={{
                position: "absolute",
                top: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#007bff",
                color: "white",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "0.75rem",
                fontWeight: "600"
              }}>
                Most Popular
              </div>
            )}
            
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "1.25rem", fontWeight: "600" }}>
                {plan.name}
              </h3>
              <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "4px" }}>
                {formatPrice(plan.price, pricing.currency)}
                <span style={{ fontSize: "1rem", fontWeight: "normal", opacity: 0.7 }}>
                  {plan.id === "monthly" ? " / month" : plan.id === "annual" ? " / year" : ""}
                </span>
              </div>
              {plan.savings && (
                <div style={{
                  display: "inline-block",
                  backgroundColor: "#e8f5e8",
                  color: "#2d5a2d",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: "500"
                }}>
                  {plan.savings}
                </div>
              )}
            </div>
            
            <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.8 }}>
              {plan.microcopy}
            </p>
          </div>
        ))}
      </div>

      {/* Feature List */}
      <section style={{ marginBottom: "32px" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "1.25rem", fontWeight: "600", textAlign: "center" }}>
          Everything you need to pray for 5 minutes a day
        </h3>
        <ul style={{ 
          listStyle: "none", 
          padding: 0, 
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "8px"
        }}>
          {features.map((feature, index) => {
            const isLocked = feature.premiumOnly && selectedPlan !== "lifetime"
            return (
              <li key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                opacity: isLocked ? 0.6 : 1
              }}>
                <span aria-hidden="true">
                  {isLocked ? "🔒" : "✓"}
                </span>
                <span>
                  {feature.label}
                  {isLocked && <span className="sr-only"> (premium only)</span>}
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Trust & Reassurance */}
      <section style={{ textAlign: "center", marginBottom: "32px" }}>
        <p style={{ margin: "0 0 8px 0", fontWeight: "500" }}>
          {getTrustText()}
        </p>
        <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.7 }}>
          Secure checkout • Encrypted payment • You&apos;re in control
        </p>
      </section>

      {/* Payment Methods */}
      <section style={{ marginBottom: "24px" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center"
        }}>
          {enableApplePay && (
            <button
              onClick={() => handleCheckout("apple")}
              data-event="checkout_click"
              data-plan={selectedPlan}
              data-method="apple"
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#000",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500"
              }}
            >
              Apple Pay
            </button>
          )}
          {enableGooglePay && (
            <button
              onClick={() => handleCheckout("google")}
              data-event="checkout_click"
              data-plan={selectedPlan}
              data-method="google"
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#4285f4",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500"
              }}
            >
              Google Pay
            </button>
          )}
          {enableCardForm && (
            <button
              onClick={() => handleCheckout("card")}
              data-event="checkout_click"
              data-plan={selectedPlan}
              data-method="card"
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                color: "#333",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500"
              }}
            >
              Pay with Card
            </button>
          )}
          <button
            onClick={() => handleCheckout("stripe")}
            data-event="checkout_click"
            data-plan={selectedPlan}
            data-method="stripe"
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "2px solid #007bff",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "600"
            }}
          >
            Continue
          </button>
        </div>
      </section>

      {/* Coupon Row */}
      {showCoupon && (
        <section style={{ marginBottom: "32px" }}>
          <div style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap"
          }}>
            <div style={{ position: "relative" }}>
              <label htmlFor={couponId} className="sr-only">
                Coupon code
              </label>
              <input
                id={couponId}
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  fontSize: "0.875rem",
                  minWidth: "140px"
                }}
              />
              {couponStatus === "success" && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  fontSize: "0.75rem",
                  color: "#2d5a2d",
                  marginTop: "4px"
                }}>
                  Coupon applied!
                </div>
              )}
              {couponStatus === "error" && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  fontSize: "0.75rem",
                  color: "#d32f2f",
                  marginTop: "4px"
                }}>
                  Invalid coupon code
                </div>
              )}
            </div>
            <button
              onClick={handleCouponApply}
              data-event="coupon_apply"
              data-code={couponCode}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "1px solid #007bff",
                backgroundColor: "#fff",
                color: "#007bff",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500"
              }}
            >
              Apply
            </button>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section style={{ marginBottom: "32px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            textAlign: "center"
          }}>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <blockquote key={index} style={{ margin: 0 }}>
                <p style={{ 
                  margin: "0 0 8px 0", 
                  fontSize: "0.875rem",
                  fontStyle: "italic"
                }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <cite style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                  — {testimonial.author}
                </cite>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* Legal Links */}
      <footer style={{ textAlign: "center", fontSize: "0.75rem", opacity: 0.7 }}>
        <p style={{ margin: 0 }}>
          By continuing, you agree to our{" "}
          <a href={termsUrl} style={{ color: "inherit", textDecoration: "underline" }}>
            Terms
          </a>{" "}
          and{" "}
          <a href={privacyUrl} style={{ color: "inherit", textDecoration: "underline" }}>
            Privacy Policy
          </a>.
        </p>
      </footer>
    </div>
  )
}
