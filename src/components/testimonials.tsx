import { Card, CardContent } from "@/components/ui/card"

const items = [
  {
    quote: "I felt numb for months. Now I look forward to 5 quiet minutes with God every morning.",
    sub: "“It’s like the app takes my hand when I don’t have words.”",
    name: "Maria G.",
    proof: "Completed 27 sessions in 30 days",
  },
  {
    quote: "I was drowning in negativity. These short prayers reset my day.",
    sub: "“I start calm instead of anxious. My family feels it too.”",
    name: "James A.",
    proof: "Joined the Sunday live prayer 3×",
  },
  {
    quote: "I wanted to pray daily but never stuck with it. The gentle reminders + streak changed everything.",
    sub: "“Small steps, big change.”",
    name: "Leila K.",
    proof: "Wrote 18 gratitude notes",
  },
]

export function Testimonials() {
  return (
    <section className="container px-4 py-12 md:py-16">
      <h2 className="font-display text-3xl md:text-4xl text-center md:text-left">Real people. Gentle routines. Lasting peace.</h2>
      <p className="mt-3 text-neutral-700 text-center md:text-left">Stories from members who reconnected with God through small daily moments.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-lg font-medium">“{t.quote}”</p>
              <p className="mt-3 text-neutral-700">{t.sub}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-neutral-600">
                <span>— {t.name}</span>
                <span>{t.proof}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}


