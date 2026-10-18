'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { GIFT_CONFIG, PHOTOS } from '@/lib/gift-config'
import { Polaroid } from './polaroid'

const SLOTS = [
  { top: '4%', left: '3%' },
  { top: '6%', left: '38%' },
  { top: '3%', left: '72%' },
  { top: '58%', left: '5%' },
  { top: '62%', left: '40%' },
  { top: '56%', left: '74%' },
]

export function PhotoWall({ onEnter }: { onEnter: () => void }) {
  const [isLeaving, setIsLeaving] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null) // State baru untuk foto yang di-zoom

  const cards = useMemo(
    () =>
      PHOTOS.slice(0, SLOTS.length).map((photo, i) => ({
        photo,
        slot: SLOTS[i],
        rotate: Math.round(Math.random() * 30 - 15),
        accent: i % 2 === 0 ? ('tape' as const) : ('pin' as const),
      })),
    [],
  )

  function leave() {
    if (!isLeaving) setIsLeaving(true)
  }

  return (
    <motion.section
      aria-label="Photo wall"
      // Hapus onClick leave dari background agar tidak langsung pindah kamar saat salah klik
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#3b2d6b_0%,#1e1b4b_70%)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
      />

      {/* Render Foto-Foto */}
      {cards.map(({ photo, slot, rotate, accent }, i) => (
        <motion.div
          key={photo.src}
          className="absolute w-[30vw] max-w-[230px] sm:w-[24vw] lg:w-[18vw] cursor-pointer" // Tambah cursor-pointer
          style={{ top: slot.top, left: slot.left }}
          initial={{ opacity: 0, scale: 0.4, rotate: rotate * 3, y: 80 }}
          animate={{ opacity: 1, scale: 1, rotate, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.15 + i * 0.12 }}
          whileHover={{ scale: 1.08, rotate: 0, zIndex: 20, transition: { duration: 0.25 } }}
          onClick={() => setSelectedPhoto(i)} // Saat diklik, set foto yang aktif
        >
          <Polaroid photo={photo} accent={accent} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 24vw, 38vw" priority={i < 3} />
        </motion.div>
      ))}

      {/* Kotak Tombol Tengah */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
        <motion.div
          className="pointer-events-auto flex max-w-sm flex-col items-center gap-4 rounded-3xl border border-white/15 bg-night/70 px-8 py-7 text-center shadow-2xl backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h1 className="font-hand text-4xl leading-tight text-blush text-balance sm:text-5xl">
            {GIFT_CONFIG.photoWall.heading}
          </h1>
          <motion.button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              leave()
            }}
            className="rounded-full bg-gradient-to-r from-rose to-blush px-7 py-3 font-semibold text-night shadow-[0_8px_30px_-6px_rgba(251,113,133,0.9)] outline-none focus-visible:ring-4 focus-visible:ring-white/60"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileTap={{ scale: 0.95 }}
          >
            {GIFT_CONFIG.photoWall.buttonText}
          </motion.button>
          
          {/* Teks Petunjuk yang diubah */}
          <p className="text-xs font-medium text-white/70">Tap any photo to zoom in ✨</p>
        </motion.div>
      </div>

      {/* Modal / Lightbox Zoom Foto Interaktif */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)} // Tutup saat area luar diklik
          >
            <motion.div
              className="relative w-[85vw] max-w-[450px]"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }} // Efek mengecil saat ditutup
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Cegah tutup saat foto ditekan
            >
              <Polaroid 
                photo={cards[selectedPhoto].photo} 
                accent={cards[selectedPhoto].accent} 
                sizes="85vw" 
              />
              <button
                className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose text-night shadow-lg hover:bg-blush"
                onClick={() => setSelectedPhoto(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tirai Animasi Pintu Masuk (Dengan Warna Solid yang Baru) */}
      {isLeaving && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-50 w-1/2 bg-[#5c1337] shadow-[15px_0_50px_rgba(0,0,0,0.8)] [background-image:repeating-linear-gradient(90deg,#420d27_0_12px,#6b1840_12px_40px)] opacity-100"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-50 w-1/2 bg-[#5c1337] shadow-[-15px_0_50px_rgba(0,0,0,0.8)] [background-image:repeating-linear-gradient(90deg,#420d27_0_12px,#6b1840_12px_40px)] opacity-100"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={onEnter}
          />
        </>
      )}
    </motion.section>
  )
}