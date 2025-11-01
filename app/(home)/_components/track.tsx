"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const DecorativeLine = () => (
  <svg
    className="absolute hidden md:block -left-4 h-full w-24 opacity-100"
    viewBox="0 0 100 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 0C3 0 97 200 97 400C97 600 3 800 3 800"
      stroke="url(#paint0_linear)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="50"
        y1="0"
        x2="50"
        y2="800"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const RunnerIcon = () => (
  <svg
    className="absolute right-0 top-0 w-32 h-32 opacity-50"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM13.9 9.32l-2.49 2.49A2 2 0 0 1 10 12.5H6a2 2 0 0 0-2 2v1.5M8 18.5v-7M14.5 11.5l2 2-2 2M15 13.5h-2"
      stroke="#8B5CF6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Track = () => {
  return (
    <section className="relative bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 py-28 sm:px-6 lg:px-8 overflow-hidden">
      <DecorativeLine />
      <RunnerIcon />

      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 size-40 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 size-40 bg-primary/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-4 md:p-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <span className="absolute -left-4 top-0 w-1 h-20 rounded-full overflow-hidden bg-gradient-to-b from-primary to-transparent" />
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Experience the
              <span className="text-primary block mt-2">
                Ultimate Challenge
              </span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Navigate through our carefully designed route that takes you
              through the heart of Abujhmad's most scenic landscapes. From
              gentle slopes to challenging terrains, every kilometer offers a
              unique experience.
            </p>

            <div className="space-y-4">
              {[
                "Professional timing system with live tracking",
                "Fully marked route with LED indicators",
                "24/7 Medical support stations",
                "Regular hydration points with energy drinks",
                "Dedicated pacers for each category",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3 group"
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Elevation Profile */}
            {/* <div className="absolute  md:-top-10 left-1/2 transform -translate-x-1/2 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 z-10">
              <div className="h-16 w-48">
                <svg viewBox="0 0 200 60" className="w-full h-full">
                  <path
                    d="M0 50 Q 40 20 80 40 T 160 30 T 200 50"
                    fill="none"
                    stroke="#FF6B6B"
                    strokeWidth="2"
                  />
                  <text
                    x="85"
                    y="15"
                    fill="white"
                    fontSize="8"
                    textAnchor="middle"
                  >
                    Elevation Profile
                  </text>
                </svg>
              </div>
            </div> */}

            {/* Main Map Container */}
            <div className="relative h-[500px] mt-20 md:mt-0 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1bykZyQAdunOefS-6-Sk9XuyCHdmMMYg&ehbc=2E312F&noprof=1"
                width="100%"
                height="100%"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" /> */}

              {/* Distance Markers */}
              {/* <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-white text-sm">Start Point</span>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-white text-sm">Finish Line</span>
                </div>
              </div> */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Track;
