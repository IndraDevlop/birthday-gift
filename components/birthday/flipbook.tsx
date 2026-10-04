'use client'

import { motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { BOOK_PAGES } from '@/lib/gift-config'
import {
  BirthdayPage,
  BookEnd,
  ClosingPage,
  CoverFace,
  InsideCoverPage,
  PhotoPage,
  TextPage,
} from './book-pages'
import { FloatingHearts } from './floating-hearts'

type Leaf = { front: ReactNode; back: ReactNode }

const LEAVES: Leaf[] = [
  { front: <CoverFace />, back: <InsideCoverPage /> },
  { front: <BirthdayPage />, back: <PhotoPage page={BOOK_PAGES[0]} pageNumber={1} /> },
  ...BOOK_PAGES.map((page, i) => ({
    front: <TextPage page={page} pageNumber={i + 1} />,
    back:
      i < BOOK_PAGES.length - 1 ? (
        <PhotoPage page={BOOK_PAGES[i + 1]} pageNumber={i + 2} />
      ) : (
        <ClosingPage />
      ),
  })),
]

const LEAF_COUNT = LEAVES.length
const FLIP_DURATION = 0.9
const STAGGER = 0.12
const AUTO_OPEN_DELAY_MS = 950

type FlipState = { flipped: number; from: number }

export function Flipbook({ onPageChange, onVideoPlay, onVideoResume }: { 
  onPageChange?: (isLastPage: boolean) => void; 
  onVideoPlay?: () => void;
  onVideoResume?: () => void
 }) {
  const [{ flipped, from }, setFlip] = useState<FlipState>({ flipped: 0, from: 0 })

  const goTo = useCallback((target: number) => {
    setFlip((current) => {
      const next = Math.min(Math.max(target, 0), LEAF_COUNT)
      return next === current.flipped ? current : { flipped: next, from: current.flipped }
    })
  }, [])

  // Setiap halaman berubah, laporkan apakah ini halaman terakhir ke parent
  useEffect(() => {
    if (onPageChange) {
      onPageChange(flipped === LEAF_COUNT)
    }
  }, [flipped, onPageChange])

  const step = useCallback(
    (delta: number) => setFlip((current) => {
      const next = Math.min(Math.max(current.flipped + delta, 0), LEAF_COUNT)
      return next === current.flipped ? current : { flipped: next, from: current.flipped }
    }),
    [],
  )

  useEffect(() => {
    const timer = window.setTimeout(() => goTo(1), AUTO_OPEN_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [goTo])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  function onBookClick(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button')) return
    if (flipped === 0) return step(1)
    const rect = event.currentTarget.getBoundingClientRect()
    step(event.clientX - rect.left > rect.width / 2 ? 1 : -1)
  }

  function onPanEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -50) step(1)
    else if (info.offset.x > 50) step(-1)
  }

  const forward = flipped > from
  const movingStart = Math.min(from, flipped)
  const movingEnd = Math.max(from, flipped)

  return (
    <motion.section
      aria-label="Memory book"
      aria-roledescription="flipbook"
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_center,#3b2d6b_0%,#1e1b4b_75%)] px-3 pb-5 pt-16 sm:px-8 sm:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FloatingHearts className="text-blush/15" />

      <motion.div
        className="relative aspect-[3/2] w-[min(94vw,1040px,calc((100dvh-170px)*1.5))] [perspective:2400px]"
        initial={{ scale: 0.35, y: 80 }}
        animate={{ scale: 1, y: 0, x: flipped === 0 ? '-25%' : '0%' }}
        transition={{
          scale: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
          y: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
          x: { duration: FLIP_DURATION, ease: [0.645, 0.045, 0.355, 1] },
        }}
        onClick={onBookClick}
        onPanEnd={onPanEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75)]"
          animate={{ left: flipped === 0 ? '50%' : '0%' }}
          transition={{ duration: FLIP_DURATION }}
        />

        {/* Note: BookEnd onReadAgain diarahkan kembali ke halaman awal (goTo(1) atau goTo(0)) */}
        <div className="absolute inset-y-0 right-0 w-1/2">
          <BookEnd onReadAgain={() => goTo(1)} onVideoPlay={onVideoPlay} onVideoResume={onVideoResume} />
        </div>

        {LEAVES.map((leaf, i) => {
          const isFlipped = i < flipped
          const isMoving = i >= movingStart && i < movingEnd
          const delay = isMoving ? (forward ? i - movingStart : movingEnd - 1 - i) * STAGGER : 0
          const zIndex = isMoving
            ? forward
              ? 20 + i
              : 20 + LEAF_COUNT - i
            : isFlipped
              ? i + 1
              : LEAF_COUNT - i

          return (
            <motion.div
              key={i}
              className="absolute inset-y-0 left-1/2 w-1/2 cursor-pointer [transform-style:preserve-3d]"
              style={{ transformOrigin: 'left center', zIndex }}
              initial={false}
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={{ duration: FLIP_DURATION, ease: [0.645, 0.045, 0.355, 1], delay }}
              aria-hidden={!(i === flipped || i === flipped - 1)}
            >
              <div className="absolute inset-0 [backface-visibility:hidden]">{leaf.front}</div>
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                {leaf.back}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <p className="sr-only" aria-live="polite">
        {flipped === 0 ? 'Book closed' : `Spread ${flipped} of ${LEAF_COUNT}`}
      </p>

      <nav aria-label="Book pages" className="relative z-10 flex items-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={flipped === 0}
          aria-label="Previous page"
          className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-night/70 text-white backdrop-blur-md outline-none transition hover:bg-dusk focus-visible:ring-4 focus-visible:ring-blush/60 disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>
        <ol className="flex items-center gap-1.5">
          {Array.from({ length: LEAF_COUNT + 1 }, (_, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={i === 0 ? 'Close the book' : `Go to spread ${i}`}
                aria-current={i === flipped ? 'page' : undefined}
                className={`block h-2 rounded-full transition-all ${i === flipped ? 'w-6 bg-blush' : 'w-2 bg-white/30 hover:bg-white/60'}`}
              />
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={flipped === LEAF_COUNT}
          aria-label="Next page"
          className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-night/70 text-white backdrop-blur-md outline-none transition hover:bg-dusk focus-visible:ring-4 focus-visible:ring-blush/60 disabled:opacity-30"
        >
          <ChevronRight className="size-5" />
        </button>
      </nav>
    </motion.section>
  )
}
