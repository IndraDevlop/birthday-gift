'use client'

import { motion } from 'framer-motion'

const COLORS = ['#fcd34d', '#f9a8d4', '#fde68a', '#fb7185', '#fef3c7']
const BULBS = 14

function Strand({ top, sag, offset }: { top: string; sag: number; offset: number }) {
  const bulbs = Array.from({ length: BULBS }, (_, i) => {
    const t = (i + 0.5) / BULBS
    return { x: t * 100, y: sag * 4 * t * (1 - t), color: COLORS[(i + offset) % COLORS.length] }
  })

  return (
    <div className="absolute inset-x-0 h-24" style={{ top }}>
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={`M 0 0 Q 50 ${sag * 2} 100 0`}
          fill="none"
          stroke="#1a1230"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {bulbs.map((bulb, i) => (
        <motion.span
          key={i}
          className="absolute size-2.5 -translate-x-1/2 rounded-full sm:size-3"
          style={{
            left: `${bulb.x}%`,
            top: `${bulb.y}%`,
            backgroundColor: bulb.color,
            boxShadow: `0 0 12px 4px ${bulb.color}99, 0 0 28px 8px ${bulb.color}40`,
          }}
          animate={{ opacity: [1, 0.45, 1] }}
          transition={{ duration: 1.6 + (i % 4) * 0.5, repeat: Infinity, delay: (i % 5) * 0.3 }}
        />
      ))}
    </div>
  )
}

export function FairyLights() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Strand top="3%" sag={60} offset={0} />
      <Strand top="10%" sag={45} offset={2} />
    </div>
  )
}
