"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

const FAQItem = ({ question, children }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 last:border-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors rounded-lg px-4"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0">{children}</div>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about the marathon event
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Required Equipment
            </h2>
            <FAQItem question="What equipment do I need to bring?">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Water vest or hydration bag</li>
                <li>First aid kit and adhesive tape</li>
                <li>Trail running shoes and socks</li>
                <li>Comfortable running attire</li>
                <li>Sun protection (cap, headband, or bandana)</li>
                <li>Emergency whistle</li>
                <li>Alternative mobile number</li>
                <li>Valid government-issued ID</li>
                <li>Emergency cash</li>
                <li>Portable USB battery charger</li>
              </ul>
            </FAQItem>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Facilities & Services
            </h2>
            <div className="space-y-4">
              <FAQItem question="Is there a bag drop service?">
                <p className="text-gray-700">
                  Yes, a bag drop-off facility is available at the start/finish point. 
                  Please note that valuable items should not be included, and volunteers 
                  are not liable for lost items.
                </p>
              </FAQItem>
              
              <FAQItem question="Is parking available?">
                <p className="text-gray-700">
                  Yes, parking is available at the race venue. However, please note 
                  that you park at your own risk.
                </p>
              </FAQItem>

              <FAQItem question="What amenities are available at aid stations?">
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Drinking water and electrolyte drinks</li>
                  <li>Sweet snacks and glucose biscuits</li>
                  <li>Salted snacks and fruits</li>
                  <li>Ice and primary first aid</li>
                  <li>Recovery/resting tents</li>
                </ul>
              </FAQItem>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Registration Benefits
            </h2>
            <div className="space-y-4">
              <FAQItem question="What's included in the registration package?">
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Official commemorative event T-shirt</li>
                  <li>Creative event sticker</li>
                  <li>Electronic BIB with advanced race tracking</li>
                  <li>Practical race-day sling bag</li>
                  <li>Finisher medal</li>
                  <li>E-Certificate upon completion</li>
                </ul>
              </FAQItem>

              <FAQItem question="What accommodation and nutrition support is provided?">
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Government-supervised accommodation</li>
                  <li>Comprehensive security protocols</li>
                  <li>Strategic lodging placement</li>
                  <li>Specialized nutrition diet plan</li>
                  <li>Managed participant comfort and safety</li>
                </ul>
              </FAQItem>
            </div>
          </motion.section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Still have questions?{" "}
            <a href="/contact" className="text-primary hover:text-primary font-medium">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default FAQ;
