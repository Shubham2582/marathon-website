"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MARATHON_DATE = new Date(2025, 2, 2, 5, 45, 0);

export default function CountdownClock() {
  const [timeState, setTimeState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCountingUp: false,
  });
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const now = new Date();
      const difference = +MARATHON_DATE - +now;

      // If the marathon hasn't started yet, count down
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isCountingUp: false,
        };
      }
      // If the marathon has started, count up
      else {
        const elapsedTime = +now - +MARATHON_DATE;
        return {
          days: Math.floor(elapsedTime / (1000 * 60 * 60 * 24)),
          hours: Math.floor((elapsedTime / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((elapsedTime / 1000 / 60) % 60),
          seconds: Math.floor((elapsedTime / 1000) % 60),
          isCountingUp: true,
        };
      }
    };

    // Initial calculation
    setTimeState(calculateTime());

    // Update every second
    const timer = setInterval(() => {
      setTimeState(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mounted || particles.length > 0) return;

    const generateParticles = () => {
      const newParticles = [];
      const particleCount = 50;

      if (typeof window === "undefined") return [];

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      for (let i = 0; i < particleCount; i++) {
        // Create a grid-based distribution
        const gridSize = 5;
        const gridCellWidth = viewportWidth / gridSize;
        const gridCellHeight = viewportHeight / gridSize;

        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize) % gridSize;

        // Calculate position within grid cell (with margin)
        const margin = 20;
        const posX = gridCellWidth * gridX + margin + Math.random() * (gridCellWidth - margin * 2);
        const posY = gridCellHeight * gridY + margin + Math.random() * (gridCellHeight - margin * 2);

        // Randomize size
        const size = Math.random() * 4 + 2;
        const opacity = Math.random() * 0.4 + 0.2;

        // Create faster motion pattern with increased travel distance
        const xOffset = Math.random() * 60 - 30; // Increased travel distance
        const yOffset = Math.random() * 60 - 30; // Increased travel distance
        const duration = Math.random() * 5 + 6; // Faster animation (6-11 seconds instead of 12-20)

        // Create shorter initial delay
        const delay = Math.random() * 2; // Reduced delay

        newParticles.push(
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: `rgba(255, 255, 255, ${opacity})`,
              x: posX,
              y: posY,
            }}
            animate={{
              x: [posX, posX + xOffset, posX - xOffset / 2, posX],
              y: [posY, posY - yOffset, posY + yOffset, posY],
            }}
            transition={{
              duration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay,
            }}
          />
        );
      }

      return newParticles;
    };

    setParticles(generateParticles());
  }, [mounted]);

  return (
    <div className="min-h-screen h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] relative overflow-hidden">
      {/* Static particle display */}
      <div className="absolute inset-0 pointer-events-none">{particles}</div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center tracking-tight">10KM</h1>

      {/* Main countdown container with integrated title */}
      <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl w-full px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center tracking-tight">
            ABUJHMAD <span className="text-yellow-300">PEACE</span> HALF MARATHON <span className="text-primary">2025</span>
          </h1>
        </motion.div>

        <div className="flex gap-4 md:gap-8 justify-center">
          <CountdownBox value={timeState.days} label="DAYS" />
          <CountdownBox value={timeState.hours} label="HOURS" />
          <CountdownBox value={timeState.minutes} label="MINUTES" />
          <CountdownBox value={timeState.seconds} label="SECONDS" />
        </div>

        <motion.div className="mt-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          {timeState.isCountingUp && (
            <div className="flex items-center justify-center rounded-full bg-green-500/20 px-6 py-2 border border-green-500/30">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-green-400 font-medium">RACE IN PROGRESS</span>
            </div>
          )}

          {!timeState.isCountingUp && (
            <div className="flex items-center justify-center rounded-full bg-blue-500/20 px-6 py-2 border border-blue-500/30">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping mr-2"></div>
              <span className="text-blue-300 font-medium">COUNTDOWN ACTIVE</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  const formattedValue = value < 10 ? `0${value}` : value.toString();

  return (
    <motion.div className="text-center" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <div className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md rounded-lg p-2 sm:p-4 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 flex items-center justify-center shadow-2xl border border-white/10">
        <motion.span
          key={value}
          className="text-2xl sm:text-5xl md:text-6xl font-bold text-white"
          animate={{ scale: [1, 1.08, 1], opacity: [1, 0.9, 1] }} // Increased scale for more noticeable animation
          transition={{ duration: 0.3, ease: "easeInOut" }} // Faster animation
        >
          {formattedValue}
        </motion.span>
      </div>
      <div className="mt-2 bg-black/30 px-2 py-1 rounded-full text-xs sm:text-sm md:text-base text-white/80 font-medium tracking-wider uppercase">{label}</div>
    </motion.div>
  );
}
