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
                <Link href="#" className="text-neutral-400 hover:text-primary transition-colors duration-200">
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
                <Link href="#" className="text-neutral-400 hover:text-primary transition-colors duration-200">
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
              <span className="font-semibold text-white">Phone:</span> +91 94791 50759
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold text-white">Email:</span> marathonabujhmad@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold text-white">Address:</span> Narayanpur 494661, Chhattisgarh
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="text-primary mb-2 md:mb-4">Stay Updated</h3>
          <p className="text-neutral-400 mb-3 md:mb-6">Subscribe to our newsletter for the latest updates and offers</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-2xl bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-2xl">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-neutral-800 p-4 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-neutral-400 text-sm md:text-base">&copy; 2024 Peace Marathon. All rights reserved.</p>
        <p className="text-neutral-400 text-sm md:text-base">Event organised by Baster Event Management</p>

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
              url: "https://x.com/i/flow/login?redirect_after_login=%2FAbujhmadRun",
              label: "Follow us on X (Twitter)",
            },
            {
              id: "instagram",
              Icon: Instagram,
              url: "https://www.instagram.com/abujhmadmarathon2025/profilecard/",
              label: "Follow us on Instagram",
            },
            {
              id: "whatsapp",
              Icon: MessageCircle,
              url: "https://chat.whatsapp.com/EsakdHLKTpJ4SQ6VzVA2FQ",
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
    </footer>
  );
}
