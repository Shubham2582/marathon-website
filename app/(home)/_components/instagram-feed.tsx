"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MobileFrame } from "@/components/ui/mobile-frame";

const instagramPosts = [
  {
    id: 1,
    imageUrl: "/images/instagram/post1.jpeg",
    postUrl: "https://www.instagram.com/p/DHAjNyMPUDt/",
    caption: "Amazing start to the marathon! 🏃‍♂️",
    likes: "315",
    comments: "1",
  },
  {
    id: 2,
    imageUrl: "/images/instagram/post2.jpeg",
    postUrl: "https://www.instagram.com/p/DGnd98RtDJF/",
    caption: "छत्तीसगढ़िया सबले बढ़िया",
    likes: "189K",
    comments: "1663",
  },
  {
    id: 3,
    imageUrl: "/images/instagram/post3.jpeg",
    postUrl: "https://www.instagram.com/p/DG-2QX5zp7-/",
    caption: "Meet our Organizers! 🤝",
    likes: "262",
    comments: "",
  },
  {
    id: 4,
    imageUrl: "/images/instagram/post4.jpeg",
    postUrl: "https://www.instagram.com/p/DGsO5leyf7G/s",
    caption: "Runners crossing the finish line! 🎉",
    likes: "2.2K",
    comments: "8",
  },
  {
    id: 5,
    imageUrl: "/images/instagram/post5.jpeg",
    postUrl: "https://www.instagram.com/p/DGvVKqAvfya/",
    caption: "An event to cherish forever! ❤️",
    likes: "238",
    comments: "2",
  },
  {
    id: 6,
    imageUrl: "/images/instagram/post6.jpeg",
    postUrl: "https://www.instagram.com/reel/DG3EJwaTyZ-/",
    caption: "The energy was unmatched! ⚡",
    likes: "1.3K",
    comments: "11",
  },
];

export const InstagramFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-play: change image every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % instagramPosts.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + instagramPosts.length) % instagramPosts.length,
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handlePostClick = (postUrl: string) => {
    window.open(postUrl, "_blank", "noopener,noreferrer");
  };

  const currentPost = instagramPosts[currentIndex];
  const prevIndex =
    (currentIndex - 1 + instagramPosts.length) % instagramPosts.length;
  const nextIndex = (currentIndex + 1) % instagramPosts.length;
  const prevPost = instagramPosts[prevIndex];
  const nextPost = instagramPosts[nextIndex];

  return (
    <section className="pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50 pt-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Instagram className="w-5 h-5" />
            <span className="font-semibold">FOLLOW OUR JOURNEY</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Relive the{" "}
            <span className="text-primary font-bold">Previous Edition</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Experience the energy, passion, and community spirit from our last
            marathon. Join us in creating more unforgettable memories!
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-8">
          {/* Previous Post Preview - Left Side */}
          <div
            className="hidden lg:block w-[280px] h-[560px] cursor-pointer hover:opacity-70 transition-opacity opacity-50"
            onClick={() => handlePostClick(prevPost.postUrl)}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={prevPost.imageUrl}
                alt={prevPost.caption}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>

          {/* Main Phone Frame */}
          <div className="relative">
            <MobileFrame
              imageUrl={currentPost.imageUrl}
              caption={currentPost.caption}
              likes={currentPost.likes}
              comments={currentPost.comments}
              direction={direction}
              onImageClick={() => handlePostClick(currentPost.postUrl)}
            />

            <button
              onClick={handlePrev}
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-30"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-30"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {instagramPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Next Post Preview - Right Side */}
          <div
            className="hidden lg:block w-[280px] h-[560px] cursor-pointer hover:opacity-70 transition-opacity opacity-50"
            onClick={() => handlePostClick(nextPost.postUrl)}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={nextPost.imageUrl}
                alt={nextPost.caption}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="https://www.instagram.com/abujhmad_marathon/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            <Instagram className="w-5 h-5" />
            View More on Instagram
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
