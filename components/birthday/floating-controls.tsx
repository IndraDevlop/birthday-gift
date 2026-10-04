'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { DoorOpen, Disc3, RotateCcw, BookOpen } from 'lucide-react'
import { GIFT_CONFIG } from '@/lib/gift-config'

type FloatingControlsProps = {
  isPlaying: boolean
  onToggleMusic: () => void
  showNavigation: boolean
  onBackToRoom: () => void
  onRestart: () => void
  showReadAgain: boolean // Props baru untuk cek halaman akhir
  onReadAgain: () => void // Fungsi untuk kembali ke awal buku
}

const controlClass =
  'flex size-12 items-center justify-center rounded-full border border-white/15 bg-night/70 text-white shadow-lg backdrop-blur-md outline-none transition-colors hover:bg-dusk focus-visible:ring-4 focus-visible:ring-blush/60'

export function FloatingControls({ 
  isPlaying, 
  onToggleMusic, 
  showNavigation, 
  onBackToRoom, 
  onRestart,
  showReadAgain,
  onReadAgain
}: FloatingControlsProps) {
  return (
    <motion.div
      className="fixed right-4 top-4 z-50 flex items-center gap-2 sm:right-6 sm:top-6"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <AnimatePresence>
        {/* Tombol Read Again Khusus Halaman Akhir */}
        {/* {showReadAgain && (
          <motion.button
            type="button"
            onClick={onReadAgain}
            className="flex items-center gap-2 rounded-full border border-blush/40 bg-rose/90 px-4 py-3 text-sm font-semibold text-night shadow-lg backdrop-blur-md hover:bg-blush"
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            aria-label="Read again from start"
          >
            <BookOpen className="size-4" />
            <span>Read again</span>
          </motion.button>
        )} */}

        {showNavigation && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
          >
            <button type="button" onClick={onRestart} className={controlClass} aria-label="Restart the journey" title="Restart journey">
              <RotateCcw className="size-5" />
            </button>
            <button type="button" onClick={onBackToRoom} className={controlClass} aria-label="Back to the room" title="Back to room">
              <DoorOpen className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggleMusic}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? `Pause ${GIFT_CONFIG.music.title}` : `Play ${GIFT_CONFIG.music.title}`}
        title={isPlaying ? 'Pause music' : 'Play music'}
        className="flex h-12 items-center gap-2.5 rounded-full border border-white/15 bg-gradient-to-r from-rose/90 to-blush/90 pl-1.5 pr-4 text-night shadow-[0_8px_30px_-8px_rgba(251,113,133,0.9)] outline-none backdrop-blur-md focus-visible:ring-4 focus-visible:ring-white/60"
      >
        <motion.span
          className="flex size-9 items-center justify-center rounded-full bg-night text-blush"
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}
        >
          <Disc3 className="size-6" />
        </motion.span>
        <span aria-hidden="true" className="flex h-4 items-end gap-0.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-night"
              animate={isPlaying ? { height: ['30%', '100%', '45%', '80%', '30%'] } : { height: '25%' }}
              transition={isPlaying ? { duration: 0.9 + i * 0.15, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
            />
          ))}
        </span>
      </button>
    </motion.div>
  )
}