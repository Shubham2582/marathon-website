"use client";

import React, { useEffect, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRegistrationStore } from "@/store/useRegistration";
import { useStep } from "@/store/useStep";
import { Download, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/env";

interface UserData {
  email: string;
  first_name: string;
  last_name: string;
  race_category: string;
  t_shirt_size: string;
  payment_status: string;
  mobile: string;
  bib_num: number;
}

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Get both identification number and PayU parameters
  const identificationNumber =
    searchParams?.get("identification_number") ?? null;

  const { resetForm } = useRegistrationStore();
  const { resetStep } = useStep();

  const [bibNumber, setBibNumber] = useState<number | null>(null);
  const [marathonImage, setMarathonImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

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

  // Cleanup object URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (marathonImage) {
        URL.revokeObjectURL(marathonImage);
      }
    };
  }, [marathonImage]);

  const sendWhatsAppMessage = async (
    phoneNumber: string,
    raceCategory: string,
    tShirtSize: string,
    identificationNumber: string | null,
    firstName: string,
    lastName: string,
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
            raceCategory,
            tShirtSize,
            identificationNumber,
            firstName,
            lastName,
          }),
        },
      );

      if (!response.ok) {
        console.error("Failed to send WhatsApp message");
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  };

  const sendSuccessEmail = async (userData: UserData, bibNumber: number) => {
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
          identificationNumber,
          bibNumber,
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
          userData.last_name,
        );
      }
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }
  };

  const fetchMarathonImage = async () => {
    if (!identificationNumber) return;

    setImageLoading(true);
    setImageError(false);

    try {
      const imageUrl = `${API_URL}/image/${identificationNumber}`;
      const response = await fetch(imageUrl);

      if (response.ok) {
        const blob = await response.blob();
        const imageUrlObject = URL.createObjectURL(blob);
        setMarathonImage(imageUrlObject);
      } else {
        setImageError(true);
      }
    } catch (error) {
      console.error("Error fetching marathon image:", error);
      setImageError(true);
    } finally {
      setImageLoading(false);
    }
  };

  const downloadImage = () => {
    if (!marathonImage || !identificationNumber) return;

    const link = document.createElement("a");
    link.href = marathonImage;
    link.download = `marathon-picture-${identificationNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchUserDataAndUpdate = async () => {
      if (!identificationNumber) {
        console.error("No identification number provided");
        return;
      }
      
      const { data, error: fetchError } = await supabase
        .schema("marathon")
        .from("registrations_2026")
        .select("*")
        .eq("identification_number", identificationNumber)
        .single();
      if (fetchError) {
        console.error("Error fetching user data:", fetchError);
        return;
      } else if (
        data?.payment_status === "OFFLINE" ||
        data?.payment_status === "DONE"
      ) {
        setBibNumber(data?.bib_num);
        await sendSuccessEmail(data, data.bib_num);
        // Fetch marathon image after successful payment
        await fetchMarathonImage();
      }
    };

    fetchUserDataAndUpdate();
  }, [identificationNumber]);

  if (!identificationNumber) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-xl text-purple-600 text-center">
            Invalid or missing identification number
          </h1>
        </div>
      </main>
    );
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 relative overflow-hidden">
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
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your registration. Your payment has been processed
            successfully.
          </p>

          {identificationNumber && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200"
            >
              <p className="text-sm font-semibold text-gray-700 mb-1">Your Bib Number</p>
              <p className="text-3xl font-mono font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent tracking-wider">
                {bibNumber || "Loading..."}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Please save this number for future reference
              </p>
            </motion.div>
          )}

          {/* Marathon Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 space-y-4"
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Your Marathon Picture
              </h3>
              <p className="text-sm text-gray-600">
                Download your personalized marathon picture
              </p>
            </div>

            {imageLoading && (
              <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                <p className="text-sm text-gray-600">Loading your picture...</p>
              </div>
            )}

            {imageError && (
              <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Certificate will be available soon
                </p>
              </div>
            )}

            {marathonImage && !imageLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-xl border-4 border-purple-200 shadow-2xl bg-white p-2">
                  <img
                    src={marathonImage}
                    alt="Marathon Picture"
                    className="w-full h-96 rounded-lg object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 flex justify-center"
                >
                  <Button
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-lg font-semibold"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Picture
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-300 text-base font-medium rounded-lg text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
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
              className="absolute w-2 h-2 bg-primary rounded-full"
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
                backgroundColor: ["#60A5FA", "#34D399", "#F59E0B", "#EC4899"][
                  Math.floor(Math.random() * 4)
                ],
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
