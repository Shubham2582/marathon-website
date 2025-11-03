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
  const { form, setForm, setPastRecords } = useRegistrationStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslation();

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email) {
      setError(t.email_verification.enter_email_error);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase
        .schema("marathon")
        .from("registrations_2025")
        .select("*")
        .eq("email", form.email);

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

  const handleChange = (name: string, value: string) => {
    setForm(name as any, value);
  };

  return (
    <form onSubmit={handleEmailSubmit} className="space-y-4 animate-fade-in">
      <div className="bg-white/30 rounded-lg p-3">
        <p className="text-xs text-gray-700">
          <span className="font-semibold text-purple-700">{t.email_verification.enter_email_error.split(' ')[0]}</span> {t.email_verification.enter_email_error.split(' ').slice(1).join(' ')}
        </p>
      </div>
      
      <FormField
        label={t.verification.email}
        name="email"
        type="email"
        placeholder={t.verification.email_placeholder}
        value={form.email}
        handleChange={handleChange}
        error={error}
      />
      
      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={loading} size="sm" className="min-w-[120px]">
          {loading
            ? t.email_verification.searching
            : t.email_verification.continue_button}
        </Button>
      </div>
    </form>
  );
};
