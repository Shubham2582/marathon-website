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

const fifthEditionImages = [
  {
    path: "/images/previous_events/bastar_female.jpeg",
    category: "Bastar Female",
  },
  { path: "/images/previous_events/bastar_male.jpeg", category: "Bastar Male" },
  {
    path: "/images/previous_events/npr_female.jpeg",
    category: "Narayanpur Female",
  },
  {
    path: "/images/previous_events/npr_male.jpeg",
    category: "Narayanpur Male",
  },
  { path: "/images/previous_events/open_female.jpeg", category: "Open Female" },
  { path: "/images/previous_events/open_male.jpeg", category: "Open Male" },
];

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
      { name: "Hiwet Gebrewahid", position: 1, time: "1:12:45" },
      { name: "Renu Singh", position: 2, time: "1:13:07" },
      { name: "Anjali Kumari", position: 3, time: "1:14:35" },
      { name: "Chaltu Fulasa", position: 4, time: "1:15:37" },
      { name: "Reno No", position: 5, time: "1:16:49" },
      { name: "Tamsi Singh", position: 6, time: "1:17:03" },
      { name: "Desi Kitila", position: 7, time: "1:17:35" },
      { name: "Senayit Alemu", position: 8, time: "1:17:42" },
      { name: "Anjali Devi", position: 9, time: "1:19:17" },
      { name: "Tejaswini Lambkane", position: 10, time: "1:19:34" },
    ],
  },
  {
    title: "21K NPR MALE",
    date: "2025",
    subtitle: "Half Marathon - NPR Category",
    image: "/images/previous_events/21k_npr_male.JPG",
    winners: [
      { name: "Ritaram Mandavi", position: 1, time: "1:12:27" },
      { name: "Anil Kumar", position: 2, time: "1:12:55" },
      { name: "Fuldhar Netam", position: 3, time: "1:14:04" },
      { name: "Nitesh Kumar", position: 4, time: "1:14:30" },
      { name: "Vijay Usendi", position: 5, time: "1:14:44" },
      { name: "Rassu Korram", position: 6, time: "1:15:38" },
      { name: "Beersingh Potai", position: 7, time: "1:17:01" },
      { name: "Kewat Kola", position: 8, time: "1:17:10" },
      { name: "Vikas Rajput", position: 9, time: "1:17:38" },
      { name: "Jai Singh Kumeti", position: 10, time: "1:18:04" },
    ],
  },
  {
    title: "21K NPR FEMALE",
    date: "2025",
    subtitle: "Half Marathon - NPR Category",
    image: "/images/previous_events/21k_npr_female.JPG",
    winners: [
      { name: "Kunjjyoti Sahu", position: 1, time: "1:40:50" },
      { name: "Reena Uike", position: 2, time: "1:43:03" },
      { name: "Urmila Karanga", position: 3, time: "1:45:37" },
      { name: "Kunti Usendi", position: 4, time: "1:52:14" },
      { name: "Somdai Gota", position: 5, time: "1:52:20" },
      { name: "Dileshwari Baghel", position: 6, time: "1:55:22" },
      { name: "Bhagyshree Uikey", position: 7, time: "1:55:59" },
      { name: "Madhupriya Mandavi", position: 8, time: "1:56:49" },
      { name: "Hemlata Dugga", position: 9, time: "1:58:14" },
      { name: "Divya Dugga", position: 10, time: "2:01:04" },
    ],
  },
  {
    title: "10K MALE",
    date: "2025",
    subtitle: "10K Run - Male Category",
    image: "/images/previous_events/10k_male.JPG",
    winners: [
      { name: "Monnu Kumar", position: 1, time: "0:30:15" },
      { name: "Piyush Masani", position: 2, time: "0:30:23" },
      { name: "Deepak Kumar Thakur", position: 3, time: "0:32:22" },
      { name: "Manoj Kumar", position: 4, time: "0:32:33" },
      { name: "Jashwant Verma", position: 5, time: "0:33:28" },
    ],
  },
  {
    title: "10K FEMALE",
    date: "2025",
    subtitle: "10K Run - Female Category",
    image: "/images/previous_events/10k_female.JPG",
    winners: [
      { name: "Amrita Patel", position: 1, time: "0:34:38" },
      { name: "Frewekni", position: 2, time: "0:35:18" },
      { name: "Annu Pal", position: 3, time: "0:36:28" },
      { name: "Neha Pawar", position: 4, time: "0:39:35" },
      { name: "Priyanka Sahu", position: 5, time: "0:41:08" },
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
            Marathon.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
            Abujhmad Marathon 5th Edition - 2026
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {fifthEditionImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={image.path}
                    alt={image.category}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-800 font-medium text-sm text-center">
                  {image.category}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
          Previous Edition
        </h2>
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
