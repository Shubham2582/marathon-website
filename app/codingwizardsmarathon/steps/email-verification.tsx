"use client";

import { useState } from "react";
import { useStep } from "@/store/useStep";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form-field";
import { useTranslation } from "@/store/useLanguage";
import { useRegistrationStore } from "@/store/useRegistration";
import { supabase } from "@/lib/supabase";

export const EmailVerification = () => {
  const { setStep } = useStep();
  const { form, handleChange, setPastRecords } = useRegistrationStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslation();

  const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneNumber = form.mobile?.trim() || "";

    // Validate phone number
    if (!phoneNumber) {
      setError(t.email_verification.phone_required);
      return;
    }

    // Validate 10 digits
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError(t.email_verification.phone_invalid);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase
        .schema("marathon")
        .from("registrations_2025")
        .select("*")
        .eq("mobile", phoneNumber);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        console.log(data);
        setPastRecords(data);
        setStep(2); // Go to PastRecords
      } else {
        setStep(3); // Go to Verification
      }
    } catch (err) {
      console.error(err);
      // if there's an error, just proceed with normal registration
      setStep(3); // Go to Verification
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePhoneSubmit} className="space-y-4 animate-fade-in">
      <p className="text-sm flex flex-col font-semibold">
        {t.email_verification.phone_instruction}{" "}
        {t.email_verification.phone_instruction_suffix}
      </p>

      <FormField
        label={t.personal.fields.mobile}
        name="mobile"
        type="tel"
        placeholder={t.personal.fields.mobile_placeholder}
        value={form.mobile || ""}
        handleChange={handleChange}
        error={error}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={10}
      />

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={loading}
          size="sm"
          className="min-w-[120px]"
        >
          {loading
            ? t.email_verification.searching
            : t.email_verification.continue_button}
        </Button>
      </div>
    </form>
  );
};
