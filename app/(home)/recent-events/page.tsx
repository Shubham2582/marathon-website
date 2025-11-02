"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Winner {
  name: string;
  position: number;
  time: string;
}

interface EventData {
  title: string;
  date: string;
  subtitle: string;
  image: string;
  winners: Winner[];
}

const recentEvents: EventData[] = [
  {
    title: "21K OPEN MALE",
    date: "2025",
    subtitle: "Half Marathon - Open Category",
    image: "/images/previous_events/21k_open_male.JPG",
    winners: [
      { name: "Akshay Kumar", position: 1, time: "1:02:15" },
      { name: "Firomasa", position: 2, time: "1:02:52" },
      { name: "Fukeshwar Lal", position: 3, time: "1:04:14" },
      { name: "Rajan Yadav", position: 4, time: "1:05:00" },
      { name: "Hukam", position: 5, time: "1:05:04" },
      { name: "Mitchel Michal", position: 6, time: "1:05:06" },
      { name: "Jonny Huchiri", position: 7, time: "1:05:08" },
      { name: "Abdul Hamid", position: 8, time: "1:05:12" },
      { name: "Parvez", position: 9, time: "1:05:15" },
      { name: "Mukesh Kumar", position: 10, time: "1:05:28" },
    ],
  },
  {
    title: "21K OPEN FEMALE",
    date: "2025",
    subtitle: "Half Marathon - Open Category",
    image: "/images/previous_events/21k_open_female.JPG",
    winners: [
      { name: "Priya Sharma", position: 1, time: "1:25:32" },
      { name: "Anita Deshmukh", position: 2, time: "1:26:40" },
      { name: "Ritu Singh", position: 3, time: "1:27:58" },
      { name: "Meena Reddy", position: 4, time: "1:28:22" },
      { name: "Sunita Patel", position: 5, time: "1:29:35" },
      { name: "Kavita Yadav", position: 6, time: "1:30:05" },
      { name: "Nisha Verma", position: 7, time: "1:31:10" },
      { name: "Seema Raj", position: 8, time: "1:32:40" },
      { name: "Preeti Gaur", position: 9, time: "1:33:18" },
      { name: "Anjali Kumar", position: 10, time: "1:34:02" },
    ],
  },
  {
    title: "21K NPR MALE",
    date: "2025",
    subtitle: "Half Marathon - NPR Category",
    image: "/images/previous_events/21k_npr_male.JPG",
    winners: [
      { name: "Lokesh Mandavi", position: 1, time: "1:17:32" },
      { name: "Kiran Netam", position: 2, time: "1:18:20" },
      { name: "Ramesh Ramteke", position: 3, time: "1:19:42" },
      { name: "Kalesh Kashyap", position: 4, time: "1:20:18" },
      { name: "Sajan Poyam", position: 5, time: "1:21:27" },
      { name: "Devraj Korram", position: 6, time: "1:22:10" },
      { name: "Harish Markam", position: 7, time: "1:22:59" },
      { name: "Balesh Netam", position: 8, time: "1:23:32" },
      { name: "Suresh Gawde", position: 9, time: "1:24:41" },
      { name: "Vikas Ram", position: 10, time: "1:25:00" },
    ],
  },
  {
    title: "21K NPR FEMALE",
    date: "2025",
    subtitle: "Half Marathon - NPR Category",
    image: "/images/previous_events/21k_npr_female.JPG",
    winners: [
      { name: "Lalita Mandavi", position: 1, time: "1:30:12" },
      { name: "Sarita Poyam", position: 2, time: "1:31:08" },
      { name: "Kiran Kashyap", position: 3, time: "1:32:22" },
      { name: "Meera Ramteke", position: 4, time: "1:33:10" },
      { name: "Anita Korram", position: 5, time: "1:34:05" },
      { name: "Rekha Netam", position: 6, time: "1:35:14" },
      { name: "Sunita Markam", position: 7, time: "1:36:08" },
      { name: "Poonam Gawde", position: 8, time: "1:37:20" },
      { name: "Radha Ram", position: 9, time: "1:38:12" },
      { name: "Chanda Sori", position: 10, time: "1:39:30" },
    ],
  },
  {
    title: "10K MALE",
    date: "2025",
    subtitle: "10K Run - Male Category",
    image: "/images/previous_events/10k_male.JPG",
    winners: [
      { name: "Ajay Singh", position: 1, time: "0:32:45" },
      { name: "Ravi Kumar", position: 2, time: "0:33:10" },
      { name: "Nitin Patel", position: 3, time: "0:33:50" },
      { name: "Manoj Verma", position: 4, time: "0:34:20" },
      { name: "Sandeep Rao", position: 5, time: "0:34:58" },
      { name: "Vivek Yadav", position: 6, time: "0:35:25" },
      { name: "Rohit Kumar", position: 7, time: "0:35:48" },
      { name: "Rajesh Chauhan", position: 8, time: "0:36:05" },
      { name: "Gaurav Nair", position: 9, time: "0:36:22" },
      { name: "Mohit Singh", position: 10, time: "0:36:55" },
    ],
  },
  {
    title: "10K FEMALE",
    date: "2025",
    subtitle: "10K Run - Female Category",
    image: "/images/previous_events/10k_female.JPG",
    winners: [
      { name: "Anjali Verma", position: 1, time: "0:37:58" },
      { name: "Sneha Reddy", position: 2, time: "0:38:42" },
      { name: "Ritika Sharma", position: 3, time: "0:39:15" },
      { name: "Neha Patel", position: 4, time: "0:39:40" },
      { name: "Pooja Mehta", position: 5, time: "0:40:02" },
      { name: "Divya Yadav", position: 6, time: "0:40:35" },
      { name: "Meenakshi Rao", position: 7, time: "0:41:00" },
      { name: "Komal Raj", position: 8, time: "0:41:25" },
      { name: "Nidhi Sharma", position: 9, time: "0:41:50" },
      { name: "Aarti Nair", position: 10, time: "0:42:10" },
    ],
  },
];

