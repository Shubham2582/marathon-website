"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useStep } from "@/store/useStep";
import { Language } from "@/types/language";
import { useLanguage, useTranslation } from "@/store/useLanguage";

import { EmailVerification } from "./steps/email-verification";
import { PastRecords } from "./steps/past-records";
import { Personel } from "./steps/personel";
import { PayUPayment } from "./steps/payu-payment";
import { Verification } from "./steps/verification";
import { useRegistrationStore } from "@/store/useRegistration";

const Registration = () => {
  const { currentStep } = useStep();
  const { language, setLanguage } = useLanguage();
  const { pastRecords } = useRegistrationStore();
  const t = useTranslation();

  const steps = [
    t.steps.email,
    t.steps.past_records,
    t.steps[1], // Verification
    t.steps[2], // Personel
    t.steps[3], // Payment
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <EmailVerification />;
      case 2:
        return <PastRecords />;
      case 3:
        return <Verification />;
      case 4:
        return <Personel />;
      case 5:
        return <PayUPayment />;
      default:
        return <EmailVerification />;
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted">
      <section className="max-w-2xl z-10 w-full bg-white backdrop-blur-xl shadow-md rounded-xl p-5">
        <h2 className="text-4xl mb-0">{t.page_title}</h2>
        {/* --- Steps --- */}
        <div className="flex gap-x-5 mt-5">
          {(() => {
            let stepNumber = 1;
            return steps.map((step, index: number) => {
              if (pastRecords.length === 0 && index === 1) {
                return null;
              }
              const currentVisibleStep = stepNumber;
              stepNumber++;
              return (
                <div
                  key={index}
                  className="flex gap-x-2 text-sm items-center font-medium"
                >
                  <p
                    className={cn(
                      "text-sm px-2.5 py-0.5 rounded",
                      currentStep === index + 1
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {currentVisibleStep}
                  </p>
                  <p
                    className={
                      currentStep === index + 1
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  >
                    {step}
                  </p>
                </div>
              );
            });
          })()}
        </div>
        {/* /--- Steps --- */}

        <hr className="my-5" />

        {/* --- Steps Count --- */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 font-medium">
            {currentStep === 1
              ? t.verification.step_label
              : currentStep === 2
                ? t.personal.step_label
                : t.payment.step_label}
          </p>
          <Select
            defaultValue={language}
            onValueChange={(value) => setLanguage(value as Language)}
          >
            <SelectTrigger className="my-2 text-sm w-fit h-8 space-x-2 px-3 rounded-md">
              <SelectValue
                placeholder={
                  language === Language.EN ? "Change Language" : "भाषा बदलें"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Language.EN}>English</SelectItem>
              <SelectItem value={Language.HIN}>Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* /--- Steps Count --- */}

        {/* --- Steps Content --- */}
        <>
          <h3 className="mt-2">{steps[currentStep - 1]}</h3>
          {renderStepContent()}
        </>
        {/* /--- Steps Content --- */}
      </section>
    </main>
  );
};

export default Registration;
