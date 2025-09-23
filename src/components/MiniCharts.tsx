interface SparklineProps {
  points?: number[]
}

export function Sparkline({ points = [2, 4, 3, 6, 8, 7, 9] }: SparklineProps) {
  const w = 120
  const h = 40
  const max = Math.max(...points)
  const scaled = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * h}`).join(" ")
  
  return (
    <div className="flex justify-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
        <polyline 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          points={scaled}
          className="text-primary"
        />
      </svg>
    </div>
  )
}

interface RadialProps {
  value?: number
}

export function Radial({ value = 0.78 }: RadialProps) {
  const r = 18
  const c = 2 * Math.PI * r
  const dash = (1 - value) * c
  
  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 48 48" className="w-20 h-20">
        <circle 
          cx="24" 
          cy="24" 
          r={r} 
          stroke="currentColor" 
          strokeOpacity="0.25" 
          strokeWidth="6" 
          fill="none"
          className="text-border"
        />
        <circle 
          cx="24" 
          cy="24" 
          r={r} 
          stroke="currentColor" 
          strokeWidth="6" 
          fill="none"
          strokeDasharray={`${c}`} 
          strokeDashoffset={`${dash}`} 
          transform="rotate(-90 24 24)"
          className="text-primary"
        />
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          className="text-sm font-semibold fill-current"
        >
          {Math.round(value * 100)}%
        </text>
      </svg>
    </div>
  )
}

interface BarsProps {
  data?: number[]
}

export function Bars({ data = [5, 5, 6, 4, 5, 7, 5] }: BarsProps) {
  const w = 120
  const h = 40
  const max = Math.max(...data)
  const bw = w / data.length - 3
  
  return (
    <div className="flex justify-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
        {data.map((d, i) => (
          <rect 
            key={i} 
            x={i * (bw + 3)} 
            y={h - (d / max) * h} 
            width={bw} 
            height={(d / max) * h}
            className="fill-current text-primary"
          />
        ))}
      </svg>
    </div>
  )
}
