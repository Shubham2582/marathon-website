"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const routes: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "Prizes", href: "/prices" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    {
      label: "Runner Guide",
      href: "https://heyzine.com/flip-book/ad304f7dfd.html",
    },
    {
      label: "Media",
      href: "https://drive.google.com/drive/folders/125xLduuMILa-AS7OTO6Vwz4PlpT84J9k?usp=sharing",
    },
    { label: "Previous Edition", href: "/recent-events" },
  ];

  useEffect(() => {
    if (window.scrollY > 20) {
      setScrolled(true);
    }

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
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/50 backdrop-blur-md shadow-lg"
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PNG%20FOR%20WHITE-XnTh0iSNRB193VAsfIfYj00SNKxAf2.png"
                alt="Abujhmad Marathon 2025 Logo"
                width={120}
                height={40}
                className="h-full w-fit object-contain"
              />
            </Link>

            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {routes.map((route) => (
                <motion.div
                  key={route.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Link
                    href={route.href}
                    className="text-sm font-medium hover:text-primary transition-colors relative group"
                  >
                    <div className="flex items-center gap-2">{route.label}</div>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/qRtztWSu_400x400-tbTddpdVKml9HkbgJKbf3XFUTrwfL8.png"
                  alt="Narayanpur Police Logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </motion.div>
            </nav>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:hidden w-48 z-20 fixed top-16 right-4 bg-white/70 backdrop-blur-md border border-gray-200 p-2 shadow-lg rounded-xl"
          >
            <nav className="flex flex-col text-sm">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="font-medium py-3 px-4 hover:text-primary transition-colors rounded-lg hover:bg-gray-50"
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
