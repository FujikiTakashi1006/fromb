import { useEffect, useRef } from 'react'

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0 // 通常の再生速度に設定
      console.log('Video element:', videoRef.current)
      console.log('Video source:', videoRef.current.currentSrc)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HP_TOP%E3%83%A0%E3%83%BC%E3%83%92%E3%82%99%E3%83%BCV1-e41IHCFllJXB4iFEC3nkaGVyJ2BoQf.mp4" type="video/mp4" />
      ブラウザがビデオをサポートしていません。
    </video>
  )
}

