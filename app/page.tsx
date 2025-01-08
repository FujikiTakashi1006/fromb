'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { VideoBackground } from './components/VideoBackground'
import { FilmsSection } from './components/FilmsSection'
import { ContactForm } from './components/ContactForm'
import { Menu } from './components/Menu'
import { ScrollIndicator } from './components/ScrollIndicator'
import { Footer } from './components/Footer'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    console.log('Home component mounted')
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <motion.section
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center"
      >
        <VideoBackground />
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fromB%E6%96%B0%E3%83%AD%E3%82%B3%E3%82%99_%E7%A4%BE%E5%90%8D%E3%81%82%E3%82%8A-Jvow9qvvKnY1ew9hfRLIILNb1VDoPm.png"
              alt="fromB"
              width={280}
              height={140}
              priority
              className="h-auto w-[200px] md:w-[280px]"
            />
          </motion.div>
        </div>
        <ScrollIndicator />
      </motion.section>

      <div className="relative -mt-20 z-10 bg-section-gradient">
        <section id="films" className="pt-20">
          <FilmsSection />
        </section>

        <section id="contact" className="pt-20 pb-20">
          <ContactForm />
        </section>
      </div>

      <Footer />
    </main>
  )
}

