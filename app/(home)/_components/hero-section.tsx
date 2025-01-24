import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const HeroSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={targetRef}
      className="relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
    >
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
          Join thousands in the most scenic marathon that celebrates peace and
          unity. Experience the serenity of Abujhmad while pushing your limits.
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
            className="border-white text-black hover:bg-white/20 text-lg px-10 h-16 rounded-full transition-colors"
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
  );
};

export default HeroSection;
