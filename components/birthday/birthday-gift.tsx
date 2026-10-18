'use client'

import { AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { useBackgroundMusic } from '@/hooks/use-background-music'
import { GIFT_CONFIG } from '@/lib/gift-config'
import { CozyRoom } from './cozy-room'
import { Flipbook } from './flipbook'
import { FloatingControls } from './floating-controls'
import { PhotoWall } from './photo-wall'
import { SplashScreen } from './splash-screen'

export type Stage = 'splash' | 'wall' | 'room' | 'book'

export function BirthdayGift() {
  const [stage, setStage] = useState<Stage>('splash')
  const [isLastPage, setIsLastPage] = useState(false) // State penanda halaman akhir buku
  const flipbookRef = useRef<{ goTo: (page: number) => void }>(null)

  const music = useBackgroundMusic(GIFT_CONFIG.music.src, GIFT_CONFIG.music.volume)

  function openGift() {
    music.play()
    setStage('wall')
  }

  function restartJourney() {
    music.stop()
    setStage('splash')
    setIsLastPage(false)
  }

  return (
    <main className="relative h-full w-full overflow-hidden bg-night">
      <AnimatePresence>
        {stage === 'splash' && <SplashScreen key="splash" onOpen={openGift} />}
        {stage === 'wall' && <PhotoWall key="wall" onEnter={() => setStage('room')} />}
        {stage === 'room' && <CozyRoom key="room" onOpenBook={() => setStage('book')} />}
        {stage === 'book' && (
          <Flipbook 
            key="book" 
            onPageChange={(last) => setIsLastPage(last)} 
            onVideoPlay={music.pause}
            onVideoResume={music.play}
          />
        )}
      </AnimatePresence>

      {stage !== 'splash' && (
        <FloatingControls
          isPlaying={music.isPlaying}
          onToggleMusic={music.toggle}
          showNavigation={stage === 'book'}
          onBackToRoom={() => setStage('room')}
          onRestart={restartJourney}
          onReadAgain={() => {
            setStage('book')
            setIsLastPage(false)
            window.location.reload()
          }}
        />
      )}
    </main>
  )
}