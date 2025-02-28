"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Updated: March 2, 2025 at 5:30 AM
const MARATHON_DATE = new Date(2025, 2, 2, 5, 30, 0);

export default function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +MARATHON_DATE - +new Date();

      if (difference <= 0) {
        // Marathon has started
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  const clockVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const numberVariants = {
    changed: { scale: 1.1, color: "#ff6b6b", transition: { duration: 0.2 } },
    unchanged: { scale: 1, color: "#ffffff", transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
      {/* Floating particles in background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-white/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            style={{ width: `${Math.random() * 6 + 2}px`, height: `${Math.random() * 6 + 2}px` }}
          />
        ))}
      </div>

      <motion.div initial="hidden" animate="visible" variants={clockVariants} className="text-center z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Abujhmaad Marathon 2025</h1>
        <h2 className="text-xl md:text-2xl font-medium text-white/80 mb-12">Countdown to the starting line</h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </motion.div>
    </div>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 md:w-32 md:h-32 bg-black/30 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg"
      >
        <span className="text-4xl md:text-6xl font-bold text-white">{value < 10 ? `0${value}` : value}</span>
      </motion.div>
      <span className="mt-2 text-sm font-medium text-white/70 uppercase tracking-wider">{label}</span>
    </div>
  );
}
