export function Benefits() {
  const items = [
    {
      emoji: "🌱",
      sr: "fresh start",
      h: "Consistency without guilt.",
      p: "Miss a day? We help you start again, not start over.",
    },
    {
      emoji: "😌",
      sr: "calm",
      h: "Peace you can feel.",
      p: "Members report calmer mornings and clearer decisions.",
    },
    {
      emoji: "⏰",
      sr: "time-friendly",
      h: "A routine that fits life.",
      p: "5 minutes to begin, deeper options when you have time.",
    },
    {
      emoji: "🤝",
      sr: "supportive community",
      h: "You’re not alone.",
      p: "Live prayer + intentions wall for shared support.",
    },
  ]
  return (
    <section className="container px-4 py-12 md:py-16">
      <h2 className="font-display text-3xl md:text-4xl text-center md:text-left">Small steps. A life that feels different.</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((b, i) => (
          <div key={i} className="rounded-2xl border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <span aria-hidden className="text-2xl">{b.emoji}</span>
              <span className="sr-only">{b.sr}</span>
              <div className="text-xl font-semibold">{b.h}</div>
            </div>
            <p className="mt-2 text-neutral-700">{b.p}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


