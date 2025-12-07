"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

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
  useEffect(() => {
    // Load Strava embed script
    const script = document.createElement('script');
    script.src = 'https://strava-embeds.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    let attempts = 0;
    const maxAttempts = 40; // Try for 20 seconds (40 * 500ms)

    // Auto-click the flyover play button when it appears
    const checkForPlayButton = setInterval(() => {
      attempts++;
      
      // Try multiple selectors to find the play button
      const playButton = 
        document.querySelector('[data-testid="mre-start-flyover-button"]') as HTMLButtonElement ||
        document.querySelector('.FlyoverStart_flyoverStart__biDt8') as HTMLButtonElement ||
        document.querySelector('button[title="Start flyover"]') as HTMLButtonElement ||
        document.querySelector('.strava-embed-placeholder button') as HTMLButtonElement;
      
      if (playButton) {
        console.log('✅ Found play button, clicking...');
        setTimeout(() => {
          playButton.click();
          console.log('✅ Clicked play button');
        }, 2000); // Wait 2 seconds after embed loads
        clearInterval(checkForPlayButton);
      } else if (attempts >= maxAttempts) {
        console.log('❌ Play button not found after 20 seconds');
        clearInterval(checkForPlayButton);
      }
    }, 500); // Check every 500ms

    // Cleanup
    return () => {
      clearInterval(checkForPlayButton);
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

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

          {/* RIGHT SIDE: MAP + STRAVA EMBED */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] mt-20 md:mt-0 rounded-2xl overflow-hidden bg-black/20">
              
              {/* ✅ STRAVA EMBED CODE */}
              <div
                className="strava-embed-placeholder w-full h-full"
                data-embed-type="route"
                data-embed-id="3328472220104883600"
                data-style="standard"
                data-from-embed="false"
              ></div>

            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Track;