"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

// Simple AnimatedNumber component that handles digit changes
const AnimatedNumber = ({ value }: { value: string }) => {
  return (
    <span className="tabular-nums">
      {value.split('').map((digit, index) => (
        <motion.span
          key={`${digit}-${index}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.3,
            delay: index * 0.05
          }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const router = useRouter();
  const [registrationCount, setRegistrationCount] = React.useState(0);
  const [displayCount, setDisplayCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Add countdown timer logic
  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-01-31T05:00:00+05:30").getTime();
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

  // Animated counting function with easing
  const animateCount = React.useCallback((targetCount: number) => {
    setIsAnimating(true);
    setDisplayCount(0);
    
    const duration = 2500; // 2.5 seconds animation
    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    let frame = 0;
    
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    
    const counterAnimation = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easedProgress = easeOutQuart(progress);
      const currentCount = Math.floor(easedProgress * targetCount);
      
      setDisplayCount(currentCount);
      
      if (frame >= totalFrames) {
        clearInterval(counterAnimation);
        setDisplayCount(targetCount);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 1000 / fps);
    
    return () => clearInterval(counterAnimation);
  }, []);

  // Fetch registration count
  React.useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/registration-count");
        const data = await res.json();
        const count = typeof data.count === "number" ? data.count : 0;
        setRegistrationCount(count);
        setDisplayCount(count);
      } catch (error) {
        console.error("Error fetching registration count:", error);
        setRegistrationCount(0);
        setDisplayCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  // Trigger animation every 5 minutes
  React.useEffect(() => {
    if (isLoading || registrationCount === 0) return;

    // Initial animation after 2 seconds
    const initialTimeout = setTimeout(() => {
      animateCount(registrationCount);
    }, 2000);

    // Repeat every 5 minutes
    const animationInterval = setInterval(() => {
      animateCount(registrationCount);
    }, 5 * 60 * 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(animationInterval);
    };
  }, [registrationCount, isLoading, animateCount]);



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

          {/* Countdown Timer and Registration - Centered in a row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 lg:gap-16">
            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-primary/30 to-primary-light/30 backdrop-blur-md border-2 border-primary rounded-2xl px-6 md:px-8 py-4 shadow-lg shadow-primary/20"
            >
              <div className="text-white flex justify-center mb-2">
                Marathon Countdown
              </div>
              <div className="flex items-center gap-3 md:gap-4 text-white">
                <div className="flex flex-col items-center gap-1">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold h-12 md:h-14 lg:h-16 flex items-center">
                    <AnimatedNumber value={timeLeft.days} />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">Days</span>
                </div>
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold -mt-6">:</span>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold h-12 md:h-14 lg:h-16 flex items-center">
                    <AnimatedNumber value={timeLeft.hours} />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">Hours</span>
                </div>
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold -mt-6">:</span>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold h-12 md:h-14 lg:h-16 flex items-center">
                    <AnimatedNumber value={timeLeft.minutes} />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">Minutes</span>
                </div>
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold -mt-6">:</span>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold h-12 md:h-14 lg:h-16 flex items-center">
                    <AnimatedNumber value={timeLeft.seconds} />
                  </div>
                  <span className="text-xs md:text-sm font-semibold">Seconds</span>
                </div>
              </div>
            </motion.div>

            {/* Registration Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-gradient-to-br from-primary/30 to-primary-light/30 backdrop-blur-md border-2 border-primary rounded-2xl px-8 md:px-12 py-4 shadow-lg shadow-primary/20 overflow-hidden"
            >
              {/* Animated Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-light/30 to-primary/20"
                animate={isAnimating ? {
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                } : { opacity: 0.3 }}
                transition={{
                  duration: 4,
                  repeat: isAnimating ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />

              {/* Particle Effects */}
              <AnimatePresence>
                {isAnimating && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 bg-primary-light rounded-full"
                        initial={{
                          left: "50%",
                          top: "50%",
                          opacity: 1,
                          scale: 0
                        }}
                        animate={{
                          left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 80}%`,
                          top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 80}%`,
                          opacity: 0,
                          scale: [0, 1.5, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          ease: "easeOut",
                          delay: i * 0.08
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-200%" }}
                animate={isAnimating ? {
                  x: ["200%", "200%", "-200%"]
                } : { x: "-200%" }}
                transition={{
                  duration: 2,
                  repeat: isAnimating ? 2 : 0,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center text-white min-w-[120px]">
                <motion.div
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tabular-nums"
                  animate={isAnimating ? {
                    scale: [1, 1.15, 1.05, 1],
                  } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: isAnimating ? 3 : 0,
                    ease: "easeInOut"
                  }}
                  style={{
                    textShadow: isAnimating 
                      ? "0 0 20px rgba(167, 139, 250, 0.8), 0 0 40px rgba(167, 139, 250, 0.4)"
                      : "0 2px 4px rgba(0,0,0,0.3)",
                    filter: isAnimating ? "brightness(1.3)" : "brightness(1)"
                  }}
                >
                  {isLoading ? (
                    <span>...</span>
                  ) : (
                    <motion.span
                      animate={isAnimating ? {
                        color: ["#ffffff", "#e9d5ff", "#c4b5fd", "#a78bfa", "#ffffff"],
                      } : { color: "#ffffff" }}
                      transition={{
                        duration: 2.5,
                        ease: "easeInOut"
                      }}
                    >
                      {displayCount.toLocaleString()}
                    </motion.span>
                  )}
                </motion.div>
                <motion.span 
                  className="text-xs md:text-sm font-semibold mt-1"
                  animate={isAnimating ? {
                    opacity: [1, 0.7, 1]
                  } : { opacity: 1 }}
                  transition={{
                    duration: 1,
                    repeat: isAnimating ? 2 : 0
                  }}
                >
                  Registrations till now
                </motion.span>
              </div>

              {/* Corner Sparkles */}
              <AnimatePresence>
                {isAnimating && (
                  <>
                    <motion.div
                      className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 0],
                        opacity: [0, 1, 0]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        repeat: 2,
                        delay: 0.2
                      }}
                    />
                    <motion.div
                      className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 0],
                        opacity: [0, 1, 0]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        repeat: 2,
                        delay: 0.5
                      }}
                    />
                    <motion.div
                      className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 0],
                        opacity: [0, 1, 0]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        repeat: 2,
                        delay: 0.8
                      }}
                    />
                    <motion.div
                      className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 2, 0],
                        opacity: [0, 1, 0]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        repeat: 2,
                        delay: 0.1
                      }}
                    />
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;