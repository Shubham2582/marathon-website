"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

const eventDetails = [
  {
    icon: Calendar,
    title: "Event Date",
    description: "Comming Soon",
    highlight: "",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "High School Ground, Narayanpur",
    highlight: "Scenic Trail Course",
  },
  {
    icon: Users,
    title: "Participants",
    description: "7000+ Runners",
    highlight: "All Skill Levels",
  },
  {
    icon: Trophy,
    title: "Categories",
    description: "Multiple Distances",
    highlight: "21KM | 10KM | 5KM",
  },
];

const scheduleData = [
  {
    time: "4:30 AM",
    activity: "Reporting: All Participants",
    details: "All runners (21 KM, 10 KM, 5 KM) must report at the venue",
  },
  {
    time: "4:45 AM",
    activity: "Warm-Up Session",
    details: "Stretching & warm-up exercises for all runners",
  },
  {
    time: "5:15 AM",
    activity: "21 KM Runners at Start Line",
    details: "All 21 KM runners must be at the start line",
  },
  {
    time: "5:30 AM",
    activity: "Flag-Off: 21 KM Half Marathon",
    details: "Official flag-off for the 21 KM Half Marathon",
  },
  {
    time: "5:35 AM",
    activity: "10 KM Runners Reporting",
    details: "All 10 KM runners must be at the start line",
  },
  {
    time: "5:45 AM",
    activity: "Flag-Off: 10 KM Competitive Run",
    details: "Official flag-off for the 10 KM Competitive Run",
  },
  {
    time: "5:50 AM",
    activity: "5 KM Runners Reporting",
    details: "All 5 KM runners must be at the start line",
  },
  {
    time: "6:00 AM",
    activity: "Flag-Off: 5 KM women",
    details: "Official flag-off for the 5 KM Fun Run",
  },
  { time: "6:45 AM", activity: "5 KM Run Ends", details: "End of 5 KM Run" },
  { time: "7:15 AM", activity: "10 KM Run Ends", details: "End of 10 KM Run" },
  {
    time: "8:30 AM",
    activity: "21 KM Half Marathon Ends",
    details: "End of 21 KM Run",
  },
  {
    time: "8:30 AM",
    activity: "prize distribution and addressing",
    details: "prize distribution",
  },
  {
    time: "9:00 AM - 9:30 AM",
    activity: "Closing Ceremony & Wrap-Up",
    details: "Final announcements, felicitation of winners, and event wrap-up",
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
                transition-all duration-300 hover:bg-primary/15 md:min-h-[280px]"
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

        {/* Schedule Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 md:mt-24 text-center"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-bold text-primary mb-4 md:mb-6"
          >
            Event Schedule
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-s md:text-lg max-w-2xl mx-auto font-medium mb-8 md:mb-12"
          >
            Evevt schedule comming soon
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Event;
