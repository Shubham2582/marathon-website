import React, { useState } from "react";
import { IoLogoWhatsapp, IoMailOutline } from "react-icons/io5";
import { FormField } from "../_components/form-field";
import { Button } from "@/components/ui/button";
import { useRegistrationStore } from "@/store/useRegistration";
import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useTranslation } from "@/store/useLanguage";

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

  const t = useTranslation();

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

  const handleIsFromNarayanpur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm("isFromNarayanpur", e.target.checked);
    setForm("pincode", e.target.checked ? "494661" : "");
    setForm("city", e.target.checked ? "Narayanpur" : "");
    setForm("state", e.target.checked ? "Chattisgarh" : "");

    // If user is from Narayanpur, they can't be international
    if (e.target.checked) {
      setForm("isInternational", false);
    }
  };

  const handleIsInternational = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm("isInternational", e.target.checked);

    // If user is international, they can't be from Narayanpur
    if (e.target.checked) {
      setForm("isFromNarayanpur", false);
      setForm("pincode", "");
      setForm("city", "");
      setForm("state", "");
      setForm("country", "");
    } else {
      setForm("country", "India");
    }
  };

  const sendOTP = async () => {
    setIsSendingOTP(true);
    setOtpError("");

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

        const response = await fetch("https://runabujhmaad.in/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: `91${form.mobile}`,
            otp: newOTP,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to send WhatsApp OTP");
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        verifyOTP();
      }}
      className="space-y-6"
    >
      <div className="flex flex-col">
        <div className="p-3 mb-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-lg mb-1">{t.verification.important_links_title}</h4>
          <ul className="space-y-2 list-disc pl-5 text-sm">
            <li>
              <Link href="https://youtu.be/gJ3kS9t8-nE" target="_blank" className="text-blue-600 hover:text-blue-800 hover:underline">
                {t.verification.watch_registration_tutorial_video}
              </Link>
            </li>
            <li>
              <Link href="https://forms.gle/LFVcYJ9uJZ3SzYrQ9" target="_blank" className="text-blue-600 hover:text-blue-800 hover:underline">
                {t.verification.apply_for_pacer_or_marshal_position_in_the_marathon}
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Verification Method Section */}
        {/* <h3 className="text-lg font-medium mb-4">
          {t.verification.method_label}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            className={verificationMethodClass("EMAIL")}
            onClick={() => setVerificationMethod("EMAIL")}
          >
            <IoMailOutline className="size-7" />
            <span>{t.verification.email_otp}</span>
          </Button>

          <Button
            type="button"
            className={verificationMethodClass("WHATSAPP")}
            onClick={() => setVerificationMethod("WHATSAPP")}
          >
            <IoLogoWhatsapp className="size-7" />
            <span>{t.verification.whatsapp_otp}</span>
          </Button>
        </div> */}
        {/* --- Verification Method Section */}
      </div>

      <div className="space-y-2">
        <FormField
          label={verificationMethod === "EMAIL" ? t.verification.email : t.verification.mobile}
          name={verificationMethod === "EMAIL" ? "email" : "mobile"}
          placeholder={verificationMethod === "EMAIL" ? t.verification.email_placeholder : t.verification.mobile_placeholder}
          value={verificationMethod === "EMAIL" ? form.email : form.mobile}
          handleChange={handleChange}
          type={verificationMethod === "EMAIL" ? "email" : "tel"}
          error={verificationMethod === "EMAIL" ? error.email : error.mobile}
        />

        <FormField
          label={t.verification.gender_label}
          name="gender"
          placeholder={t.verification.gender_label}
          value={form.gender}
          handleChange={handleChange}
          fieldType="select"
          options={[
            { label: t.verification.male, value: "MALE" },
            { label: t.verification.female, value: "FEMALE" },
          ]}
          required
        />

        {/* --- OTP Section */}
        {/* <div className="space-y-2">
          <label className="block text-sm font-medium">OTP</label>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={t.verification.otp_placeholder}
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
                (verificationMethod === "EMAIL"
                  ? !validateEmail(form.email)
                  : !validateMobile(form.mobile)) ||
                isSendingOTP
              }
            >
              {isSendingOTP
                ? t.verification.sending_otp
                : cooldown > 0
                ? `${t.verification.resend_otp} (${cooldown}s)`
                : t.verification.send_otp}
            </Button>
          </div>
          {otpError && <p className="text-purple-600 text-sm mt-1">{otpError}</p>}
        </div> */}
        {/* --- OTP Section */}

        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-x-2 text-sm font-medium pl-1">
            <Input
              className="size-4"
              type="checkbox"
              name="isFromNarayanpur"
              id="isFromNarayanpur"
              checked={form.isFromNarayanpur}
              onChange={handleIsFromNarayanpur}
              disabled={form.isInternational}
            />
            <label htmlFor="isFromNarayanpur">{t.verification.are_you_from_narayanpur}</label>
          </div>

          <div className="flex items-center gap-x-2 text-sm font-medium pl-1">
            <Input
              className="size-4"
              type="checkbox"
              name="isInternational"
              id="isInternational"
              checked={form.isInternational}
              onChange={handleIsInternational}
              disabled={form.isFromNarayanpur}
            />
            <label htmlFor="isInternational">{t.verification.are_you_international}</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          // disabled={!isOtpSent || otp.length !== 4}
        >
          {/* {t.verification.verify_otp_button} */}
          {t.personal.next_button}
        </Button>
      </div>
    </form>
  );
};
