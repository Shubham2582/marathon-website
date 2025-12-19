"use client";

import React, { useEffect, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRegistrationStore } from "@/store/useRegistration";
import { useStep } from "@/store/useStep";
import { Download, Loader2, Image as ImageIcon, Share2 } from "lucide-react";
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

  // Universal share function using Web Share API
  const shareImage = async () => {
    if (!marathonImage || !identificationNumber) return;

    try {
      const response = await fetch(marathonImage);
      const blob = await response.blob();
      
      const file = new File(
        [blob], 
        `RunWithMaad-${identificationNumber}.png`, 
        { 
          type: "image/png",
          lastModified: new Date().getTime()
        }
      );

      const shareData = {
        files: [file],
        title: "Run with Maad - Marathon Certificate",
        text: `Check out my marathon certificate! 🏃‍♂️ #Runwithmaad #Marathon #Fitness`,
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        shareFallback();
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error("Error sharing:", error);
        shareFallback();
      }
    }
  };

  const shareFallback = () => {
    const shareText = encodeURIComponent(`Check out my marathon certificate! 🏃‍♂️ #Runwithmaad #Marathon #Fitness`);
    const currentUrl = encodeURIComponent(window.location.href);
    
    const whatsappUrl = `https://wa.me/?text=${shareText}%20${currentUrl}`;
    
    const shareOption = confirm(
      "Web Share API not supported. Would you like to:\n\n" +
      "OK - Share via WhatsApp\n" +
      "Cancel - Copy link to clipboard"
    );
    
    if (shareOption) {
      window.open(whatsappUrl, '_blank');
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard! You can paste it in Instagram or other apps.");
    }
  };

  // WhatsApp direct share
  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out my marathon certificate! 🏃‍♂️ #Runwithmaad #Marathon #Fitness`);
    const url = encodeURIComponent(window.location.href);
    
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      window.open(`whatsapp://send?text=${text}%20${url}`, '_blank');
    } else {
      window.open(`https://web.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    }
  };

  // Improved Instagram Story share for mobile
  const shareToInstagramStory = async () => {
    if (!marathonImage || !identificationNumber) return;

    // For mobile devices, prioritize Web Share API
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      try {
        const response = await fetch(marathonImage);
        const blob = await response.blob();
        
        const file = new File(
          [blob], 
          `RunWithMaad-${identificationNumber}.png`, 
          { type: "image/png" }
        );

        // Use Web Share API - Instagram will appear as an option
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Run with Maad 🏃‍♂️",
            text: "#Runwithmaad #Marathon"
          });
          return;
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        console.error('Share failed:', err);
      }
    }

    // Fallback: Download image and try to open Instagram
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    if (isIOS || isAndroid) {
      // Download the image first
      downloadImage();
      
      // Wait a bit for download to start, then try to open Instagram
      setTimeout(() => {
        // Try to open Instagram story camera
        window.location.href = 'instagram://story-camera';
        
        // Fallback to Instagram app store if Instagram not installed
        setTimeout(() => {
          const appStoreUrl = isIOS 
            ? 'https://apps.apple.com/app/instagram/id389801252'
            : 'https://play.google.com/store/apps/details?id=com.instagram.android';
          
          const openStore = confirm("Instagram app not found. Would you like to install it?");
          if (openStore) {
            window.open(appStoreUrl, '_blank');
          }
        }, 1500);
      }, 500);
    } else {
      // Desktop fallback
      alert(
        "To share on Instagram:\n\n" +
        "1. Download the image using the Download button\n" +
        "2. Open Instagram on your phone\n" +
        "3. Create a new Story\n" +
        "4. Select the downloaded image\n" +
        "5. Add #Runwithmaad hashtag"
      );
      downloadImage();
    }
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
                Download and share your personalized marathon picture
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
                
                {/* Main Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Button
                    onClick={downloadImage}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-lg font-semibold"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>

                  <Button
                    onClick={shareImage}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-lg font-semibold"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </motion.div>

                {/* Platform-Specific Share Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 flex flex-wrap gap-2 justify-center"
                >
                  <button
                    onClick={shareToWhatsApp}
                    className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </button>

                  <button
                    onClick={shareToInstagramStory}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Add to Instagram Story
                  </button>
                </motion.div>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Share with #Runwithmaad
                </p>
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

        {/* Animated Background Confetti */}
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
