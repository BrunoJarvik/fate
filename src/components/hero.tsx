"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// UGC videos displayed in the Hero scroller. Add more entries as you drop
// files into /public/ugc. Posters are optional but recommended.
const UGC_VIDEOS = [
  { src: "/ugc/video-1.mp4", poster: "/ugc/video-1.jpg", label: "Member morning routine" },
] as const

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-muted">
      <div className="container grid gap-6 py-10 md:grid-cols-2 md:items-center md:gap-8 md:py-24">
        {/* Left column */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-[28px]/[1.15] sm:text-4xl md:text-5xl [text-wrap:balance] text-center md:text-left mx-auto max-w-[24ch]"
          >
            Feel close to God again—<span className="underline decoration-primary/40">in minutes a day.</span>
          </motion.h1>

          <p className="mt-3 text-base text-neutral-700 text-center md:text-left mx-auto max-w-[40ch] sm:text-lg">
            Daily guided prayers, gentle reminders, and a simple routine that fits real life. 5 minutes to start; peace that lingers all day.
          </p>

          {/* Primary CTA */}
          <div className="mt-5">
            <a href="#pricing" className="block">
              <Button
                className="h-12 w-full rounded-2xl px-6 font-bold text-white"
                aria-label="Start My Daily Prayer"
              >
                Start My Daily Prayer
              </Button>
            </a>
            <a href="#pricing" className="mt-2 block text-center text-sm underline underline-offset-4">
              See Plans &amp; Bonuses
            </a>
          </div>

          {/* Trust strip (wrap-safe, smaller on mobile) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-neutral-600 sm:text-sm md:justify-start">
            <span>★★★★★ 4.9/5 from 1,000+ members</span>
            <span className="hidden sm:inline" aria-hidden>•</span>
            <span>Cancel anytime</span>
            <span className="hidden sm:inline" aria-hidden>•</span>
            <span>14-day money-back guarantee</span>
          </div>

          {/* UGC scroller — no overflow, proper snap and padding so cards aren't clipped */}
          <div className="mt-5 -mx-4 overflow-x-auto px-4 snap-x snap-mandatory no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] touch-pan-x">
            <div className="flex gap-3 sm:gap-4 pr-4" role="list" aria-label="Member videos using the app">
              {UGC_VIDEOS.map((v, i) => (
                <div
                  key={i}
                  role="listitem"
                  className="snap-center rounded-2xl border border-border bg-white p-2 shadow-soft min-w-[72%] max-w-[72%] sm:min-w-[200px] sm:max-w-[200px]"
                  aria-label={v.label || `UGC clip ${i + 1}`}
                >
                  <div className="aspect-[9/16] overflow-hidden rounded-xl bg-black/5">
                    <video
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      poster={v.poster}
                    >
                      <source src={v.src} type="video/mp4" />
                    </video>
                  </div>
                  <div className="mt-2 text-xs text-neutral-600 line-clamp-1">
                    {v.label || `UGC clip #${i + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column removed per request */}
      </div>
    </section>
  )
}


