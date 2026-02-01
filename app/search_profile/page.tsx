"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SearchProfile() {
  const [bibNumber, setBibNumber] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bibNumber) {
      router.push(`/profile/${bibNumber}`);
    }
  };

  return (
    <main className="relative h-screen w-screen flex items-center justify-center">
      <div className="absolute blur-md h-screen w-screen z-0">
        <Image src="/images/bg-hero.jpg" alt="" fill className="object-cover" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 bg-white/30 border backdrop-blur-sm p-4 w-full max-w-xs sm:max-w-md rounded-xl shadow-lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center text-white">
            Search Your Profile
          </h1>
          <motion.input
            type="text"
            placeholder="Enter your BIB number"
            value={bibNumber}
            onChange={(e) => setBibNumber(e.target.value)}
            className="p-2 rounded-md border bg-white/30 placeholder:text-gray-600"
          />
          <motion.button
            type="submit"
            className="p-2 bg-primary-dark text-white rounded-md"
          >
            Search
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
