"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

const SelectionPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary/5">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/images/bg-hero.jpg"
          alt="Registration Banner"
          fill
          className="object-cover"
        />
      </div>

      <section className="max-w-3xl z-10 w-full bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-8 md:p-12 border border-white/50">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r text-white/80 bg-clip-text">
            Choose Your Run
          </h2>
          <p className="text-primary-dark mt-4 text-lg">
            Select whether you want to participate as an individual or as part
            of a team.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/codingwizardsmarathon/individual-run" className="flex-1">
            <Button className="w-full h-auto p-6 flex flex-col items-center text-center rounded-xl shadow-lg bg-primary text-primary-foreground">
              <User className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold">Individual Run</h3>
              <p className="text-xs mt-2">
                Register for the marathon as a single participant.
              </p>
            </Button>
          </Link>

          <Link href="/codingwizardsmarathon/team-run" className="flex-1">
            <Button className="w-full h-auto p-6 flex flex-col items-center text-center rounded-xl shadow-lg bg-primary text-primary-foreground">
              <Users className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-bold">Team Run</h3>
              <p className="text-xs mt-2">
                Register your team for the marathon and compete together.
              </p>
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SelectionPage;
