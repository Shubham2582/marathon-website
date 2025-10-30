"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrophyIcon } from "lucide-react";

const PriceCard = ({
  category,
  prizes,
  index,
}: {
  category: string;
  prizes: number[];
  index: number;
  isPopular?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden bg-primary/10 border border-primary/40 backdrop-blur-sm rounded-2xl"
    >
      <div className="p-4 relative">
        {/* Header */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="text-2xl font-bold text-gray-700 mb-2 flex gap-x-2 items-center"
        >
          <TrophyIcon className="size-10 text-yellow-400 bg-yellow-100 p-2 rounded-full" />
          {category}
        </motion.h3>

        {/* Prize section (blurred content) */}
        <div className="relative space-y-4 mt-6">
          {/* Overlay message */}
          <div className="absolute inset-0 backdrop-blur-md bg-white/40 flex flex-col items-center justify-center rounded-xl z-10">
            <TrophyIcon className="size-8 text-yellow-400 mb-2 animate-bounce-slow" />
            <p className="text-gray-700 text-sm font-semibold">
              Prizes will be revealed soon 🏆
            </p>
          </div>

          {/* Actual blurred prize list underneath */}
          {prizes.map(
            (prize, prizeIndex) =>
              prize > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1 + prizeIndex * 0.05 + 0.4,
                  }}
                  key={prizeIndex}
                  className="p-3 rounded-lg border border-primary/30 bg-primary/10 transition-colors"
                >
                  <div className="flex justify-between items-center blur-sm select-none">
                    <span className="text-gray-600 text-sm">
                      {prizeIndex + 1}
                      {getOrdinalSuffix(prizeIndex + 1)} Place
                    </span>
                    <span className="text-primary font-semibold text-lg">
                      ₹{prize.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ),
          )}
        </div>
      </div>
    </motion.div>
  );
};

const getOrdinalSuffix = (num: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
};

const Prices = () => {
  const prizeData = [
    {
      category: "21K Open Category",
      prizes: [
        150000, 100000, 75000, 50000, 50000, 10000, 10000, 10000, 10000, 10000,
      ],
      isPopular: true,
    },
    {
      category: "21K Open Women",
      prizes: [
        150000, 100000, 75000, 50000, 50000, 10000, 10000, 10000, 10000, 10000,
      ],
      isPopular: true,
    },
    {
      category: "10K Open Category",
      prizes: [15000, 10000, 8000, 1000, 1000],
    },
    {
      category: "5K Open Women",
      prizes: [10000, 7000, 5000, 1000, 1000],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-primary mb-6"
          >
            Prize Pool
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-700 max-w-2xl mx-auto"
          >
            Compete for an incredible total prize pool of{" "}
            <span className="text-primary font-semibold">₹18 Lakhs</span>
          </motion.p>
        </motion.div>

        {/* Prize Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {prizeData.map((data, index) => (
            <PriceCard key={index} {...data} index={index} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-sm">
            * All prizes are subject to applicable taxes and terms & conditions
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Prices;
