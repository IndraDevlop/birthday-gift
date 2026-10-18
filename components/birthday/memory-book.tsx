'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import type { Ref } from 'react'
import { GIFT_CONFIG } from '@/lib/gift-config'

type MemoryBookProps = {
  onOpen: () => void
  ref?: Ref<HTMLButtonElement>
}

export function MemoryBook({ onOpen, ref }: MemoryBookProps) {
  return (
    <div className="relative z-10 flex flex-col items-center">
      <motion.div
        role="tooltip"
        id="memory-book-tooltip"
        className="relative mb-4 whitespace-nowrap rounded-full bg-paper px-4 py-2 font-hand text-xl text-ink shadow-lg after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-paper after:content-['']"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ opacity: { delay: 1.3 }, y: { duration: 2, repeat: Infinity } }}
      >
        {GIFT_CONFIG.room.tooltip}
      </motion.div>

      <motion.button
        ref={ref}
        type="button"
        onClick={onOpen}
        aria-describedby="memory-book-tooltip"
        aria-label={`Open the ${GIFT_CONFIG.room.bookLabel} book`}
        className="group relative cursor-pointer rounded-sm outline-none focus-visible:ring-4 focus-visible:ring-glow/70"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08, rotate: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute -inset-6 rounded-full bg-glow/40 blur-2xl"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="relative flex h-32 w-24 flex-col items-center justify-center gap-2 rounded-r-md rounded-l-sm border-l-[8px] border-[#9d2a5f] bg-gradient-to-br from-rose to-[#c2406f] px-2 text-center shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_0_0_2px_rgba(253,246,236,0.25)] sm:h-40 sm:w-30">
          <span aria-hidden="true" className="absolute inset-1.5 left-1 rounded-sm border border-dashed border-paper/40" />
          <Heart className="size-5 text-paper sm:size-6" fill="currentColor" strokeWidth={0} />
          <span className="font-hand text-xl leading-none text-paper text-balance sm:text-2xl">{GIFT_CONFIG.room.bookLabel}</span>
          <span
            aria-hidden="true"
            className="absolute -right-1.5 bottom-1 top-1 w-1.5 rounded-r-sm bg-[repeating-linear-gradient(180deg,#e9dcc8_0_2px,#fdf6ec_2px_4px)]"
          />
        </span>
      </motion.button>
    </div>
  )
}
