import Image from 'next/image'
import { motion } from 'framer-motion'

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="w-[280px] h-auto"
    >
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fromB%E6%96%B0%E3%83%AD%E3%82%B3%E3%82%99_%E7%A4%BE%E5%90%8D%E3%81%82%E3%82%8A-zV5q21O2Fs0Kd8Gh15Iaj1FALSAiyR.png"
        alt="fromB"
        width={280}
        height={140}
        priority
      />
    </motion.div>
  )
}

