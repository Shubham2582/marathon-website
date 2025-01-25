"use client";

import { useStep } from "@/store/useStep";
import React from "react";
import { Personel } from "./steps/personel";
import { Payment } from "./steps/payment";
import { Verification } from "./steps/verification";
import { cn } from "@/lib/utils";
import { CashFreePayment } from "./steps/cashfree-payment";

const Registration = () => {
  const { currentStep, totalSteps } = useStep();

  const steps = ["Verification", "Personel", "Payment"];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <section className="max-w-2xl w-full bg-white shadow-md rounded-xl p-5">
        <h2 className="text-4xl mb-8">Marathon Registration</h2>

        {/* --- Steps --- */}
        <div className="flex gap-x-5">
          {steps.map((step, index: number) => (
            <div key={index} className="flex gap-x-2 items-center font-medium">
              <p
                className={cn(
                  "text-sm px-3 py-1 rounded",
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
          Step {currentStep} / {totalSteps}
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
