import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";

const Track = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
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
    </section>
  );
};

export default Track;
