'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from './ScrollAnimation'
import { Mail, Check } from 'lucide-react'

export function ContactForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showMailAnimation, setShowMailAnimation] = useState(false)
  const [showCompletionMessage, setShowCompletionMessage] = useState(false)
  const [showThankYouMessage, setShowThankYouMessage] = useState(false)

  const inputFields = [
    { id: 'name', label: '名前' },
    { id: 'email', label: 'メールアドレス' },
    { id: 'message', label: 'メッセージ', isTextarea: true },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)
    setShowMailAnimation(true)
    setTimeout(() => {
      setShowMailAnimation(false)
      setShowCompletionMessage(true)
    }, 2000)
    setTimeout(() => {
      setShowThankYouMessage(true)
    }, 3500)
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <ScrollAnimation>
      <section className="py-20 bg-transparent text-white flex-grow flex flex-col justify-center">
        <div className="container mx-auto px-4 flex-grow flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-center mb-12 relative z-10 font-sans tracking-wide">Contact</h2>
          <div className="max-w-2xl mx-auto min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  className="space-y-8 w-full"
                  onSubmit={handleSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {inputFields.map((field) => (
                    <div key={field.id} className="relative">
                      <label
                        htmlFor={field.id}
                        className={`absolute left-0 transition-all duration-300 ${
                          focusedField === field.id || (document.getElementById(field.id) as HTMLInputElement | HTMLTextAreaElement)?.value
                            ? 'text-xs top-[-1.5rem] text-gray-600'
                            : 'text-base top-2 text-gray-400'
                        }`}
                      >
                        {field.label}
                      </label>
                      {field.isTextarea ? (
                        <textarea
                          id={field.id}
                          className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600 transition-colors resize-none"
                          rows={4}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                      ) : (
                        <input
                          id={field.id}
                          type={field.id === 'email' ? 'email' : 'text'}
                          className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-gray-600 transition-colors"
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          required
                        />
                      )}
                    </div>
                  ))}
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    送信
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="text-center relative w-full h-40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AnimatePresence>
                    {showMailAnimation && (
                      <motion.div
                        initial={{ scale: 0, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: -50 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="absolute top-[-60px] left-1/2 transform -translate-x-1/2"
                      >
                        <Mail size={48} className="text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showCompletionMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center justify-center absolute top-0 left-0 right-0"
                      >
                        <Check size={24} className="text-green-500 mr-2" />
                        <h3 className="text-2xl font-semibold text-white">送信完了</h3>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showThankYouMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-300 absolute top-12 left-0 right-0"
                      >
                        お問い合わせありがとうございます。<br />
                        3日程で返信させていただきます。
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  )
}

