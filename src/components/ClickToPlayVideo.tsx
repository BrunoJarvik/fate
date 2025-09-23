"use client"
import { useEffect, useRef, useState } from "react"

interface ClickToPlayVideoProps {
  src: string
  className?: string
  poster?: string
}

export default function ClickToPlayVideo({ src, className = "", poster }: ClickToPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v || poster) return // Skip if poster is provided

    const onLoaded = async () => {
      try {
        // Seek to first frame and draw to canvas for a true "first frame" poster
        v.currentTime = 0
        await v.play() // required by some browsers to render first frame; will immediately pause
        v.pause()

        const canvas = document.createElement("canvas")
        canvas.width = v.videoWidth
        canvas.height = v.videoHeight
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(v, 0, 0, canvas.width, canvas.height)
          setGeneratedPoster(canvas.toDataURL("image/jpeg", 0.85))
        }
      } catch {
        // Fallback: leave poster null; use native first frame once play starts
      }
    }

    v.addEventListener("loadeddata", onLoaded)
    return () => v.removeEventListener("loadeddata", onLoaded)
  }, [poster])

  const handlePlay = async () => {
    setPlaying(true)
    if (videoRef.current) {
      try {
        await videoRef.current.play()
      } catch (error) {
        console.error("Video play failed:", error)
      }
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow ${className}`}>
      <video
        ref={videoRef}
        src={src}
        playsInline
        controls={playing}
        poster={poster || generatedPoster || undefined}
        preload="metadata"
        className="w-full h-auto block"
        muted={!playing} // Start muted, unmute when playing
      />
      {!playing && (
        <button
          aria-label="Play video"
          onClick={handlePlay}
          className="absolute inset-0 grid place-items-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <span className="inline-flex items-center justify-center rounded-full p-5 bg-white/90 shadow-lg hover:bg-white transition-colors">
            {/* Simple play triangle */}
            <svg 
              width="26" 
              height="26" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
              className="fill-current text-gray-800 ml-1"
            >
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
