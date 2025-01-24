import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import ImageCarousel from "@/components/image-carousel";

const Media = () => {
  return (
    <section className="py-32 bg-neutral-100">
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w_rbbt4iTX6YYUPRiuvnTA.jpg-o3r8KUgeBqEqobjawY5sujNlitOqGu.jpeg" // Your original running image URL
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
                onClick={() =>
                  window.open(
                    "https://drive.google.com/drive/folders/13wcKOSmK2rm3vwE2YiuTZDMXsV0Lx6Ov?usp=sharing",
                    "_blank",
                  )
                }
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/w_rbbt4iTX6YYUPRiuvnTA.jpg-o3r8KUgeBqEqobjawY5sujNlitOqGu.jpeg" // Your original running image URL
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
                onClick={() =>
                  window.open(
                    "https://drive.google.com/drive/folders/13wcKOSmK2rm3vwE2YiuTZDMXsV0Lx6Ov?usp=sharing",
                    "_blank",
                  )
                }
              >
                Watch All
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Media;
