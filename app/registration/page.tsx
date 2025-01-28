"use client";

import { useStep } from "@/store/useStep";
import React from "react";
import { Personel } from "./steps/personel";
import { Verification } from "./steps/verification";
import { cn } from "@/lib/utils";
import { CashFreePayment } from "./steps/cashfree-payment";
import { LucideLanguages } from "lucide-react";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { useLanguage, useTranslation } from "@/store/useLanguage";
import { Language } from "@/types/language";
import {translations} from "@/languages";

const Registration = () => {
  const { currentStep, totalSteps } = useStep();
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();

  const steps = [t.steps[1], t.steps[2], t.steps[3]];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <section className="max-w-2xl w-full bg-white shadow-md rounded-xl p-5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl mb-0">{t.page_title}</h2>
          <div className="flex items-center gap-x-2">
            <Select onValueChange={(value) => setLanguage(value as Language)}>
              <SelectTrigger>
                <LucideLanguages />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Language.EN}>English</SelectItem>
                <SelectItem value={Language.HIN}>Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* --- Steps --- */}
        <div className="flex gap-x-5">
          {steps.map((step, index: number) => (
            <div
              key={index}
              className="flex gap-x-2 text-sm items-center font-medium"
            >
              <p
                className={cn(
                  "text-sm px-2.5 py-0.5 rounded",
                  currentStep === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {index + 1}
              </p>
              <p
                className={
                  currentStep === index + 1 ? "text-blue-600" : "text-gray-600"
                }
              >
                {step}
              </p>
            </div>
          ))}
        </div>
        {/* /--- Steps --- */}

        <hr className="my-5" />

        {/* --- Steps Count --- */}
        <p className="text-sm text-gray-500 font-medium">
          {currentStep === 1 ? t.verification.step_label : currentStep === 2 ? t.personal.step_label : t.payment.step_label}
        </p>
        {/* /--- Steps Count --- */}

        {/* --- Steps Content --- */}
        <>
          <h3 className="mt-2">{steps[currentStep - 1]}</h3>
          {currentStep === 1 && <Verification />}
          {currentStep === 2 && <Personel />}
          {currentStep === 3 && <CashFreePayment />}
        </>
        {/* /--- Steps Content --- */}
      </section>
    </main>
  );
};

export default Registration;
