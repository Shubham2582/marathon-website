'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { MapPin, Play, ChevronRight, Calendar, Users, Trophy } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ImageCarousel from '@/components/image-carousel' 

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section ref={targetRef} className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eZrFJlydSNihm_tVCa5gNA-A8bGs0EEWe739K1TpiWhbl7QxnwYV5.webp"
            alt="Dynamic view of marathon runners on a sunlit forest path with motion blur effect emphasizing speed and movement"
            fill
            priority
            quality={100}
            className="object-cover"
          />
        </motion.div>
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-center text-white px-4 max-w-5xl mx-auto"
        >
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Ready to Run in
            <span className="block text-primary">February</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Join thousands in the most scenic marathon that celebrates peace and unity. 
            Experience the serenity of Abujhmad while pushing your limits.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white text-lg px-10 h-16 rounded-full"
            >
              Register Now
              <ChevronRight className="ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20 text-lg px-10 h-16 rounded-full transition-colors"
            >
              Learn More
              <ChevronRight className="ml-2" />
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronRight className="w-12 h-12 text-white animate-bounce rotate-90" />
        </motion.div>
      </section>

      {/* Event Overview */}
      <section className="py-32 bg-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              EVENT OVERVIEW
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl leading-relaxed mb-12">
              District administration and Narayanpur Police are organising Abujhmad peace marathon 
              dedicated to the cause of bringing peace and prosperity to the insurgency affected tribal 
              areas of Abujhmad and to provide an international platform to the area so that people 
              from across the world can come and experience the serenity and divinity of Abujhmad.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: 'date', icon: Calendar, title: "February 15, 2025", description: "Mark your calendars" },
                { id: 'runners', icon: Users, title: "10,000+ Runners", description: "From all over the world" },
                { id: 'categories', icon: Trophy, title: "5 Categories", description: "For all skill levels" },
              ].map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-32 bg-neutral-100">
        <div className="container px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Capture the Moment
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* First Video Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] bg-gray-900">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w_rbbt4iTX6YYUPRiuvnTA.jpg-o3r8KUgeBqEqobjawY5sujNlitOqGu.jpeg"  // Your original running image URL
                    alt="Runners in motion through a sunlit forest path"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Videos</h3>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                    onClick={() => window.open('https://drive.google.com/drive/folders/13wcKOSmK2rm3vwE2YiuTZDMXsV0Lx6Ov?usp=sharing', '_blank')}
                  >
                    Watch All
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Image Carousel Component */}
            <ImageCarousel />

            {/* Second Video Component - Using same image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] bg-gray-900">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w_rbbt4iTX6YYUPRiuvnTA.jpg-o3r8KUgeBqEqobjawY5sujNlitOqGu.jpeg"  // Your original running image URL
                    alt="Runners in motion through a sunlit forest path"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Videos</h3>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                    onClick={() => window.open('https://drive.google.com/drive/folders/13wcKOSmK2rm3vwE2YiuTZDMXsV0Lx6Ov?usp=sharing', '_blank')}
                  >
                    Watch All
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Track Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Discover the Track
            </h2>
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/track.jpg"
                alt="3D aerial view of the marathon track route winding through scenic mountainous terrain"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-lg"
                >
                  <MapPin className="w-16 h-16 text-primary" />
                </motion.div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg px-10 h-16 rounded-full"
              >
                Explore Full Map
                <ChevronRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-32 bg-neutral-100">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Our Esteemed Sponsors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* First Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[3/2] relative">
                  <Image
                    src="/images/logo1.png"
                    alt="Sponsor Logo 1"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Second Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[3/2] relative">
                  <Image
                    src="/images/logo2.png"
                    alt="Sponsor Logo 2"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Empty Placeholder Slots */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8 opacity-30"
              >
                <div className="aspect-[3/2] relative">
                  <Image
                    src="/placeholder.svg"
                    alt="Future Sponsor"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8 opacity-30"
              >
                <div className="aspect-[3/2] relative">
                  <Image
                    src="/placeholder.svg"
                    alt="Future Sponsor"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

