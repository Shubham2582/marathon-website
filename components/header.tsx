'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PNG%20FOR%20WHITE-XnTh0iSNRB193VAsfIfYj00SNKxAf2.png"
              alt="Abujhmad Marathon 2025 Logo"
              width={300}
              height={90}
              className="h-20 w-auto"
            />
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {['Race Categories', 'News & Media', 'Past Winners'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Register Now
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qRtztWSu_400x400-tbTddpdVKml9HkbgJKbf3XFUTrwfL8.png"
                alt="Narayanpur Police Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
            </motion.div>
          </nav>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden absolute top-24 left-0 right-0 bg-white/95 backdrop-blur-lg border-b shadow-lg p-6"
              >
                <nav className="flex flex-col gap-6">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PNG%20FOR%20WHITE-XnTh0iSNRB193VAsfIfYj00SNKxAf2.png"
                    alt="Abujhmad Marathon 2025 Logo"
                    width={240}
                    height={72}
                    className="h-16 w-auto mx-auto mb-6"
                  />
                  {['Race Categories', 'News & Media', 'Past Winners'].map((item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    Register Now
                  </Button>
                  <div className="flex justify-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qRtztWSu_400x400-tbTddpdVKml9HkbgJKbf3XFUTrwfL8.png"
                      alt="Narayanpur Police Logo"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}

