import React from "react";
import Link from "next/link";

import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form-field";
import { useTranslation } from "@/store/useLanguage";
import { useRegistrationStore } from "@/store/useRegistration";

export const Verification = () => {
  const { nextStep } = useStep();
  const { form, handleChange, setForm } = useRegistrationStore();

  const t = useTranslation();

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

  const handleVerificationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleVerificationSubmit} className="space-y-6">
      <div className="flex flex-col">
        <div className="p-3 mb-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-lg mb-1">
            {t.verification.important_links_title}
          </h4>
          <ul className="space-y-2 list-disc pl-5 text-sm">
            <li>
              <Link
                href="https://youtu.be/gJ3kS9t8-nE"
                target="_blank"
                className="text-primary hover:text-primary/90 hover:underline"
              >
                {t.verification.watch_registration_tutorial_video}
              </Link>
            </li>
            <li>
              <Link
                href="https://forms.gle/LFVcYJ9uJZ3SzYrQ9"
                target="_blank"
                className="text-primary hover:text-primary/90 hover:underline"
              >
                {
                  t.verification
                    .apply_for_pacer_or_marshal_position_in_the_marathon
                }
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <FormField
          label={t.verification.email}
          name="email"
          type="email"
          placeholder={t.verification.email_placeholder}
          value={form.email}
          handleChange={handleChange}
          disabled
        />

        <FormField
          label={t.verification.gender_label}
          name="gender"
          placeholder={t.verification.gender_placeholder}
          value={form.gender}
          handleChange={handleChange}
          fieldType="select"
          options={[
            { label: t.verification.male, value: "MALE" },
            { label: t.verification.female, value: "FEMALE" },
          ]}
          required
        />

        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-x-2 text-sm font-medium pl-1">
            <Input
              className="size-4"
              type="checkbox"
              name="isFromNarayanpur"
              id="isFromNarayanpur"
              checked={form.isFromNarayanpur}
              onChange={handleIsFromNarayanpur}
            />
            <label htmlFor="isFromNarayanpur">
              {t.verification.are_you_from_narayanpur}
            </label>
          </div>

          <div className="flex items-center gap-x-2 text-sm font-medium pl-1">
            <Input
              className="size-4"
              type="checkbox"
              name="isInternational"
              id="isInternational"
              checked={form.isInternational}
              onChange={handleIsInternational}
            />
            <label htmlFor="isInternational">
              {t.verification.are_you_international}
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">{t.personal.next_button}</Button>
      </div>
    </form>
  );
};
