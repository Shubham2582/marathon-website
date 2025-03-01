"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Updated: March 2, 2025 at 5:30 AM
const MARATHON_DATE = new Date(2025, 2, 2, 5, 30, 0);

export default function FullscreenCountdown() {
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

    setTimeState(calculateTime());

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

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      try {
        // Try to automatically go into fullscreen mode when page loads
        document.documentElement.requestFullscreen().catch((err) => {
          console.log("Could not automatically enter fullscreen mode:", err);
        });
      } catch (error) {
        console.log("Fullscreen API not available");
      }
    }
  }, [mounted]);

  return (
    <div className="min-h-screen h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] relative overflow-hidden">
      {/* Static particle display */}
      <div className="absolute inset-0 pointer-events-none">{particles}</div>

      {/* Main countdown container with integrated title */}
      <div className="flex flex-col items-center justify-center space-y-10 max-w-5xl w-full px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight">
            ABUJHMAD <span className="text-yellow-300">PEACE</span> HALF MARATHON <span className="text-primary inline">2025</span>
          </h1>
        </motion.div>

        <div className="flex gap-6 md:gap-10 justify-center">
          <CountdownBox value={timeState.days} label="DAYS" />
          <CountdownBox value={timeState.hours} label="HOURS" />
          <CountdownBox value={timeState.minutes} label="MINUTES" />
          <CountdownBox value={timeState.seconds} label="SECONDS" />
        </div>

        <motion.div className="mt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          {timeState.isCountingUp && (
            <div className="flex items-center justify-center rounded-full bg-green-500/20 px-8 py-3 border border-green-500/30">
              <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse mr-3"></div>
              <span className="text-green-400 font-medium text-xl">RACE IN PROGRESS</span>
            </div>
          )}

          {!timeState.isCountingUp && (
            <div className="flex items-center justify-center rounded-full bg-blue-500/20 px-8 py-3 border border-blue-500/30">
              <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping mr-3"></div>
              <span className="text-blue-300 font-medium text-xl">COUNTDOWN ACTIVE</span>
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
      <div className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md rounded-xl p-3 sm:p-5 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 flex items-center justify-center shadow-2xl border border-white/10">
        <motion.span
          key={value}
          className="text-3xl sm:text-6xl md:text-7xl font-bold text-white"
          animate={{ scale: [1, 1.08, 1], opacity: [1, 0.9, 1] }} // Increased scale for more noticeable animation
          transition={{ duration: 0.3, ease: "easeInOut" }} // Faster animation
        >
          {formattedValue}
        </motion.span>
      </div>
      <div className="mt-3 bg-black/30 px-4 py-1.5 rounded-full text-sm sm:text-base md:text-lg text-white/80 font-medium tracking-wider uppercase">
        {label}
      </div>
    </motion.div>
  );
}
