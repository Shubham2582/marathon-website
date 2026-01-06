"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-neutral-950 to-neutral-900 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 mx-auto max-w-7xl px-4 md:px-8 pt-10 md:pt-20 text-sm md:text-base">
        <div>
          <h3 className="text-primary">Important Links</h3>
          <ul className="space-y-2 md:space-y-4">
            {[
              { id: "office", text: "Marathon Office Info" },
              { id: "results", text: "Race Results" },
              { id: "sponsors", text: "Our Sponsors" },
            ].map((link) => (
              <li key={link.id}>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-primary transition-colors duration-200"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-primary">Quick Links</h3>
          <ul className="space-y-2 md:space-y-4">
            {[
              { id: "registration", text: "Candidate Registration" },
              { id: "rules", text: "Race Rules" },
              { id: "terms", text: "Terms and conditions" },
            ].map((link) => (
              <li key={link.id}>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-primary transition-colors duration-200"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-primary">Contact Us</h3>
          <ul className="space-y-2 md:space-y-4 text-neutral-400">
            <li className="flex items-center gap-2">
              <span className="font-semibold text-white">Phone:</span> +91 94791
              50759
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold text-white">Email:</span>{" "}
              marathonabujhmad@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold text-white">Address:</span>{" "}
              Narayanpur 494661, Chhattisgarh
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="text-primary mb-2 md:mb-4">Stay Updated</h3>
          <p className="text-neutral-400 mb-3 md:mb-6">
            Subscribe to our newsletter for the latest updates and offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-2xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-2xl"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-neutral-800 p-4 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-neutral-400 text-sm md:text-base">
          &copy; 2026 Peace Marathon. All rights reserved.
        </p>

        <div className="flex gap-3 md:gap-6">
          {[
            {
              id: "facebook",
              Icon: Facebook,
              url: "https://www.facebook.com/profile.php?id=61571143190587&mibextid=wwXIfr&rdid=zmvwjSUPVjjRCBD1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15ptyfBNnX%2F%3Fmibextid%3DwwXIfr",
              label: "Visit our Facebook page",
            },
            {
              id: "twitter",
              Icon: Twitter,
              url: "https://x.com/AbujhmadRun?t=ePHs1Yg5mIVjyumFguWl8Q&s=09",
              label: "Follow us on X (Twitter)",
            },
            {
              id: "instagram",
              Icon: Instagram,
              url: "https://www.instagram.com/abujhmad_marathon/",
              label: "Follow us on Instagram",
            },
            {
              id: "whatsapp",
              Icon: MessageCircle,
              url: "https://chat.whatsapp.com/G80VrVWUKoOKDXu4YZJiit",
              label: "Join our WhatsApp group",
            },
          ].map(({ id, Icon, url, label }) => (
            <Link
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-primary transition-colors duration-200"
              aria-label={label}
            >
              <Icon className="size-4 md:size-6" />
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#gradient1)"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96V320H0Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96V320H0Z;
                M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,128C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96V320H0Z;
                M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96V320H0Z"
            />
          </path>

          <path
            fill="url(#gradient2)"
            fillOpacity="0.2"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,197.3C672,203,768,181,864,170.7C960,160,1056,160,1152,170.7C1248,181,1344,203,1392,213.3L1440,224V320H0Z"
          >
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values="
                M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,197.3C672,203,768,181,864,170.7C960,160,1056,160,1152,170.7C1248,181,1344,203,1392,213.3L1440,224V320H0Z;
                M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,165.3C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224V320H0Z;
                M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,197.3C672,203,768,181,864,170.7C960,160,1056,160,1152,170.7C1248,181,1344,203,1392,213.3L1440,224V320H0Z"
            />
          </path>

          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
}
