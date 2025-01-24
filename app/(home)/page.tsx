"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroSection from "./_components/hero-section";
import Event from "./_components/event";
import Media from "./_components/media";
import Track from "./_components/track";
import Mission from "./_components/mission";
import Sponsors from "./_components/sponsors";

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <Event />
      <Media />
      <Track />
      <Mission />
      <Sponsors />
    </div>
  );
}
