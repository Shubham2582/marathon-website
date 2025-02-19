import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BusRoute {
  from: string;
  operator: string;
  mobile: string;
  timings: string[];
}

export const ReachNarayanpur = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const busRoutes: BusRoute[] = [
    {
      from: "Rajnandgaon",
      operator: "Bastar Travels",
      mobile: "7587337013",
      timings: ["12:35 AM", "11:30 AM", "10:10 AM", "11:30 AM", "02:10 PM", "12:20 PM"]
    },
    {
      from: "Durg",
      operator: "Manish Travels",
      mobile: "9425292206",
      timings: ["06:30 AM", "08:40 AM"]
    },
    {
      from: "Raipur",
      operator: "Ambey Travels",
      mobile: "8461818202",
      timings: ["10:20 AM"]
    },
    {
      from: "Jagdalpur",
      operator: "Mhendra Travels",
      mobile: "9826166948",
      timings: ["11:10 AM", "01:15 PM"]
    },
    {
      from: "Vijayvada",
      operator: "Bastar Travels",
      mobile: "7587337013",
      timings: ["08:00 AM"]
    }
  ];

  const cities = ["All", "Rajnandgaon", "Durg", "Raipur", "Jagdalpur", "Vijayvada"];

  const filteredRoutes = activeTab.toLowerCase() === "all" 
    ? busRoutes 
    : busRoutes.filter(route => route.from.toLowerCase() === activeTab.toLowerCase());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-bold text-center mb-2 text-[#FF4B55]"
        >
          How to Reach Narayanpur
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600"
        >
          Bus Services Schedule
        </motion.p>
      </div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 border-b border-gray-200"
      >
        <div className="flex overflow-x-auto no-scrollbar">
          {cities.map((city, index) => (
            <motion.button
              key={city}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(city.toLowerCase())}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`
                px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${activeTab.toLowerCase() === city.toLowerCase()
                  ? 'border-b-2 border-[#FF4B55] text-[#FF4B55]'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {city}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Route Cards */}
      <motion.div 
        layout
        className="grid gap-6 md:grid-cols-2"
      >
        {filteredRoutes.map((route, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Card Header */}
            <div className="bg-[#FFF1F2] px-4 py-3 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {route.from} → Narayanpur
                </h3>
                <span className="px-3 py-1 bg-[#FF4B55] text-white rounded-full text-sm font-medium">
                  {route.timings.length} Trips
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-600">{route.operator}</p>
                  <p className="text-sm text-gray-500">Contact: {route.mobile}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Departure Times:</p>
                <div className="flex flex-wrap gap-2">
                  {route.timings.sort().map((time, timeIndex) => (
                    <motion.span 
                      key={timeIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: timeIndex * 0.05 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm
                        bg-[#FFF1F2] text-[#FF4B55] font-medium"
                    >
                      {time}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results Message */}
      {filteredRoutes.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No bus services found for this route.</p>
        </motion.div>
      )}
    </motion.div>
  );
};
