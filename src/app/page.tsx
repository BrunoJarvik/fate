import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Testimonials } from "@/components/testimonials"
import { HowItWorks } from "@/components/how-it-works"
import { Benefits } from "@/components/benefits"
import { Guarantee } from "@/components/guarantee"
import { Pricing } from "@/components/pricing"
import { Credibility } from "@/components/credibility"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { ClientEvents } from "./(client)/client-events"

export default function Page() {
  return (
    <main>
      <ClientEvents />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Benefits />
      <Guarantee />
      <Credibility />
      <FAQ />
      <Footer />
    </main>
  )
}
