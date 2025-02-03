"use client";

import { motion } from "framer-motion";
import HeroSection from "./_components/hero-section";
import Event from "./_components/event";
import Media from "./_components/media";
import Track from "./_components/track";
import Mission from "./_components/mission";
import Sponsors from "./_components/sponsors";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <motion.div
      className="relative bg-neutral-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative z-10 space-y-20 md:space-y-40 pb-20 md:pb-40"
        initial="initial"
        animate="animate"
        viewport={{ once: true }}
      >
        <HeroSection />

        <motion.div {...fadeInUp}>
          <Event />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Media />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Track />
        </motion.div>

        <motion.div {...fadeInUp}>
          <Mission />
        </motion.div>

        {/* <motion.div {...fadeInUp}>
          <Sponsors />
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
}
