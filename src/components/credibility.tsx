import { Sparkline, Radial, Bars } from "./MiniCharts"

export function Credibility() {
  return (
    <section className="container px-4 py-12 md:py-16">
      <h2 className="font-display text-3xl md:text-4xl text-center md:text-left">What members love</h2>
      
      {/* Enhanced cards with charts */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h3 className="font-medium text-lg">Consistency without guilt</h3>
          <p className="text-sm text-neutral-600 mt-1">&ldquo;Streak: 14 days&rdquo;</p>
          <div className="mt-4">
            <Sparkline points={[2, 4, 3, 6, 8, 7, 9, 11, 10, 12, 14]} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h3 className="font-medium text-lg">Peace you can feel</h3>
          <p className="text-sm text-neutral-600 mt-1">Members report calmer mornings</p>
          <div className="mt-4">
            <Radial value={0.9} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <h3 className="font-medium text-lg">A routine that fits life</h3>
          <p className="text-sm text-neutral-600 mt-1">Avg session: 5m 12s</p>
          <div className="mt-4">
            <Bars data={[5, 5, 6, 4, 5, 7, 5]} />
          </div>
        </div>
      </div>

      {/* Original screenshots section */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="text-sm text-neutral-600">Screenshot</div>
          <div className="mt-2 h-32 rounded-xl bg-muted"></div>
          <div className="mt-3 text-sm text-neutral-600">&ldquo;Streak: 14 days&rdquo;</div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
          <div className="text-sm text-neutral-600">Screenshot</div>
          <div className="mt-2 h-32 rounded-xl bg-muted"></div>
          <div className="mt-3 text-sm text-neutral-600">&ldquo;Your intentions this week&rdquo;</div>
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


