'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useBackgroundMusic(src: string, volume = 0.6) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(src)
      audio.loop = true
      audio.volume = volume
      audio.preload = 'auto'
      audio.addEventListener('play', () => setIsPlaying(true))
      audio.addEventListener('pause', () => setIsPlaying(false))
      audioRef.current = audio
    }
    return audioRef.current
  }, [src, volume])

  // Must be called from a user gesture so browsers allow playback.
  const play = useCallback(() => {
    getAudio()
      .play()
      .catch(() => setIsPlaying(false))
  }, [getAudio])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    const audio = getAudio()
    if (audio.paused) play()
    else pause()
  }, [getAudio, play, pause])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }, [])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  return { isPlaying, play, pause, toggle, stop }
}
