"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form-field";
import { useTranslation } from "@/store/useLanguage";
import { useTeamRegistrationStore } from "@/store/useTeamRegistration";
import { useStep } from "@/store/useStep";
import { toast } from "@/components/ui/use-toast";

interface TeamDetailField {
  name: string;
  label: string;
  type: "text" | "date" | "select" | "textarea";
  placeholder: string;
  maxLength?: number;
  required: boolean;
}

export function TeamDetails() {
  const { nextStep, setProgress } = useStep();
  const { teamDetails, handleTeamChange } = useTeamRegistrationStore();
  const t = useTranslation();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const teamDetailFields: TeamDetailField[] = [
    {
      name: "team_name",
      label: t.team_details.team_name,
      type: "text",
      placeholder: t.team_details.team_name,
      required: true,
    },
    {
      name: "mobile",
      label: t.team_details.mobile,
      type: "text",
      placeholder: t.team_details.mobile,
      maxLength: 10,
      required: true,
    },
    {
      name: "email",
      label: t.personal.fields.email,
      type: "text",
      placeholder: t.personal.fields.email_placeholder,
      required: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let allFieldsValid = true;

    // Validate team details
    teamDetailFields.forEach((field) => {
      const value = teamDetails[field.name as keyof typeof teamDetails];

      if (field.required && (!value || value.toString().trim() === "")) {
        newErrors[field.name] = `${field.label} is required`;
        allFieldsValid = false;
      }

      // Mobile number validation
      if (field.name === "mobile" && value) {
        if (!/^\d{10}$/.test(value.toString())) {
          newErrors[field.name] = "Mobile number must be 10 digits.";
          allFieldsValid = false;
        }
      }

      // Email validation
      if (field.name === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.toString())) {
          newErrors[field.name] = "Please enter a valid email address.";
          allFieldsValid = false;
        }
      }
    });

    setErrors(newErrors);

    if (allFieldsValid && Object.keys(newErrors).length === 0) {
      console.log(teamDetails);
      nextStep();
      setProgress(50);
    } else {
      toast({
        title: "Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamDetailFields.map((field, index) => (
          <FormField
            key={index}
            {...field}
            value={
              teamDetails[field.name as keyof typeof teamDetails] as string
            }
            handleChange={handleTeamChange}
            error={errors[field.name]}
          />
        ))}
      </div>

      <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
        <input
          id="team-wants-tshirt"
          type="checkbox"
          checked={teamDetails.wants_tshirt}
          onChange={(e) => handleTeamChange("wants_tshirt", e.target.checked)}
          className="size-4 cursor-pointer accent-purple-600"
        />
        <label
          htmlFor="team-wants-tshirt"
          className="text-sm font-medium leading-none"
        >
          {t.team_details.wants_tshirt?.replace("{price}", "200") ||
            "Want T-shirt? (₹200 for 4 members)"}
        </label>
      </div>

      <div className="flex justify-end">
        <Button type="submit">{t.personal.next_button}</Button>
      </div>
    </form>
  );
}
