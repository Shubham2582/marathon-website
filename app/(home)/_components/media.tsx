import { motion } from "framer-motion";
import ImageCarousel from "@/components/image-carousel";

const Media = () => {
  return (
    <section className="text-gray-700">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-primary"
      >
        Capture the Moment
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center  mt-3 md:mt-5 text-sm md:text-lg max-w-2xl mx-auto font-medium"
      >
        Relive the excitement through our collection of videos and photos
      </motion.p>

      <div className="max-w-7xl mx-auto mt-10">
        <ImageCarousel />
      </div>
    </section>
  );
};

export default Media;
