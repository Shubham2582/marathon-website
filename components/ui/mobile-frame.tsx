import React from "react";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MobileFrameProps {
  imageUrl: string;
  caption: string;
  likes: string;
  comments: string;
  username?: string;
  onImageClick?: () => void;
  direction?: number;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  imageUrl,
  caption,
  likes,
  comments,
  username = "abujhmad_marathon",
  onImageClick,
  direction = 1,
}) => {
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  return (
    <div className="relative w-[340px] h-[680px] bg-gray-900 rounded-[50px] p-3 shadow-2xl">
      {/* Phone Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-20"></div>

      {/* Phone Screen */}
      <div className="w-full h-full bg-white rounded-[40px] overflow-hidden relative">
        {/* Instagram Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-white"></div>
            </div>
            <span className="font-semibold text-sm">{username}</span>
          </div>
          <Instagram className="w-6 h-6" />
        </div>

        {/* Post Content */}
        <div className="pt-14 h-full overflow-hidden">
          {/* Post Image - Clickable with Animation */}
          <div className="relative w-full h-[500px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={imageUrl}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "tween",
                    ease: [0.25, 0.46, 0.45, 0.94],
                    duration: 0.4,
                  },
                }}
                className="absolute inset-0 cursor-pointer"
                onClick={onImageClick}
              >
                <Image
                  src={imageUrl}
                  alt={caption}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Post Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-white px-4 py-3">
            <div className="flex items-center gap-4 mb-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <div className="text-sm font-semibold mb-1">{likes} likes</div>
            <div className="text-sm">
              <span className="font-semibold">{username}</span>{" "}
              <span className="text-gray-700">{caption}</span>
            </div>
            {comments && (
              <div className="text-sm text-gray-500 mt-1">
                View all {comments} comments
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
