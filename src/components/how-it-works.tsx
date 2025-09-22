import { Badge } from "@/components/ui/badge"

const steps = [
  {
    title: "Press play (5 minutes).",
    body: "Short guided prayer + scripture prompt—no overthinking needed.",
  },
  {
    title: "Add one line.",
    body: "Write a quick intention or gratitude. Build a real conversation with God.",
  },
  {
    title: "Keep your streak.",
    body: "Gentle reminders, weekly themes, and encouragement when you miss a day.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-border/60 bg-white">
      <div className="container px-4 py-12 md:py-16">
        <div className="flex justify-center md:justify-start">
          <Badge className="rounded-full bg-accent text-accent-foreground">How it works</Badge>
        </div>
        <h2 className="mt-3 font-display text-3xl md:text-4xl text-center md:text-left">Clarity + ease for busy days</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-muted p-6">
              <div className="text-2xl font-semibold">{s.title}</div>
              <p className="mt-2 text-neutral-700">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-neutral-700">Bonus: Opt in to a weekly group prayer—come as you are.</p>
      </div>
    </section>
  )
}


