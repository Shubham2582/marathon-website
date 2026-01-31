"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import confetti from "canvas-confetti";

const HeroSection = () => {
  const router = useRouter();

  // Trigger confetti on load
  React.useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-hero.jpg"
          alt="Hero Section Background"
          fill
          className="object-cover brightness-90"
          priority
        />
      </div>

      <div className="w-full min-h-screen mt-28 md:mt-12 flex flex-col justify-center md:px-16 lg:px-24 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-xl lg:text-2xl text-white drop-shadow font-semibold -mt-28"
        >
          #RUNWITHMAAD
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 md:mb-4"
        >
          <span className="text-2xl drop-shadow md:text-4xl text-primary-light font-bold">
            Central India's Biggest Marathon
          </span>
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-white drop-shadow font-bold">
            Abujhmad Peace
          </span>
          <br />
          <span className="text-white drop-shadow font-bold">
            Half Marathon 2026
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-2xl drop-shadow lg:text-3xl text-primary-light font-bold"
          >
            5th Edition
          </motion.span>
        </motion.h1>

        <div className="flex justify-center items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push("/registration")}
              className="md:py-3 h-auto md:px-6 text-xs md:text-base rounded-3xl shadow font-semibold disabled:opacity-100 disabled:cursor-not-allowed"
            >
              Registration Closed
            </Button>
          </motion.div>
        </div>

        {/* Horizontal Stats Section - Prize Pool + Previous Edition */}
        <div className="flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12 px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12">
            {/* Prize Pool - Highlighted */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-primary/30 to-primary-light/30 backdrop-blur-md border-2 border-primary rounded-2xl px-6 md:px-8 py-4 shadow-lg shadow-primary/20"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(139, 92, 246, 0.5)",
                      "0 0 20px rgba(139, 92, 246, 0.8)",
                      "0 0 10px rgba(139, 92, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow mb-1"
                >
                  ₹15 Lakhs
                </motion.div>
                <div className="text-xs md:text-sm text-white font-bold">
                  Prize Pool 🏆
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="hidden md:block h-20 w-px bg-white/30"></div>

            {/* Previous Edition Stats */}
            <div className="flex items-center gap-6 md:gap-8">
              {/* Total Runners */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1"
                >
                  31st
                </motion.div>
                <div className="text-white text-xs md:text-sm font-semibold">
                  January
                </div>
                <div className="text-white/70 text-xs">2026</div>
              </div>

              {/* Mini Divider */}
              <div className="hidden md:block h-20 w-px bg-white/30"></div>

              {/* Date */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1"
                >
                  5000+
                </motion.div>
                <div className="text-white text-xs md:text-sm font-semibold">
                  Previous Edition
                </div>
                <div className="text-white/70 text-xs">Runners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
