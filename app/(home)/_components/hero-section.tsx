"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const HeroSection = () => {
  const bounceAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  };

  const router = useRouter();

  // Countries that participated in previous edition with participant counts
  const participatingCountries = [
    { name: "India", code: "in", flag: "🇮🇳", participants: 6200 },
    { name: "United States", code: "us", flag: "🇺🇸", participants: 350 },
    { name: "United Kingdom", code: "gb", flag: "🇬🇧", participants: 180 },
    { name: "Canada", code: "ca", flag: "🇨🇦", participants: 120 },
    { name: "Australia", code: "au", flag: "🇦🇺", participants: 90 },
    { name: "Germany", code: "de", flag: "🇩🇪", participants: 60 },
  ];

  // Add countdown timer logic
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-02T05:30:00+05:30").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        isLive: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      isLive: false,
    };
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
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

      <div className="w-full min-h-screen flex flex-col justify-center md:px-16 lg:px-24 relative z-10">
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
              className="md:py-3 h-auto md:px-6 text-xs md:text-base rounded-3xl shadow font-semibold"
            >
              {timeLeft.isLive ? "Join Now" : "Register Now"}
              <ChevronRight className="size-6" />
            </Button>
          </motion.div>
        </div>

        {/* Horizontal Stats Section - Prize Pool + Previous Edition */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12 px-4">
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
                ₹13 Lakhs
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
                25th
              </motion.div>
              <div className="text-white text-xs md:text-sm font-semibold">
                January
              </div>
              <div className="text-white/70 text-xs">2026</div>
            </div>

            {/* Mini Divider */}
            <div className="h-12 w-px bg-white/30"></div>

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
    </section>
  );
};

export default HeroSection;
