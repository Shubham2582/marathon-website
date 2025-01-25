import React, { useState } from "react";
import { IoLogoWhatsapp, IoMailOutline } from "react-icons/io5";
import { FormField } from "../_components/form-field";
import { Button } from "@/components/ui/button";
import { useRegistrationStore } from "@/store/useRegistration";
import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export const Verification = () => {
  const { form, handleChange, setForm } = useRegistrationStore();
  const [otp, setOtp] = useState("");
  const { nextStep } = useStep();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [error, setError] = useState<{ email?: string; mobile?: string }>({});
  const [verificationMethod, setVerificationMethod] = useState<"EMAIL" | "WHATSAPP">("EMAIL");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const startCooldown = () => {
    setCooldown(30);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOTP = async () => {
    setIsSendingOTP(true);
    setOtpError("");
    setError({});

    try {
      const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOTP(newOTP);

      if (verificationMethod === "EMAIL") {
        if (!validateEmail(form.email)) {
          setError({ email: "Invalid email address" });
          setIsSendingOTP(false);
          return;
        }

        const emailData = {
          userData: {
            personal_info: {
              email: form.email,
              firstName: "User",
              lastName: "",
            },
            marathon_details: {
              otp: newOTP,
            },
          },
        };

        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to send OTP email");
        }
      } else {
        if (!validateMobile(form.mobile)) {
          setError({ mobile: "Invalid mobile number" });
          setIsSendingOTP(false);
          return;
        }

        const response = await fetch("http://157.245.100.93:3001/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: `91${form.mobile}`,
            otp: newOTP
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          // Handle specific error messages from WhatsApp OTP service
          const errorMessage = responseData.message || "Failed to send WhatsApp OTP";
          setError({ mobile: errorMessage });
          setIsSendingOTP(false);
          return;
        }
      }

      toast.success(`OTP sent to your ${verificationMethod === "EMAIL" ? "email" : "WhatsApp"}`);
      setIsOtpSent(true);
      startCooldown();
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error(error);
    } finally {
      setIsSendingOTP(false);
    }
  };

  const verifyOTP = () => {
    if (otp === generatedOTP) {
      toast.success("OTP verified successfully!");
      nextStep();
    } else {
      setOtpError("Invalid OTP. Please check and try again.");
      toast.error("Invalid OTP");
    }
  };

  const verificationMethodClass = (activeMethod: "EMAIL" | "WHATSAPP") =>
    `flex flex-col items-center p-4 border h-fit gap-2 ${
      verificationMethod === activeMethod
        ? "border-blue-300 bg-blue-100 text-blue-500 hover:bg-blue-200"
        : "text-gray-500 border-gray-300 bg-gray-100 hover:bg-gray-200"
    }`;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      verifyOTP();
    }} className="space-y-6">
      <div className="flex flex-col">
        <h3 className="text-lg font-medium mb-4">Choose Verification Method</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            className={verificationMethodClass("EMAIL")}
            onClick={() => setVerificationMethod("EMAIL")}
          >
            <IoMailOutline className="size-7" />
            <span>Email OTP</span>
          </Button>

          <Button
            type="button"
            className={verificationMethodClass("WHATSAPP")}
            onClick={() => setVerificationMethod("WHATSAPP")}
          >
            <IoLogoWhatsapp className="size-7" />
            <span>WhatsApp OTP</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <FormField
          label={verificationMethod === "EMAIL" ? "Email" : "Phone Number"}
          name={verificationMethod === "EMAIL" ? "email" : "mobile"}
          placeholder={verificationMethod === "EMAIL" ? "example@mail.com" : "XXXXXXXXXX"}
          value={verificationMethod === "EMAIL" ? form.email : form.mobile}
          handleChange={handleChange}
          type={verificationMethod === "EMAIL" ? "email" : "tel"}
          error={verificationMethod === "EMAIL" ? error.email : error.mobile}
        />

        <FormField
          label="Gender"
          name="gender"
          placeholder="Choose your gender"
          value={form.gender}
          handleChange={handleChange}
          fieldType="select"
          options={[
            { label: "Male", value: "MALE" }, 
            { label: "Female", value: "FEMALE" }
          ]}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium">OTP</label>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpError(""); // Clear error when user starts typing
              }}
              disabled={!isOtpSent}
              maxLength={4}
              className="flex-grow"
            />
            <Button 
              type="button" 
              onClick={sendOTP} 
              disabled={
                cooldown > 0 || 
                (verificationMethod === "EMAIL" ? !validateEmail(form.email) : !validateMobile(form.mobile)) || 
                isSendingOTP
              }
              // variant="blue"
            >
              {isSendingOTP ? "Sending..." : 
               cooldown > 0 ? `Resend OTP (${cooldown}s)` : 
               "Send OTP"}
            </Button>
          </div>
          {otpError && (
            <p className="text-red-500 text-sm mt-1">{otpError}</p>
          )}
        </div>

        <div className="flex items-center gap-x-2 text-sm font-medium mt-4 pl-1">
          <Input
            className="size-4"
            type="checkbox"
            name="isFromNarayanpur"
            id="isFromNarayanpur"
            checked={form.isFromNarayanpur}
            onChange={() => setForm("isFromNarayanpur", !form.isFromNarayanpur)}
          />
          <label htmlFor="isFromNarayanpur">Are you from Narayanpur?</label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          variant="primary" 
          disabled={!isOtpSent || otp.length !== 4}
        >
          Verify OTP
        </Button>
      </div>
    </form>
  );
};