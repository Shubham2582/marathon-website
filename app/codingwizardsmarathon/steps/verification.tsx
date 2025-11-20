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
    <form onSubmit={handleVerificationSubmit} className="space-y-4 animate-fade-in">
      <div className="flex flex-col">
        <div className="p-3 bg-white/30 rounded-lg border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
          <h4 className="font-bold text-sm mb-2 text-purple-900 flex items-center gap-1.5">
            <span className="text-lg">🔗</span>
            {t.verification.important_links_title}
          </h4>
          <ul className="space-y-2 list-none pl-0 text-xs">
            <li className="flex items-start gap-1.5 group">
              <span className="text-purple-600 mt-0.5 group-hover:scale-110 transition-transform text-xs">▸</span>
              <Link
                href="https://youtu.be/gJ3kS9t8-nE"
                target="_blank"
                className="text-purple-700 hover:text-purple-900 hover:underline font-medium transition-colors flex-1"
              >
                {t.verification.watch_registration_tutorial_video}
              </Link>
            </li>
            <li className="flex items-start gap-1.5 group">
              <span className="text-purple-600 mt-0.5 group-hover:scale-110 transition-transform text-xs">▸</span>
              <Link
                href="https://forms.gle/LFVcYJ9uJZ3SzYrQ9"
                target="_blank"
                className="text-purple-700 hover:text-purple-900 hover:underline font-medium transition-colors flex-1"
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

      <div className="space-y-3">
        <FormField
          label={t.personal.fields.mobile}
          name="mobile"
          type="tel"
          placeholder={t.personal.fields.mobile_placeholder}
          value={form.mobile || ""}
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

        <div className="space-y-2 mt-4 pt-3 border-t border-purple-100">
          <label htmlFor="isFromNarayanpur" className="flex items-center gap-x-2.5 p-2 rounded-lg hover:bg-white/30 transition-colors cursor-pointer group">
            <Input
              className="size-4 cursor-pointer accent-purple-600"
              type="checkbox"
              name="isFromNarayanpur"
              id="isFromNarayanpur"
              checked={form.isFromNarayanpur}
              onChange={handleIsFromNarayanpur}
            />
            <p className="text-xs font-semibold text-gray-700 cursor-pointer group-hover:text-purple-700 transition-colors">
              {t.verification.are_you_from_narayanpur}
            </p>
          </label>

          <label htmlFor="isInternational" className="flex items-center gap-x-2.5 p-2 rounded-lg hover:bg-white/30 transition-colors cursor-pointer group">
            <Input
              className="size-4 cursor-pointer accent-purple-600"
              type="checkbox"
              name="isInternational"
              id="isInternational"
              checked={form.isInternational}
              onChange={handleIsInternational}
            />
            <p className="text-xs font-semibold text-gray-700 cursor-pointer group-hover:text-purple-700 transition-colors">
              {t.verification.are_you_international}
            </p>
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" size="sm" className="min-w-[120px]">{t.personal.next_button}</Button>
      </div>
    </form>
  );
};
