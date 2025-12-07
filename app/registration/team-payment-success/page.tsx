"use client";

import React, { useEffect, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useStep } from "@/store/useStep";
import { useTeamRegistrationStore } from "@/store/useTeamRegistration";
import { useTranslation } from "@/store/useLanguage";

interface UserData {
  email: string;
  team_name: string;
  team_id: string;
  mobile: string;
}

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [teamId, setTeamId] = useState<string | null>(null);
  const t = useTranslation();

  const identification_number =
    searchParams?.get("identification_number") ?? null;

  const { resetTeamDetails } = useTeamRegistrationStore();
  const { resetStep } = useStep();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    resetTeamDetails();
    resetStep();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendWhatsAppMessage = async (
    phoneNumber: string,
    teamName: string,
    teamId: string,
  ) => {
    try {
      const response = await fetch(
        "https://runabujhmaad.in/send-marathon-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            teamName,
            teamId,
          }),
        },
      );

      if (!response.ok) {
        console.error(
          "Failed to send WhatsApp message, server responded with:",
          response.status,
        );
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  };

  const sendSuccessEmail = async (userData: UserData) => {
    if (!userData) {
      return;
    }

    try {
      const emailData = {
        userData: {
          personal_info: {
            email: userData.email,
            teamName: userData.team_name,
          },
          marathon_details: {
            teamId: userData.team_id,
          },
        },
      };

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!emailResponse.ok) {
        console.error(
          "Failed to send confirmation email, server responded with:",
          emailResponse.status,
        );
      }

      if (userData.mobile) {
        await sendWhatsAppMessage(
          "91" + userData.mobile,
          userData.team_name,
          userData.team_id,
        );
      }
    } catch (emailError) {
      console.error("Error in sendSuccessEmail function:", emailError);
    }
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!identification_number) {
        return;
      }

      setTeamId(identification_number);

      const { data, error: fetchError } = await supabase
        .schema("marathon")
        .from("registrations_2026_teams")
        .select("team_id, email, team_name, mobile, payment_status")
        .eq("team_id", identification_number)
        .single();

      if (fetchError) {
        console.error("Error fetching user data from Supabase:", fetchError);
        return;
      }

      if (data) {
        sendSuccessEmail({
          email: data.email,
          team_name: data.team_name,
          team_id: data.team_id,
          mobile: data.mobile,
        });
      }
    };

    fetchTeamData();
  }, [identification_number]);

  if (!identification_number) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-xl text-purple-600 text-center">
            Invalid or missing ID
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center"
        >
          <motion.svg
            className="w-16 h-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            // ... (rest of SVG is unchanged)
          >
            <motion.path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            {t.success_page.payment_successful}
          </h1>
          <p className="text-gray-600">
            Thank you for your registration. Your payment has been processed
            successfully.
          </p>

          <div className="mt-6 p-4 bg-black rounded-lg">
            <p className="text-sm text-gray-400">Your Team ID</p>
            <p className="text-2xl font-mono font-bold text-white tracking-wider">
              {teamId}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please save this number for future reference
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              {t.success_page.return_to_home}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              // ... (rest of confetti is unchanged)
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
};

const Success = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
};

export default Success;
