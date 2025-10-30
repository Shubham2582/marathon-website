"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

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
    caption: "छत्तीसगढ़िया सबले बढ़िया",
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
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  return (
    <section className="pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50 pt-10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <span className="font-semibold">FOLLOW OUR JOURNEY</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Relive the <span className="text-primary">Previous Edition</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Experience the energy, passion, and community spirit from our last
            marathon. Join us in creating more unforgettable memories!
          </p>

          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <a
              href="https://www.instagram.com/abujhmad_marathon/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-semibold">Follow Us</span>
            </a>
          </div>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full h-full bg-gray-200">
                  <Image
                    src={post.imageUrl}
                    alt={post.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                    hoveredPost === post.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm mb-3 line-clamp-2">{post.caption}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" fill="white" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Instagram Icon */}
                  <div className="absolute top-4 right-4">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
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
