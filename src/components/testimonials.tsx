import { Card, CardContent } from "@/components/ui/card"

const femaleNames = [
  "Grace M.", "Sophia L.", "Chloe R.", "Isabella T.", "Ava K.",
  "Mia N.", "Harper J.", "Evelyn P.", "Camila S.", "Abigail W.",
  "Ella D.", "Madison F.", "Scarlett B.", "Victoria H.", "Luna C.",
  "Nora V.", "Zoe A.", "Lily G.", "Hannah Y.", "Emily Q."
]

const items = [
  {
    quote: "I felt numb for months. Now I look forward to 5 quiet minutes with God every morning.",
    sub: "“It’s like the app takes my hand when I don’t have words.”",
    name: femaleNames[0],
    proof: "Completed 27 sessions in 30 days",
  },
  {
    quote: "I was drowning in negativity. These short prayers reset my day.",
    sub: "“I start calm instead of anxious. My family feels it too.”",
    name: femaleNames[1],
    proof: "Joined the Sunday live prayer 3×",
  },
  {
    quote: "I wanted to pray daily but never stuck with it. The gentle reminders + streak changed everything.",
    sub: "“Small steps, big change.”",
    name: femaleNames[2],
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
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={["/reviews/avatars/21e3b0991350a1a20ee9bc2b9e927abc.jpg","/reviews/avatars/4bb0a994c951e77a175645e8d4df6cca.jpg","/reviews/avatars/827c92203f6c7198ea50489f9ae9ccbd.jpg"][i % 3]}
                  alt={`${t.name} avatar`}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="font-semibold">{t.name}</div>
              </div>
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


