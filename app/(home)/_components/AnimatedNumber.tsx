"use client";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedNumberProps {
  value: string;
}

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const digits = value.split("");

  return (
    <div className="relative flex h-16 w-auto overflow-hidden">
      <AnimatePresence mode="popLayout">
        {digits.map((digit, index) => (
          <motion.div
            key={`${digit}-${index}-${value}`}
            initial={{
              y: -50,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              y: 50,
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center text-4xl font-bold"
          >
            <motion.span
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05 + 0.3,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {digit}
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedNumber;
