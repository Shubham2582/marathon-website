"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const TeamRunPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/images/bg-hero.jpg"
          alt="Registration Banner"
          fill
          className="object-cover"
        />
      </div>
      <section className="max-w-xl z-10 w-full bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-8 md:p-10 border border-purple-100 animate-fade-in text-center">
        <h2 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
          Team Registration
        </h2>
        <p className="text-gray-600 mb-8">Team registration</p>
        <Link href="/codingwizardsmarathon">
          <Button>Go Back</Button>
        </Link>
      </section>
    </main>
  );
};
export default TeamRunPage;
