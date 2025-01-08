import { motion, AnimatePresence } from 'framer-motion'
import { MenuIcon, X, Instagram, Youtube } from 'lucide-react'

const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'Films', href: '#films' },
  { name: 'Contact', href: '#contact' },
]

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Menu({ isOpen, setIsOpen }: MenuProps) {
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  }

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 text-white p-3 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <MenuIcon size={32} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 h-full w-64 bg-black z-50"
            >
              <div className="flex flex-col items-end p-8 h-full">
                <button
                  className="self-end mb-8 text-white"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={32} />
                </button>
                <div className="w-full">
                  {menuItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block py-2 text-right text-white hover:text-gray-300 transition-colors text-2xl"
                      onClick={() => setIsOpen(false)}
                      variants={itemVariants}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <motion.div 
                    className="flex justify-end space-x-6 mt-8"
                    variants={itemVariants}
                  >
                    <a href="#" className="text-white hover:text-[#FFA500] transition-colors">
                      <Instagram size={20} />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a href="#" className="text-white hover:text-[#FF0000] transition-colors">
                      <Youtube size={20} />
                      <span className="sr-only">YouTube</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

