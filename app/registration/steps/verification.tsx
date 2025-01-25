import { IoLogoWhatsapp, IoMailOutline } from "react-icons/io5";

import React, { useState } from "react";
import { FormField } from "../_components/form-field";
import { Button } from "@/components/ui/button";
import { useRegistrationStore } from "@/store/useRegistration";
import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";

export const Verification = () => {
  const { form, handleChange, setForm } = useRegistrationStore();
  const [otp, setOtp] = useState("");
  const { nextStep } = useStep();
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [error, setError] = useState<{ email?: string; mobile?: string }>({
    email: "",
    mobile: "",
  });

  const [verificationMethod, setVerificationMethod] = useState<
    "EMAIL" | "WHATSAPP"
  >("EMAIL");

  const verificationMethodClass = (activeMethod: "EMAIL" | "WHATSAPP") =>
    `flex flex-col items-center p-4 border h-fit gap-2 ${
      verificationMethod === activeMethod
        ? "border-blue-300 bg-blue-100 text-blue-500 hover:bg-blue-200"
        : "text-gray-500 border-gray-300 bg-gray-100 hover:bg-gray-200"
    }`;

  const handleOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verificationMethod === "EMAIL") {
      if (!form.email.match(/^[^ @]*@[^ @]*$/)) {
        setError({ email: "Invalid email" });
        return;
      }
    }else{
      if(!form.mobile.match(/^[0-9]{10}$/)){
        setError({mobile: "Invalid mobile number"})
        return;
      }
    }
    nextStep();
  };

  return (
    <form onSubmit={handleOTP} className="space-y-6">
      {/* --- Verification Method --- */}
      <div className="flex flex-col">
        <h3 className="text-lg font-medium">Choose Verification Method</h3>
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
      {/* /--- Verification Method --- */}

      {/* --- Verification Form --- */}
      <div className="space-y-2">
        <FormField
          label={`${verificationMethod === "EMAIL" ? "Email" : "Phone Number"}`}
          name={verificationMethod === "EMAIL" ? "email" : "mobile"}
          placeholder={`${
            verificationMethod === "EMAIL" ? "example@mail.com" : "91XXXXX809"
          }`}
          value={verificationMethod === "EMAIL" ? form.email : form.mobile}
          handleChange={handleChange}
          type={`${
            verificationMethod === "EMAIL" ? "email" : "text"
          }`}
          error={error.email || error.mobile}
        />
        <FormField
          label="Gender"
          name="gender"
          placeholder="Choose your gender"
          value={form.gender}
          handleChange={handleChange}
          fieldType="select"
          options={[{label: "Male", value: "MALE"}, {label: "Female", value: "FEMALE"}]}
        />
        <FormField
          label="OTP"
          name="otp"
          disabled={!isOTPSent}
          placeholder="Enter 4 digit OTP"
          value={otp}
          handleChange={(
            e: React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
          ) => setOtp(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-x-2 text-sm font-medium mt-4 pl-1">
          <Input
            className="size-4"
            type="checkbox"
            name="naranpur"
            id="isFromNarayanpur"
            checked={form.isFromNarayanpur}
            onChange={() => setForm("isFromNarayanpur", !form.isFromNarayanpur)}
          />
          <label htmlFor="isFromNarayanpur">Are you from Narayanpur?</label>
        </div>
      {/* /--- Verification Form --- */}
      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Send OTP
        </Button>
      </div>
    </form>
  );
};
