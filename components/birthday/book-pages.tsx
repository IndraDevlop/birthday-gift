'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BOOK_PAGES, GIFT_CONFIG, type BookPage } from '@/lib/gift-config'
import { Polaroid } from './polaroid'

type Side = 'left' | 'right'

function PaperFace({ side, children }: { side: Side; children: ReactNode }) {
  const isLeft = side === 'left'
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-paper text-ink [container-type:size] ${
        isLeft ? 'rounded-l-xl' : 'rounded-r-xl'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(0deg,transparent_0_27px,rgba(251,113,133,0.16)_27px_28px)]"
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 w-[14%] ${
          isLeft ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
        } from-black/20 via-black/5 to-transparent`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-1 w-1 ${isLeft ? 'left-0' : 'right-0'} bg-[repeating-linear-gradient(180deg,#e9dcc8_0_2px,#fdf6ec_2px_4px)]`}
      />
      <div className="relative h-full w-full overflow-hidden">{children}</div>
    </div>
  )
}

export function CoverFace() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-r-xl border-l-[14px] border-[#7f1d4e] bg-gradient-to-br from-rose via-[#d9487a] to-[#9d2a5f] [container-type:size]">
      <div aria-hidden="true" className="absolute inset-[6%] rounded-lg border-2 border-dashed border-paper/40" />
      <div className="relative flex h-full flex-col items-center justify-center gap-[4cqh] px-[10%] text-center">
        <Heart
          className="size-[14cqw] text-paper drop-shadow-[0_0_20px_rgba(253,246,236,0.6)]"
          fill="currentColor"
          strokeWidth={0}
        />
        <h2 className="font-hand text-[clamp(1.75rem,15cqw,4.5rem)] font-bold leading-none text-paper text-balance">
          {GIFT_CONFIG.room.bookLabel}
        </h2>
        <p className="text-[clamp(0.6rem,3.6cqw,0.85rem)] font-medium uppercase tracking-[0.3em] text-paper/80">
          {GIFT_CONFIG.book.coverSubtitle}
        </p>
        <p className="mt-[3cqh] flex items-center gap-2 rounded-full bg-paper/15 px-4 py-2 text-[clamp(0.65rem,3.8cqw,0.9rem)] text-paper">
          <Sparkles className="size-4" aria-hidden="true" />
          Tap or swipe to open
        </p>
      </div>
    </div>
  )
}

export function InsideCoverPage() {
  return (
    <PaperFace side="left">
      <div className="flex h-full flex-col items-center justify-center gap-[4cqh] px-[12%] text-center">
        <Heart className="size-[16cqw] text-rose" fill="currentColor" strokeWidth={0} />
        <p className="font-hand text-[clamp(1.25rem,10cqw,3rem)] leading-tight text-[#9d2a5f] text-balance">
          {GIFT_CONFIG.book.coverSubtitle}
        </p>
        <p className="text-[clamp(0.6rem,3.6cqw,0.85rem)] uppercase tracking-[0.3em] text-ink/50">
          {'for '}
          {GIFT_CONFIG.recipientName}
        </p>
      </div>
    </PaperFace>
  )
}

export function BirthdayPage() {
  return (
    <PaperFace side="right">
      <div className="flex h-full flex-col items-center justify-center gap-[4cqh] px-[10%] text-center">
        <span aria-hidden="true" className="text-[clamp(2.5rem,24cqw,7rem)] leading-none">
          {'🎂'}
        </span>
        <h2 className="font-hand text-[clamp(1.5rem,13cqw,4rem)] font-bold leading-tight text-[#9d2a5f] text-balance">
          {GIFT_CONFIG.book.coverTitle.replace('🎂', '').trim()}
        </h2>
        <p className="font-hand text-[clamp(0.9rem,6cqw,1.6rem)] text-ink/70">Turn the page, my love</p>
      </div>
    </PaperFace>
  )
}

