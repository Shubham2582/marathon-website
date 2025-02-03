"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GALLERY_FOLDER_ID = "1z3bfxfqIG0DBsMFPpv1ER6VvZKGSINit";
const CLICK_FOLDER_ID = "1hqXmr7u29tmbrDkB5uAU51M-IqlUdAQe";

interface DriveImage {
  webContentLink: string;
}

const ImageCarousel = () => {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `/api/drive-images?folderId=${GALLERY_FOLDER_ID}`
        );
        const data = await response.json();
        if (data.files) {
          setImages(data.files);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  const handleGalleryClick = () => {
    window.open(
      `https://drive.google.com/drive/folders/${CLICK_FOLDER_ID}`,
      "_blank"
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative aspect-[21/9] bg-gray-900 flex items-center justify-center">
            <div className="text-white">Loading images...</div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <div className="bg-white rounded-xl md:rounded-3xl shadow-xl overflow-hidden">
          <div className="relative aspect-[21/9] bg-gray-900 flex items-center justify-center">
            <div className="text-white">No images found</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full group relative"
    >
      <div className="bg-white rounded-xl md:rounded-3xl shadow-xl overflow-hidden">
        <div className="relative aspect-[21/9] bg-gray-900">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex h-full relative"
              style={{ width: `${100}%` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full shrink-0"
                  onClick={handleGalleryClick}
                >
                  <Image
                    src={image.webContentLink || "/images/Placeholder.webp"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute text-primary left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 md:p-2 rounded-full group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="size-4 md:size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute text-primary right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 md:p-2 rounded-full group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="size-4 md:size-6" />
          </button>
        </div>
      </div>

      {/* Dots indicator - now outside the carousel */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`h-1.5 md:h-2 rounded-full duration-500 transition-all ${
              index === currentIndex
                ? "bg-primary w-2.5 md:w-4"
                : "w-1.5 md:w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ImageCarousel;
