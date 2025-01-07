'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const GALLERY_FOLDER_ID = '1z3bfxfqIG0DBsMFPpv1ER6VvZKGSINit'
const CLICK_FOLDER_ID = '1hqXmr7u29tmbrDkB5uAU51M-IqlUdAQe'

const ImageCarousel = () => {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/drive-images?folderId=${GALLERY_FOLDER_ID}`)
        const data = await response.json()
        if (data.files) {
          setImages(data.files)
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchImages()
  }, [])

  useEffect(() => {
    if (images.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [images])

  const handleGalleryClick = () => {
    window.open(`https://drive.google.com/drive/folders/${CLICK_FOLDER_ID}`, '_blank')
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2">
          <div className="relative aspect-[4/3] bg-gray-900 flex items-center justify-center">
            <div className="text-white">Loading images...</div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2">
          <div className="relative aspect-[4/3] bg-gray-900 flex items-center justify-center">
            <div className="text-white">No images found</div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2">
        <div className="relative aspect-[4/3] bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              onClick={handleGalleryClick}
              style={{ cursor: 'pointer' }}
            >
              <Image
                src={images[currentIndex].webContentLink || '/placeholder.jpg'}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Images</h3>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            onClick={handleGalleryClick}
          >
            View Gallery
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ImageCarousel