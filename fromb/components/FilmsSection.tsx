'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ScrollAnimation } from './ScrollAnimation'
import { ChevronDown, ChevronUp, Play } from 'lucide-react'
import { AnimatedTitle } from './AnimatedTitle' // Update 1: Added import

const films = [
  { 
    title: 'noh / Reverberation', 
    description: '大型スクリーンに映し出された映像を背景に、シルエットで演奏するメンバーを描写したMVをご覧ください。', 
    videoId: 'iuhFpC_Hd7s'
  },
  { 
    title: '空白の夜 / 鈍', 
    description: '90\'sエモポストロックシューゲイザーの要素を巧みに織り交ぜたテクニカルなバンドアンサンブルの中にベースボーカルであるアイリによる強烈な歌唱力と存在感を持った歌が渾然一体となる音像はなかなか他にはない個性。', 
    videoId: 'OHKQ9qmgzMM'
  },
  { 
    title: 'THE ENCORE / 四度目の桜', 
    description: '出会いから別れまでの季節を桜に重ねた切ないラブソング。忘れたくない気持ちと前に進む覚悟が交錯し、最後に「大好きだ」と静かに想いを告げる、胸に響く物語。', 
    videoId: 'BKRR6jc1RGE'
  },
  { 
    title: '駄洒落 / 夏の景', 
    description: '出会いから別れまでの季節を桜に重ねた切ないラブソング。忘れたくない気持ちと前に進む覚悟が交錯し、最後に「大好きだ」と静かに想いを告げる、胸に響く物語。', 
    videoId: 'd1_zrKLEhwQ'
  },
  { 
    title: '天使の疑問符／裏命', 
    description: '未熟な恋心と大人への葛藤を青に重ねた青春ソング。儚くも鮮烈な情景と疾走感あふれるメロディが、聴く者の心を揺さぶる一曲。', 
    videoId: '27wp7YMh3og'
  },
]

export function FilmsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % films.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  const handleImageClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer')
  }

  const toggleNotice = () => {
    setIsNoticeOpen(!isNoticeOpen)
  }

  return (
    <ScrollAnimation>
      <section id="films" className="pt-32 pb-20 bg-transparent flex flex-col items-center justify-center relative overflow-hidden"> {/* Update 3: Changed section class */}
        {/* Update 2: Replaced h2 with AnimatedTitle */}
        <AnimatedTitle />
        
        <div className="w-full max-w-7xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 filter blur-xl"
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${films[activeIndex].videoId}/maxresdefault.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </AnimatePresence>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-[60vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/2 h-[30vh] md:h-[60vh] relative cursor-pointer group mb-4 md:mb-0"
                onClick={() => handleImageClick(films[activeIndex].videoId)}
              >
                <Image
                  src={`https://img.youtube.com/vi/${films[activeIndex].videoId}/maxresdefault.jpg`}
                  alt={films[activeIndex].title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <Play className="w-16 h-16 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full md:w-1/2 md:pl-8 text-white mt-4 md:mt-0"
              >
                <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg">
                  <h3 className="text-3xl font-bold mb-4 text-shadow">{films[activeIndex].title}</h3>
                  <p className="text-xl text-shadow">{films[activeIndex].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 mb-12 space-x-2 relative z-20">
            {films.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-white' : 'bg-gray-500 hover:bg-gray-300'
                } cursor-pointer`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="absolute bottom-0 right-0 text-[10px] text-gray-400 max-w-xs text-right p-2 bg-black/50 z-30 mb-16 md:mb-0">
            <button
              onClick={toggleNotice}
              className="flex items-center justify-end w-full"
            >
              <span>関係者各位</span>
              {isNoticeOpen ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
            </button>
            <AnimatePresence>
              {isNoticeOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 overflow-hidden text-left"
                >
                  当Webサイトに掲載されている作品について、水﨑一輝の作例紹介を目的としております。ご不都合があればメールにてご連絡いただきますと幸いです。
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  )
}

