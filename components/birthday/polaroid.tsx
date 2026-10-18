import Image from 'next/image'
import type { GiftPhoto } from '@/lib/gift-config'
import { cn } from '@/lib/utils'

type PolaroidProps = {
  photo: GiftPhoto
  accent?: 'tape' | 'pin' | 'none'
  className?: string
  sizes?: string
  priority?: boolean
}

export function Polaroid({ photo, accent = 'tape', className, sizes = '220px', priority }: PolaroidProps) {
  return (
    <figure
      className={cn(
        'relative bg-white p-2.5 pb-0 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] sm:p-3 sm:pb-0',
        className,
      )}
    >
      {accent === 'tape' && (
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-3 bg-blush/70 shadow-sm backdrop-blur-[1px]"
        />
      )}
      {accent === 'pin' && (
        <span
          aria-hidden="true"
          className="absolute -top-2 left-1/2 z-10 size-4 -translate-x-1/2 rounded-full bg-rose shadow-[inset_-2px_-2px_3px_rgba(0,0,0,0.35),0_3px_4px_rgba(0,0,0,0.4)]"
        />
      )}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-200">
        <Image 
          src={photo.src} 
          alt={photo.alt} 
          fill 
          sizes={sizes} 
          priority={priority}
          // KUNCI OPTIMASINYA DI SINI:
          // Turunkan quality ke 60. Gambar polaroid ukurannya kecil, 
          // jadi kualitas 60 udah tetep kelihatan tajam di HP, tapi sizenya turun drastis!
          quality={60} 
          className="object-cover" 
        />
      </div>
      <figcaption className="py-2.5 text-center font-hand text-xl leading-none text-ink sm:py-3 sm:text-2xl">
        {photo.caption}
      </figcaption>
    </figure>
  )
}