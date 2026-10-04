'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

/**
 * Swap `src` for your own photo. Keep `width`/`height` matching the image so the
 * hotspot (expressed as percentages of the image) stays over the book.
 */
const ROOM_IMAGE = {
  src: '/room-background.png',
  width: 1312,
  height: 1199,
  alt: 'A cozy bedroom at night with a warm desk lamp, a glowing monitor and a book resting on the desk',
}

const BOOK_HOTSPOT = { 
  left: 44.1, 
  top: 38.5, 
  width: 7.5, 
  height: 7.1, 
  rotate: -21, 
  skewX: 40
}

export function CozyRoom({ onOpenBook }: { onOpenBook: () => void }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [zoomOrigin, setZoomOrigin] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [showGlow, setShowGlow] = useState(false)

  const ratio = ROOM_IMAGE.width / ROOM_IMAGE.height

  function openBook() {
    if (zoomOrigin) return
    setIsHovering(false)
    const x = BOOK_HOTSPOT.left + BOOK_HOTSPOT.width / 2
    const y = BOOK_HOTSPOT.top + BOOK_HOTSPOT.height / 2
    setZoomOrigin(`${x}% ${y}%`)
  }

  return (
    <motion.section
      aria-label="My cozy room"
      className="absolute inset-0 overflow-hidden bg-night"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        ref={sceneRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: `max(100vw, calc(100dvh * ${ratio}))`,
          height: `max(100dvh, calc(100vw / ${ratio}))`,
          x: '-50%',
          y: '-50%',
          transformOrigin: zoomOrigin ?? '50% 50%',
        }}
        initial={{ scale: 1.06 }}
        animate={zoomOrigin ? { scale: 6, opacity: 0, filter: 'blur(3px)' } : { scale: 1, opacity: 1 }}
        transition={zoomOrigin ? { duration: 1.4, ease: [0.7, 0, 0.3, 1] } : { duration: 2.2, ease: 'easeOut' }}
        onAnimationComplete={() => {
          if (zoomOrigin) onOpenBook()
        }}
      >
        <Image
          src={ROOM_IMAGE.src}
          alt={ROOM_IMAGE.alt}
          fill
          priority
          sizes="(max-aspect-ratio: 1312/1199) 120dvh, 100vw"
          className="select-none object-cover"
          draggable={false}
          // Tambahkan baris ini ke dalam tag Image:
          onLoad={() => {
            setTimeout(() => setShowGlow(true), 800)
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(10,6,25,0.55)_100%)]"
        />

        {showGlow && (
          <button
            type="button"
            onClick={openBook}
            aria-label="Open the Our Memories book"
            className="absolute cursor-pointer rounded-lg outline-none"
            style={{
              left: `${BOOK_HOTSPOT.left}%`,
              top: `${BOOK_HOTSPOT.top}%`,
              width: `${BOOK_HOTSPOT.width}%`,
              height: `${BOOK_HOTSPOT.height}%`,
              transform: `rotate(${BOOK_HOTSPOT.rotate}deg) skewX(${BOOK_HOTSPOT.skewX}deg)`,
            }}
          >
            <motion.span
              key="glow"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-lg bg-amber-300/5"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 0.9, 0.3],
                boxShadow: [
                  '0 0 15px 5px rgba(252,211,77,0.3)',
                  '0 0 35px 12px rgba(252,211,77,0.7)',
                  '0 0 15px 5px rgba(252,211,77,0.3)',
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </button>
        )}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-40 w-1/2 bg-[#5c1337] [background-image:repeating-linear-gradient(90deg,#420d27_0_12px,#6b1840_12px_40px)] opacity-100"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 z-40 w-1/2 bg-[#5c1337] [background-image:repeating-linear-gradient(90deg,#420d27_0_12px,#6b1840_12px_40px)] opacity-100"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
      />
    </motion.section>
  )
}
