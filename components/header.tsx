"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PNG%20FOR%20WHITE-XnTh0iSNRB193VAsfIfYj00SNKxAf2.png"
                alt="Abujhmad Marathon 2025 Logo"
                width={200}
                height={50}
                className=""
              />
            </Link>

            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Link href="/race-categories.jpeg" target="_blank" className="text-sm font-medium hover:text-primary transition-colors relative group">
                  <div className="flex items-center gap-2">Race Categories</div>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Link
                  href="https://drive.google.com/drive/folders/125xLduuMILa-AS7OTO6Vwz4PlpT84J9k?usp=sharing"
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  News & Media
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                <Link
                  href="https://www.abujhmadmarathon.profsys.in/index.php"
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  Past Winners
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <Button
                  onClick={() => router.push("/registration")}
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Register Now
                </Button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qRtztWSu_400x400-tbTddpdVKml9HkbgJKbf3XFUTrwfL8.png"
                  alt="Narayanpur Police Logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </motion.div>
            </nav>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-lg border-b shadow-lg p-6"
                >
                  <nav className="flex flex-col gap-6">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PNG%20FOR%20WHITE-XnTh0iSNRB193VAsfIfYj00SNKxAf2.png"
                      alt="Abujhmad Marathon 2025 Logo"
                      width={240}
                      height={72}
                      className="h-16 w-auto mx-auto mb-6"
                    />
                    <Link href="/race-categories.jpeg" target="_blank" className="text-lg font-medium hover:text-primary transition-colors">
                      <div className="flex items-center gap-2">Race Categories</div>
                    </Link>
                    <Link
                      href="https://drive.google.com/drive/folders/125xLduuMILa-AS7OTO6Vwz4PlpT84J9k?usp=sharing"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      News & Media
                    </Link>
                    <Link href="https://www.abujhmadmarathon.profsys.in/index.php" className="text-lg font-medium hover:text-primary transition-colors">
                      Past Winners
                    </Link>
                    <Button
                      onClick={() => router.push("/registration")}
                      variant="outline"
                      size="lg"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      Register Now
                    </Button>
                    <div className="flex justify-center">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qRtztWSu_400x400-tbTddpdVKml9HkbgJKbf3XFUTrwfL8.png"
                        alt="Narayanpur Police Logo"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>
    </>
  );
}