export function PhotoPage({ page, pageNumber }: { page: BookPage; pageNumber: number }) {
  const tilt = pageNumber % 2 === 0 ? 'rotate-3' : '-rotate-3'
  const photos = Array.isArray(page.photo) ? page.photo : [page.photo]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (photos.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [photos.length])

  return (
    <PaperFace side="left">
      
      {/* TRIK MEMORY SEMENTARA (IDE LU BANGET!) */}
      {/* Kita render semua foto di background dengan class "hidden" (display: none). 
          Browser bakal nge-download fotonya ke memori (cache), tapi GPU HP lu 
          gak bakal nge-render fisiknya, jadi DIJAMIN GAK CRASH! */}
      <div className="hidden">
        {photos.map((photo, i) => (
          <Polaroid 
            key={`preload-${i}`}
            photo={photo} 
            accent="tape" 
            sizes="(min-width: 768px) 320px, 45vw"
            priority={true} // Paksa Next.js nyimpen ke memori sejak awal
          />
        ))}
      </div>

      <div className="flex h-full items-center justify-center p-[10%]">
        {/* DOM utama tetep bersih, cuma 1 foto yang hidup secara fisik */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Polaroid 
              photo={photos[currentIndex]} 
              accent="tape" 
              className={`w-[min(78cqw,62cqh)] ${tilt}`} 
              sizes="(min-width: 768px) 320px, 45vw"
              priority={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </PaperFace>
  )
}

export function TextPage({ page, pageNumber }: { page: BookPage; pageNumber: number }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const touchY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation() 
    touchY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation()
    if (!scrollRef.current) return
    const currentY = e.touches[0].clientY
    const delta = touchY.current - currentY
    scrollRef.current.scrollTop += delta 
    touchY.current = currentY
  }

  return (
    <PaperFace side="right">
      <div 
        ref={scrollRef}
        // TAMBAHKAN [transform:translateZ(0)] dan [backface-visibility:hidden] DI SINI
        className="absolute inset-0 px-[11%] py-[10%] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [transform:translateZ(0)] [backface-visibility:hidden]"
        style={{ touchAction: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[2.2cqh] pb-12">
          {page.date && (
            <p className="text-[clamp(0.55rem,3.4cqw,0.8rem)] font-semibold uppercase tracking-[0.25em] text-rose">{page.date}</p>
          )}
          <h2 className="font-hand text-[clamp(1.1rem,7cqw,2rem)] font-bold leading-tight text-[#9d2a5f] text-balance">
            {page.title}
          </h2>
          <p className="font-hand text-[clamp(0.8rem,5.2cqw,1.45rem)] leading-relaxed text-ink/90 text-pretty">
            {page.message}
          </p>
          <p className="text-[clamp(0.55rem,3cqw,0.75rem)] text-ink/40 pt-2 pb-4">
            {'Page '}
            {pageNumber}
            {' of '}
            {BOOK_PAGES.length}
          </p>
        </div>
      </div>
    </PaperFace>
  )
}

export function ClosingPage() {
  return (
    <PaperFace side="left">
      <div className="flex h-full flex-col items-center justify-center gap-[3cqh] px-[12%] text-center">
        <p className="font-hand text-[clamp(1.2rem,9cqw,2.75rem)] leading-tight text-ink/80 text-balance">
          And there are so many more chapters to write...
        </p>
        <Heart className="size-[10cqw] text-rose" fill="currentColor" strokeWidth={0} />
      </div>
    </PaperFace>
  )
}

export function BookEnd({ 
  onReadAgain, 
  onVideoPlay, 
  onVideoResume
}: { 
  onReadAgain: () => void; 
  onVideoPlay?: () => void; 
  onVideoResume?: () => void 
}) {
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showExplosion, setShowExplosion] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const HOLD_DURATION = 2000

  const startHolding = () => {
    if (isUnlocked) return
    setHolding(true)
    setProgress(0)

    const startTime = Date.now()
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100)
      setProgress(currentProgress)
    }, 30)

    timerRef.current = setTimeout(() => {
      stopHolding()
      setShowExplosion(true)
      setIsUnlocked(true)
      setIsVideoModalOpen(true)

      // Pause musik background saat video mulai
      if (onVideoPlay) onVideoPlay()

      setTimeout(() => {
        setShowExplosion(false)
      }, 2500)
    }, HOLD_DURATION)
  }

  const stopHolding = () => {
    setHolding(false)
    setProgress(0)
    if (timerRef.current) clearTimeout(timerRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleCloseModal = () => {
    setIsVideoModalOpen(false)
    // Resume / nyalakan kembali musik background saat modal ditutup
    if (onVideoResume) onVideoResume()
  }

  const handleReadAgainFromModal = () => {
    setIsVideoModalOpen(false)
    if (onVideoResume) onVideoResume()
    onReadAgain()
  }

  const handleWhatsAppClick = () => {
    const phone = "6282115099668" // Ganti nomor WhatsApp kamu di sini
    const message = encodeURIComponent("Sayangku yang ganteng dan pintar... aku udah baca semua isi bukunya sampai habis, kalo nanti ketemu aku mau cium kamu yang lamaaa ❤️ I love you sayang!")
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <PaperFace side="right">
      {/* Efek Ledakan */}
      <AnimatePresence>
        {showExplosion && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden bg-rose/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * 360
              const distance = 90 + Math.random() * 70
              return (
                <motion.div
                  key={i}
                  className="absolute text-rose"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1.5, 0.8],
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <Heart className="size-6 fill-current text-rose" />
                </motion.div>
              )
            })}
            <motion.div
              className="absolute text-center font-hand text-3xl font-bold text-rose drop-shadow-md"
              initial={{ scale: 0.5, y: 20 }}
              animate={{ scale: 1.2, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              ✨ Surprises Unlocked! ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-full flex-col items-center justify-start gap-[2.5cqh] overflow-y-auto pt-[5%] px-[10%] text-center">
        {!isUnlocked ? (
          <>
            <h2 className="font-hand text-[clamp(1.3rem,11cqw,3.25rem)] font-bold leading-tight text-[#9d2a5f] text-balance">
              {GIFT_CONFIG.book.endTitle}
            </h2>
            <p className="font-hand text-[clamp(0.8rem,5.4cqw,1.5rem)] leading-snug text-ink/90 text-pretty">
              {GIFT_CONFIG.book.endMessage}
            </p>
            <p className="font-hand text-[clamp(1rem,7cqw,2rem)] text-rose">{GIFT_CONFIG.senderName}</p>
            
            <div className="mt-2 flex flex-col items-center">
              <div className="relative flex size-20 items-center justify-center">
                <svg className="absolute inset-0 m-auto size-20 pointer-events-none -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" className="stroke-rose/20" strokeWidth="6" fill="none" />
                  <circle
                    cx="50" cy="50" r="42"
                    className="stroke-rose transition-all duration-75"
                    strokeWidth="6"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * progress) / 100}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                <button
                  type="button"
                  onMouseDown={startHolding}
                  onMouseUp={stopHolding}
                  onMouseLeave={stopHolding}
                  onTouchStart={startHolding}
                  onTouchEnd={stopHolding}
                  className={`relative flex size-14 items-center justify-center rounded-full outline-none transition-all select-none ${
                    holding 
                      ? 'scale-95 bg-rose text-white shadow-[0_0_25px_rgba(251,113,133,1)]' 
                      : 'bg-ink/10 text-ink/80 hover:bg-rose/40 hover:text-rose scale-100'
                  }`}
                  aria-label="Press and hold for final surprise"
                >
                  <Heart className="size-6 fill-current" />
                </button>
              </div>
            </div>
            <span className="mt-1 text-[clamp(0.55rem,3cqw,0.75rem)] font-medium text-ink/60 animate-pulse">
              Press & hold to unlock surprise ❤️️
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <h3 className="font-hand text-2xl font-bold text-[#9d2a5f]">Surprise Unlocked! 🎉</h3>
            <button
              type="button"
              onClick={() => {
                if (onVideoPlay) onVideoPlay()
                setIsVideoModalOpen(true)
              }}
              className="rounded-full bg-rose px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-rose/90"
            >
              Putar Ulang Video 🎬
            </button>
          </div>
        )}
      </div>

      {/* Modal Video Fullscreen: pointer-events-auto mengunci total agar klik tidak tembus ke buku */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-auto flex flex-col items-center justify-center bg-night/98 p-4 backdrop-blur-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Mencegah event bubbling ke elemen luar
          >
            <div className="relative flex flex-col items-center justify-center w-full max-w-sm h-full max-h-[85vh] gap-3">
              
              {/* Tombol Silang (X) untuk Menutup Modal */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close video modal"
                className="absolute -top-2 right-0 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-rose hover:text-night transition-colors"
              >
                ✕
              </button>

              <h3 className="font-hand text-2xl sm:text-3xl font-bold text-blush">Special Video For You ❤️</h3>
              
              <div className="relative w-full flex-1 max-h-[68vh] aspect-[9/16] sm:aspect-auto overflow-hidden rounded-2xl shadow-2xl border border-rose/40 bg-black flex items-center justify-center">
                <video
                  src="/surprise.mp4"
                  autoPlay
                  playsInline
                  controls
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-105 active:scale-95"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Kirim Pesan</span>
                </motion.button>

                <button
                  type="button"
                  onClick={handleReadAgainFromModal}
                  className="rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20"
                >
                  Baca dari Awal 📖
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PaperFace>
  )
}