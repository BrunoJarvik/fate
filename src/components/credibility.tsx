export function Credibility() {
  return (
    <section className="container px-4 py-12 md:py-16">
      <h2 className="font-display text-3xl md:text-4xl text-center md:text-left">What members love</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="text-sm text-neutral-600">Screenshot</div>
          <div className="mt-2 h-32 rounded-xl bg-muted"></div>
          <div className="mt-3 text-sm text-neutral-600">“Streak: 14 days”</div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="text-sm text-neutral-600">Screenshot</div>
          <div className="mt-2 h-32 rounded-xl bg-muted"></div>
          <div className="mt-3 text-sm text-neutral-600">“Your intentions this week”</div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="text-sm text-neutral-600">Metrics</div>
          <ul className="mt-2 text-sm">
            <li>• Avg session: 5m 12s</li>
            <li>• 90% complete at least 4 days/week</li>
          </ul>
        </div>
      </div>
    </section>
  )
}


