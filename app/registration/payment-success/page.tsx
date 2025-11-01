"use client";

import React, { useEffect, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRegistrationStore } from "@/store/useRegistration";
import { useStep } from "@/store/useStep";

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  race_category: string;
  t_shirt_size: string;
  payment_status: string;
  mobile: string;
}

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Get both identification number and PayU parameters
  const identificationNumber = searchParams?.get("identification_number") ?? null;

  const { resetForm } = useRegistrationStore();
  const { resetStep } = useStep();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    resetForm();
    resetStep();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendWhatsAppMessage = async (
    phoneNumber: string,
    raceCategory: string,
    tShirtSize: string,
    identificationNumber: string | null,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await fetch("https://runabujhmaad.in/send-marathon-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          raceCategory,
          tShirtSize,
          identificationNumber,
          firstName,
          lastName,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send WhatsApp message");
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  };

  const sendSuccessEmail = async (userData: UserData) => {
    if (!userData) return;

    try {
      const emailData = {
        userData: {
          personal_info: {
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
          },
          marathon_details: {
            raceCategory: userData.race_category,
            tShirtSize: userData.t_shirt_size,
          },
          identification_number: identificationNumber,
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
        console.error("Failed to send confirmation email");
      }

      if (userData.mobile) {
        await sendWhatsAppMessage(
          "91" + userData.mobile,
          userData.race_category,
          userData.t_shirt_size,
          identificationNumber,
          userData.first_name,
          userData.last_name
        );
      }
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }
  };

  useEffect(() => {
    const fetchUserDataAndUpdate = async () => {
      if (!identificationNumber) {
        console.error("No identification number provided");
        return;
      }

      const { data, error: fetchError } = await supabase.from("registrations").select("*").eq("identification_number", identificationNumber).single();

      if (fetchError) {
        console.error("Error fetching user data:", fetchError);
        return;
      }

      if (data?.payment_status === "PENDING") {
        const { error: updateError } = await supabase
          .from("registrations")
          .update({ payment_status: "DONE" })
          .eq("identification_number", identificationNumber);

        if (!updateError && data) {
          await sendSuccessEmail(data);
        }
      } else if (data?.payment_status === "OFFLINE") {
        await sendSuccessEmail(data);
      }
    };

    fetchUserDataAndUpdate();
  }, [identificationNumber]);

  if (!identificationNumber) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-xl text-purple-600 text-center">Invalid or missing identification number</h1>
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
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
          >
            <motion.path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
          <p className="text-gray-600">Thank you for your registration. Your payment has been processed successfully.</p>

          {identificationNumber && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Your Identification Number</p>
              <p className="text-2xl font-mono font-bold text-blue-600 tracking-wider">{identificationNumber}</p>
              <p className="text-sm text-gray-500 mt-2">Please save this number for future reference</p>
            </div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Return to Home
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
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
              initial={{
                opacity: 1,
                x: Math.random() * (windowSize.width || 0),
                y: -20,
              }}
              animate={{
                opacity: 0,
                y: (windowSize.height || 0) + 20,
                x: Math.random() * (windowSize.width || 0),
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                backgroundColor: ["#60A5FA", "#34D399", "#F59E0B", "#EC4899"][Math.floor(Math.random() * 4)],
              }}
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
