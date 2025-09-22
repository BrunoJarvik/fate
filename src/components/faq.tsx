import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is this for my denomination?",
    a: "Yes. The app focuses on scripture, short guided prayers, and gratitude. No debates—just a simple way back to daily prayer.",
  },
  {
    q: "What if I’m busy or miss days?",
    a: "That’s normal. The app is designed for messy schedules. You can restart with one tap.",
  },
  {
    q: "Will I be charged right away?",
    a: "Yes—and your first purchase is covered by our 7-day money-back guarantee.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely, from your account settings, with no hoops.",
  },
  {
    q: "Is there community?",
    a: "Yes—optional weekly live prayer and a gentle intentions wall.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border/60 bg-white">
      <div className="container px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl md:text-4xl text-center md:text-left">Questions & answers</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border px-4">
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-neutral-700">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}


