"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-3">
        <Link href="#" className="font-display text-xl tracking-tight">
          Daily Prayer
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#how" className="hover:underline">How it Works</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          <a href="#faq" className="hover:underline">FAQs</a>
        </nav>
        <a href="#pricing" className="ml-auto">
          <Button className="h-9 rounded-2xl px-3 text-xs font-bold text-white sm:h-10 sm:px-4 sm:text-sm" aria-label="Start My Daily Prayer">Start My Daily Prayer</Button>
        </a>
      </div>
    </header>
  )
}


