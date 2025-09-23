import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ThanksPage() {
  return (
    <main>
      <Navbar />
      <section className="container px-4 py-16 md:py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl mb-6">
            Welcome to your daily prayer journey! 🙏
          </h1>
          <p className="text-lg text-neutral-700 mb-8">
            Your 7-day free trial has started. Check your email for next steps and download links.
          </p>
          <div className="rounded-2xl border border-border bg-muted p-6">
            <h2 className="font-semibold text-xl mb-4">What happens next?</h2>
            <ul className="text-left space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Check your email for your welcome message and app download links</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Your 7-day free trial starts now - no charges until it ends</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Set up your first 5-minute prayer session today</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">✓</span>
                <span>Cancel anytime from your account settings</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-neutral-600 mt-6">
            Questions? Email us at support@closertohope.com
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
