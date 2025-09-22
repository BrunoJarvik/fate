import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Daily Prayer | Feel close to God again—in minutes a day.",
  description:
    "A simple daily prayer app with short guided prayers, gentle reminders, and a streak that sticks. 14-day guarantee. Cancel anytime.",
  openGraph: {
    title: "Daily Prayer | Feel close to God again—in minutes a day.",
    description:
      "Short guided prayers, reminders, and a simple routine that brings you back to God. 14-day guarantee. Cancel anytime.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Daily Prayer" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Prayer",
    description: "Feel close to God again—in minutes a day.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        {children}
        {/* SEO schema: basic WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Daily Prayer',
              url: 'https://example.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://example.com/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
