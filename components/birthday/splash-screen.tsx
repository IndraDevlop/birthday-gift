'use client'

import { animate, AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GIFT_CONFIG } from '@/lib/gift-config'
import { FloatingHearts } from './floating-hearts'

export function SplashScreen({ onOpen }: { onOpen: () => void }) {
  const [progress, setProgress] = useState(0)
  const isReady = progress >= 100

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: GIFT_CONFIG.splash.durationMs / 1000,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (value) => setProgress(Math.round(value)),
    })
    return () => controls.stop()
  }, [])

  return (
    <motion.section
      aria-label="Loading your gift"
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-night via-dusk to-[#4a1d4f] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
      transition={{ duration: 0.8 }}
    >
      <FloatingHearts />

      <div className="relative flex w-full max-w-sm flex-col items-center gap-8 text-center">
        {/* Kontainer Love dengan Efek Jantung & Bayangan Aura Love di Sampingnya */}
        <div className="relative flex size-36 items-center justify-center">
          {/* Lapisan Bayangan / Aura Love di Belakang yang Berdetak */}
          <motion.div
            aria-hidden="true"
            className="absolute flex items-center justify-center text-rose/30"
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart className="size-32 fill-current" strokeWidth={0} />
          </motion.div>

          {/* Ikon Hati Utama di Depan yang Berdetak Seperti Jantung */}
          <motion.div
            className="relative text-rose drop-shadow-[0_0_24px_rgba(251,113,133,0.8)]"
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="size-24 fill-current" strokeWidth={0} />
          </motion.div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="font-hand text-3xl text-blush text-balance">{GIFT_CONFIG.splash.loadingText}</p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Gift loading progress"
            className="h-2.5 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-blush via-rose to-glow shadow-[0_0_12px_rgba(251,113,133,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium tabular-nums text-white/60">{progress}%</span>
        </div>

        <div className="h-16">
          <AnimatePresence>
            {isReady && (
              <motion.button
                type="button"
                onClick={onOpen}
                className="rounded-full bg-gradient-to-r from-rose to-blush px-8 py-4 text-lg font-semibold text-night shadow-[0_10px_40px_-6px_rgba(251,113,133,0.8)] outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { type: 'spring', stiffness: 260, damping: 15 },
                  y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                {GIFT_CONFIG.splash.buttonText}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}