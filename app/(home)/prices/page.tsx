"use client";

import React from "react";
import { Trophy, Award } from "lucide-react";

const PriceCard = ({
  category,
  prizes,
  index,
}: {
  category: string;
  prizes: number[];
  index: number;
}) => {
  return (
    <div className="relative overflow-hidden bg-primary/10 border-2 border-primary/40 rounded-3xl shadow-xl">
      <div className="p-6 relative z-10">
        {/* Header with Trophy */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Trophy className="size-16 text-yellow-400 bg-yellow-100 p-3 rounded-full shadow-lg" />
          </div>

          <h3
            className="text-2xl font-bold text-gray-700 mt-4 text-center"
            dangerouslySetInnerHTML={{ __html: category }}
          />
        </div>

        {/* Male and Female nested containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Male Container */}
          <div className="bg-primary/5 border border-primary/30 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">
              Male
            </h4>
            <div className="space-y-2">
              {prizes.map(
                (prize, prizeIndex) =>
                  prize > 0 && (
                    <div
                      key={prizeIndex}
                      className="p-3 rounded-lg border border-primary/30 bg-white/50"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          {prizeIndex < 3 ? (
                            <Award
                              className={`size-4 flex-shrink-0 ${
                                prizeIndex === 0
                                  ? "text-yellow-500"
                                  : prizeIndex === 1
                                    ? "text-gray-400"
                                    : "text-orange-500"
                              }`}
                            />
                          ) : (
                            <span className="text-gray-600 text-sm font-medium">
                              {prizeIndex + 1}
                              {getOrdinalSuffix(prizeIndex + 1)}
                            </span>
                          )}
                        </div>
                        <span className="text-primary font-bold text-base whitespace-nowrap">
                          ₹{prize.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>

          {/* Female Container */}
          <div className="bg-primary/5 border border-primary/30 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">
              Female
            </h4>
            <div className="space-y-2">
              {prizes.map(
                (prize, prizeIndex) =>
                  prize > 0 && (
                    <div
                      key={prizeIndex}
                      className="p-3 rounded-lg border border-primary/30 bg-white/50"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          {prizeIndex < 3 ? (
                            <Award
                              className={`size-4 flex-shrink-0 ${
                                prizeIndex === 0
                                  ? "text-yellow-500"
                                  : prizeIndex === 1
                                    ? "text-gray-400"
                                    : "text-orange-500"
                              }`}
                            />
                          ) : (
                            <span className="text-gray-600 text-sm font-medium">
                              {prizeIndex + 1}
                              {getOrdinalSuffix(prizeIndex + 1)}
                            </span>
                          )}
                        </div>
                        <span className="text-primary font-bold text-base whitespace-nowrap">
                          ₹{prize.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
      category: "21K Open",
      prizes: [
        100000, 50000, 20000, 15000, 10000, 5000, 4000, 3000, 2500, 2000,
      ],
    },
    {
      category: "21K Narayanpur",
      prizes: [
        100000, 50000, 20000, 15000, 10000, 5000, 4000, 3000, 2500, 2000,
      ],
    },
    {
      category: "21K Bastar",
      prizes: [
        100000, 50000, 20000, 15000, 10000, 5000, 4000, 3000, 2500, 2000,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary mb-6 text-5xl font-bold">Prize Pool</h2>

          <div className="inline-block">
            <div className="px-8 py-4 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl border-2 border-primary/50 shadow-2xl">
              <p className="text-2xl text-gray-700 font-semibold">
                Compete for an incredible total prize pool of{" "}
                <span className="text-primary font-bold text-3xl">
                  ₹15 Lakhs
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Centered Prize Grid */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {prizeData.map((data, index) => (
              <PriceCard key={index} {...data} index={index} />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm">
            * All prizes are subject to applicable taxes and terms & conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prices;
