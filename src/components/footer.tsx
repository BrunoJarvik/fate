export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted">
      <div className="container py-10 text-sm text-neutral-600">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Daily Prayer</div>
          <div className="flex gap-4">
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
        <p className="mt-4 text-xs">
          Testimonials reflect individual experiences; results vary. No medical or therapeutic claims.
        </p>
      </div>
    </footer>
  )
}


