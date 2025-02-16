"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa6";
import { Globe, Phone } from "lucide-react";

const ContactItem = ({
  icon,
  label,
  value,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 p-6 rounded-xl bg-primary/10 backdrop-blur-sm hover:bg-primary/15 transition-all border border-primary/40"
    >
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:text-primary transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-primary font-semibold">{value}</p>
        )}
      </div>
    </motion.div>
  );
};

const SocialLink = ({
  icon,
  platform,
  username,
  link,
}: {
  icon: React.ReactNode;
  platform: string;
  username: string;
  link: string;
}) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 hover:bg-primary/15 transition-all border border-primary/40"
    >
      <div className="text-xl text-primary bg-primary/10 rounded-full p-3">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{platform}</p>
        <p className="text-primary font-medium">{username}</p>
      </div>
    </motion.a>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary mb-6 border border-primary/40"
          >
            Get in Touch
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-5xl font-bold text-primary mb-6"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700 max-w-2xl mx-auto"
          >
            Have questions? We're here to help you on your journey to the
            marathon.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ContactItem
            icon={<FaEnvelope className="w-6 h-6" />}
            label="Email Us At"
            value="support@runabujhmad.in"
            link="mailto:support@runabujhmad.in"
          />
          <ContactItem
            icon={<Globe className="w-6 h-6" />}
            label="Website"
            value="www.runabujhmad.in"
            link="https://www.runabujhmad.in"
          />
          <ContactItem
            icon={<Phone className="w-6 h-6" />}
            label="Call Us At"
            value="+91 94791 50759"
            link="tel:+919479150759"
          />
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Follow Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <SocialLink
              icon={<FaXTwitter />}
              platform="Twitter"
              username="@abujhmadmarathon2025"
              link="https://twitter.com/abujhmadmarathon2025"
            />
            <SocialLink
              icon={<FaInstagram />}
              platform="Instagram"
              username="@abujhmadmarathon2025"
              link="https://instagram.com/abujhmadmarathon2025"
            />
            <SocialLink
              icon={<FaFacebook />}
              platform="Facebook"
              username="@abujhmadmarathon2025"
              link="https://facebook.com/abujhmadmarathon2025"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
