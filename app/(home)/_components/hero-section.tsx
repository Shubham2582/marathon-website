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

  // Add countdown timer logic
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-02T05:30:00+05:30").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
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
      <Image
        src="/images/hero-section-bg.jpg"
        alt="Hero Section Background"
        fill
        className="absolute z-[-1] object-cover brightness-90"
        priority
      />

      <div className="w-full min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
        {/* Hashtag */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-xl lg:text-2xl text-[#FF4949] font-semibold md:mb-4"
        >
          #RUNFORMAAD
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-white drop-shadow">Abujhmad Peace</span>
          <br />
          <span className="text-primary ">Half Marathon</span>
          <br />
          {/* <span className="text-white drop-shadow"> 2025</span> */}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white drop-shadow text-sm md:text-lg lg:text-xl max-w-3xl mx-auto font-medium"
        >
          Experience the thrill of running through the historic streets of
          Abujhmad. Join elite athletes and passionate runners in this
          spectacular urban marathon.
        </motion.p>

        <div className="mx-auto mt-10">
          <div className="grid grid-cols-4 gap-8">
            {[
              { value: timeLeft.days, unit: "Days" },
              { value: timeLeft.hours, unit: "Hours" },
              { value: timeLeft.minutes, unit: "Minutes" },
              { value: timeLeft.seconds, unit: "Seconds" },
            ].map(({ value, unit }) => (
              <div key={unit} className="text-center">
                <motion.div
                  animate={bounceAnimation}
                  className="bg-primary/10 backdrop-blur-sm rounded-xl p-2 md:p-3 mb-2"
                >
                  <motion.div
                    key={value}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="md:text-2xl lg:text-4xl font-bold text-primary"
                  >
                    {value}
                  </motion.div>
                </motion.div>
                <div className="text-xs md:text-sm font-bold text-white drop-shadow">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center items-center gap-8 mt-5 md:mt-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push("/registration")}
              className="md:py-3 h-auto md:px-6 text-xs md:text-base rounded-3xl font-semibold"
            >
              Register Now
              <ChevronRight className="size-6" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="size-8 md:size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="size-2 md:size-3 bg-primary rounded-full"
              />
            </div>
            <span className="text-white font-semibold text-xs md:text-base">
              Watch Trailer
            </span>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mt-5 md:mt-10">
          {[
            { value: "21", label: "KM Distance" },
            { value: "5000+", label: "Participants" },
            { value: "₹18 Lakhs", label: "Prize Pool" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-xl md:text-2xl lg:text-4xl font-bold text-white drop-shadow mb-1">
                {value}
              </div>
              <div className="text-xs md:text-sm text-white font-bold drop-shadow">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
