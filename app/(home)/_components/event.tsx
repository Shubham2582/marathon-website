"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

const eventDetails = [
  {
    icon: Calendar,
    title: "Event Date",
    description: "March 2, 2025",
    highlight: "5:30 AM Start",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Abujhmad Marathon Route",
    highlight: "Scenic Trail Course",
  },
  {
    icon: Users,
    title: "Participants",
    description: "5000+ Runners",
    highlight: "All Skill Levels",
  },
  {
    icon: Trophy,
    title: "Categories",
    description: "Multiple Distances",
    highlight: "21KM | 10KM | 5KM",
  },
];

const Event = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-24 text-gray-600">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase mb-2 md:mb-4"
          >
            RACE INFORMATION
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-bold text-primary mb-2 md:mb-6"
          >
            Event Details
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gray-600 text-s md:text-lg max-w-2xl mx-auto font-medium"
          >
            Join us for an unforgettable running experience through the scenic
            routes of Abujhmad
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {eventDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Add a radial gradient to the background */}
              <div
                className="bg-primary/10 border border-primary/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 
                transition-all duration-300 hover:bg-primary/15"
              >
                {/* Icon */}
                <div className="bg-primary/10 border border-primary/50 rounded-lg md:rounded-2xl p-2 md:p-4 inline-block mb-2 md:mb-6">
                  <detail.icon className="size-4 md:size-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-primary mb-2">
                  {detail.title}
                </h3>
                <p className="text-sm md:text-lg font-semibold">
                  {detail.description}
                </p>
                <p className="text-xs md:text-base font-medium text-gray-500">
                  {detail.highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Event;
