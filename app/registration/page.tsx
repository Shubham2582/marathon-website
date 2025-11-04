"use client";

import React, { useEffect, useState } from "react";

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
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const Registration = () => {
  const { currentStep } = useStep();
  const { language, setLanguage } = useLanguage();
  const { pastRecords } = useRegistrationStore();
  const t = useTranslation();
  const [animateStep, setAnimateStep] = useState(false);

  useEffect(() => {
    setAnimateStep(false);
    const timer = setTimeout(() => setAnimateStep(true), 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const steps = [
    t.steps.email,
    t.steps.past_records,
    t.steps[1], // Verification
    t.steps[2], // Personel
    t.steps[3], // Payment
  ];

  // Calculate visible steps and current visible step
  const hasPastRecords = pastRecords.length > 0;
  const visibleSteps = hasPastRecords ? steps : steps.filter((_, i) => i !== 1);
  const totalVisibleSteps = visibleSteps.length;
  
  // Calculate current visible step number (accounting for skipped past records)
  const getCurrentVisibleStep = () => {
    if (hasPastRecords) {
      return currentStep;
    } else {
      // If no past records and current step is after step 2, subtract 1
      return currentStep > 2 ? currentStep - 1 : currentStep;
    }
  };
  
  const currentVisibleStep = getCurrentVisibleStep();

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
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-full">
        <Image src="/images/hero-bg-img.png" alt="Registration Banner" fill className="object-cover" />
        {/* <div className="absolute top-0 left-0 w-full h-full bg-black/10"/> */}
      </div>
      
      
      <section className="max-w-xl z-10 w-full bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-5 md:p-6 border border-purple-100 animate-fade-in my-4">
        {/* Header with gradient text */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl mb-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            {t.page_title}
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full"></div>
        </div>

        {/* Modern Progress Steps */}
        <div className="mb-4">
          <div className="flex items-center justify-between relative">
            {/* Progress bar background */}
            <div className="absolute left-0 right-0 h-1 bg-white rounded-full -z-10"></div>
            {/* Active progress bar */}
            <div 
              className="absolute left-0 h-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full transition-all duration-500 -z-10"
              style={{ 
                width: `${totalVisibleSteps > 1 ? ((currentVisibleStep - 1) / (totalVisibleSteps - 1)) * 100 : 0}%` 
              }}
            ></div>
            
            {(() => {
              let stepNumber = 1;
              return steps.map((step, index: number) => {
                if (pastRecords.length === 0 && index === 1) {
                  return null;
                }
                const currentVisibleStep = stepNumber;
                stepNumber++;
                const isActive = currentStep === index + 1;
                const isCompleted = currentStep > index + 1;
                
                return (
                    <div
                      key={index}
                      className="flex flex-col h-8 w-8 items-center gap-1.5 relative animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 relative",
                          isActive && "bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg animate-pulse-glow",
                          isCompleted && "bg-gradient-to-br from-purple-600 to-violet-600 text-white",
                          !isActive && !isCompleted && "bg-white text-purple-400"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 animate-scale-in" />
                        ) : (
                          currentVisibleStep
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-xs font-semibold text-center transition-all duration-300 max-w-[60px] leading-tight",
                          isActive && "text-purple-700 scale-105",
                        )}
                      >
                        {step}
                      </p>
                    </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px my-4"></div>

        {/* Language selector and step info */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-4 bg-gradient-to-b from-purple-600 to-violet-600 rounded-full"></div>
            <p className="text-xs font-semibold">
              {currentVisibleStep} / {totalVisibleSteps}
            </p>
          </div>
          <Select
            defaultValue={language}
            onValueChange={(value) => setLanguage(value as Language)}
          >
            <SelectTrigger className="text-xs w-fit h-7 space-x-1.5 px-2.5 rounded-lg border-purple-200 hover:border-purple-400 transition-colors bg-white/50">
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

        {/* Step Content with animation */}
        <div className={cn(
          "transition-all duration-500",
          animateStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {/* <h3 className="mt-2 mb-6">{steps[currentStep - 1]}</h3> */}
          <div className="animate-fade-in">
            {renderStepContent()}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
