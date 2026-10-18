'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const HEARTS = [
  { left: '6%', size: 14, delay: 0, duration: 11 },
  { left: '15%', size: 22, delay: 3, duration: 14 },
  { left: '27%', size: 12, delay: 6, duration: 10 },
  { left: '38%', size: 18, delay: 1.5, duration: 13 },
  { left: '52%', size: 10, delay: 4.5, duration: 9 },
  { left: '63%', size: 20, delay: 2, duration: 15 },
  { left: '74%', size: 14, delay: 7, duration: 12 },
  { left: '86%', size: 24, delay: 0.8, duration: 16 },
  { left: '94%', size: 12, delay: 5, duration: 11 },
]

export function FloatingHearts({ className = 'text-blush/30' }: { className?: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {HEARTS.map((heart, i) => (
        <motion.div
          key={i}
          className={`absolute -bottom-10 ${className}`}
          style={{ left: heart.left }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-110vh', opacity: [0, 1, 1, 0], x: [0, 14, -10, 6] }}
          transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: 'linear' }}
        >
          <Heart style={{ width: heart.size, height: heart.size }} fill="currentColor" strokeWidth={0} />
        </motion.div>
      ))}
    </div>
  )
}
