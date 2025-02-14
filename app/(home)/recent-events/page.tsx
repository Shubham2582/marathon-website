"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Winner {
  name: string;
  position: number;
}

interface EventData {
  title: string;
  date: string;
  subtitle: string;
  image: string;
  maleWinners: Winner[];
  femaleWinners: Winner[];
  description: string;
}

const recentEvents: EventData[] = [
  {
    title: "10 KM MINI MARATHON",
    date: "19 January 2025",
    subtitle: "10-kilometer Promo Mini Marathon in Narayanpur",
    image: "https://drive.google.com/uc?id=15da0d6cjLqU80uzehdZWsw0fGQ54n9kD&export=download", // Make sure to add this image to your public folder
    maleWinners: [
      { name: "Purkeshwar Lal Deshmukh", position: 1 },
      { name: "Rassu Kores", position: 2 },
      { name: "Budhram Kumeti", position: 3 },
    ],
    femaleWinners: [
      { name: "Muskan Kushwaha", position: 1 },
      { name: "Bhumika Devangan", position: 2 },
      { name: "Sombai Gota", position: 3 },
    ],
    description:
      "On 19 January 2025, we took a significant step towards the main Abujhmad Half Peace Marathon, bringing together 800 enthusiastic runners. This event was a strategic preview of our larger mission - promoting peace, unity, and community spirit through running. Mini Marathon: Igniting the Spirit of Abujhmad Peace 2025! This serves as a compelling introduction to our forthcoming Abujhmad Half Peace Marathon, an event where every step contributes to the cause of unity.",
  },
  {
    title: "05 KM PROMO MARATHON",
    date: "05 January 2025",
    subtitle: "5-kilometer Promotional Run",
    image:
      "https://drive.google.com/uc?id=1TWqqsGpIVdDYNTX6vif7M35ldvUYQLRc&export=download", // Make sure to add this image to your public folder
    maleWinners: [
      { name: "Tiju Pujari", position: 1 },
      { name: "Laxman Poyam", position: 2 },
      { name: "Birsingh Salam", position: 3 },
    ],
    femaleWinners: [
      { name: "Somraj Gota", position: 1 },
      { name: "Reena Uike", position: 2 },
      { name: "Bhumika Dewangan", position: 3 },
    ],
    description:
      "A powerful prelude to our upcoming Abujhmad Half Peace Marathon - where every step counts towards unity.",
  },
  // Add more events as needed
];

const RecentEvents = () => {
  return (
    <main className="min-h-screen pt-8 md:pt-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Recent Events
          </h1>
        </motion.div>

        <div className="space-y-16 md:space-y-32">
          {recentEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Event Header */}
              <div className="relative h-[300px] md:h-[500px] w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8 text-white">
                  <h2 className="text-2xl md:text-5xl font-bold md:mb-4">
                    {event.title}
                  </h2>
                  <p className="md:text-xl opacity-90">{event.date}</p>
                  <p className="md:text-lg opacity-80">{event.subtitle}</p>
                </div>
              </div>

              <div className="p-4 md:p-8 lg:p-12">
                {/* Winners Section */}
                <div className="relative mb-8 md:mb-12">
                  <div className="bg-gradient-to-r from-[#FF5959] to-[#FF8080] rounded-xl md:rounded-2xl p-4 md:p-6">
                    <div className="grid grid-cols-3 text-center text-white md:text-xl font-bold mb-4 md:mb-8">
                      <span className="font-bold">MALE</span>
                      <span className="font-bold">5KM</span>
                      <span className="font-bold">FEMALE</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      {/* Male Winners */}
                      <div className="space-y-2 md:space-y-4">
                        {event.maleWinners.map((winner, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-5 hover:bg-white/20 transition-colors"
                          >
                            <div className="size-10 md:size-12 flex items-center justify-center bg-white rounded-full shadow-lg">
                              <span className="text-[#FF5959] font-bold md:text-xl">
                                {winner.position}
                              </span>
                            </div>
                            <span className="text-white font-semibold md:text-lg">
                              {winner.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Female Winners */}
                      <div className="space-y-2 md:space-y-4">
                        {event.femaleWinners.map((winner, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-5 hover:bg-white/20 transition-colors"
                          >
                            <div className="size-10 md:size-12 flex items-center justify-center bg-white rounded-full shadow-lg">
                              <span className="text-[#FF5959] font-bold md:text-xl">
                                {winner.position}
                              </span>
                            </div>
                            <span className="text-white font-semibold md:text-lg">
                              {winner.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RecentEvents;