const RecentEvents = () => {
  return (
    <main className="min-h-screen pt-8 md:pt-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Recent Events
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the highlights and results from the previous Abujhmad
            Marathon, featuring the top 10 finishers from each event.
          </p>
        </motion.div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {recentEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square w-full bg-gray-100">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gray-200 mx-5 mt-2" />

              {/* Text Section */}
              <div className="p-5 md:p-6 flex flex-col gap-4">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-primary">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-600">{event.subtitle}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>

                <h3 className="text-lg font-semibold text-primary text-center mt-2">
                  Top 10 Finishers
                </h3>

                {/* Winners List */}
                <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-primary/60">
                  {event.winners.map((winner) => (
                    <div
                      key={winner.position}
                      className="flex items-center justify-between bg-primary/10 rounded-lg p-2 hover:bg-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-primary text-white font-bold rounded-full">
                          {winner.position}
                        </div>
                        <span className="text-gray-800 font-medium text-sm">
                          {winner.name}
                        </span>
                      </div>
                      <span className="text-gray-500 text-xs">
                        {winner.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal Image Section */}
        <div className="mt-20 space-y-16">
          {/* Full Winners Photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl shadow-xl bg-white"
          >
            <div className="relative w-full h-[500px] bg-gray-100">
              <Image
                src="/images/previous_events/all_participants.JPG"
                alt="Full Winners Group Photo"
                fill
                className="object-cover object-bottom rounded-t-3xl"
                priority
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">
                All Winners of Abujhmad Marathon 2025
              </h2>
              <p className="text-gray-600">
                A proud moment celebrating the spirit, determination, and unity
                of all participants and winners.
              </p>
            </div>
          </motion.div>

          {/* Jadu Bastar Event */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl shadow-xl bg-white"
          >
            <div className="relative w-full h-auto flex justify-center items-center bg-gray-100">
              <Image
                src="/images/previous_events/jadu_bastar.jpg"
                alt="Jadu Bastar Event"
                width={1920}
                height={1080}
                className="object-contain w-full h-auto rounded-t-3xl"
                priority
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Jadu Bastar Cultural Event
              </h2>
              <p className="text-gray-600">
                The cultural heartbeat of Bastar — music, dance, and traditions
                that bring our community together in celebration.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default RecentEvents;
