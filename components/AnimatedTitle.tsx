'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedTitle() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl font-bold text-white text-center relative z-10 font-serif tracking-wide"
      >
        Films
      </motion.h2>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 0.1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-gray-700 opacity-10 z-0"
      >
        highlight
      </motion.span>
    </div>
  )
}

