"use client";
import React, { useRef } from "react";

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
  required: boolean;
}

interface TeamMemberField extends TeamDetailField {
  options?: { value: string; label: string }[];
}

export function TeamDetails() {
  const { nextStep, setProgress } = useStep();
  const { teamDetails, handleTeamChange, handleMemberChange } =
    useTeamRegistrationStore();
  const t = useTranslation();
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const teamDetailFields: TeamDetailField[] = [
    {
      name: "team_name",
      label: t.team_details.team_name,
      type: "text",
      placeholder: t.team_details.team_name,
      required: true,
    },
    {
      name: "email",
      label: t.personal.fields.email,
      type: "text",
      placeholder: t.personal.fields.email_placeholder,
      required: true,
    },
    {
      name: "city",
      label: t.personal.fields.city,
      type: "text",
      placeholder: t.personal.fields.city_placeholder,
      required: true,
    },
  ];

  const teamMemberFields = (memberIndex: number): TeamMemberField[] => [
    {
      name: "name",
      label: t.team_details.name,
      type: "text",
      placeholder: t.team_details.name,
      required: true,
    },
    {
      name: "mobile",
      label: t.team_details.mobile,
      type: "text", // Changed from "number" to "text"
      placeholder: t.team_details.mobile,
      required: true,
    },
    {
      name: "gender",
      label: t.verification.gender_label,
      type: "select",
      placeholder: t.verification.gender_placeholder,
      required: true,
      options: [
        { value: "MALE", label: t.verification.male },
        { value: "FEMALE", label: t.verification.female },
      ],
    },
    {
      name: "tShirtSize",
      label: t.team_details.tshirt_size,
      type: "select",
      placeholder: t.team_details.tshirt_size_placeholder,
      required: teamDetails.members[memberIndex].wantsTshirt,
      options: [
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
        { value: "XXL", label: "XXL" },
      ],
    },
  ];

  const scrollToFirstError = (errorFields: Record<string, string>) => {
    const firstErrorField = Object.keys(errorFields)[0];
    if (!firstErrorField || !scrollContainerRef.current) return;

    // Find the input element with the error
    const errorInput = scrollContainerRef.current.querySelector(
      `[name="${firstErrorField}"]`,
    ) as HTMLElement;

    if (errorInput) {
      // Scroll the container to show the error field
      const container = scrollContainerRef.current;
      const inputRect = errorInput.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate if the input is outside the visible area
      const isAbove = inputRect.top < containerRect.top;
      const isBelow = inputRect.bottom + 8 > containerRect.bottom;

      if (isAbove || isBelow) {
        // Calculate the scroll position to center the input in the container
        const inputOffsetTop = errorInput.offsetTop;
        const containerScrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const inputHeight = errorInput.offsetHeight;

        const targetScroll =
          inputOffsetTop - containerHeight / 2 + inputHeight / 2;

        container.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: "smooth",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let allFieldsValid = true;

    // Validate main team details
    teamDetailFields.forEach((field) => {
      if (
        field.required &&
        (!teamDetails[field.name as keyof typeof teamDetails] ||
          teamDetails[field.name as keyof typeof teamDetails]
            .toString()
            .trim() === "")
      ) {
        newErrors[field.name] = `${field.label} is required`;
        allFieldsValid = false;
      }
    });

    // Validate team members
    teamDetails.members.forEach((member, memberIndex) => {
      teamMemberFields(memberIndex).forEach((field) => {
        if (
          field.required &&
          (!member[field.name as keyof typeof member] ||
            member[field.name as keyof typeof member].toString().trim() === "")
        ) {
          newErrors[`members.${memberIndex}.${field.name}`] =
            `${field.label} is required`;
          allFieldsValid = false;
        }

        // Mobile number validation
        if (field.name === "mobile" && member.mobile) {
          if (!/^\d{10}$/.test(member.mobile)) {
            newErrors[`members.${memberIndex}.${field.name}`] =
              "Mobile number must be 10 digits.";
            allFieldsValid = false;
          }
        }
      });
    });

    setErrors(newErrors);

    if (allFieldsValid && Object.keys(newErrors).length === 0) {
      nextStep();
      setProgress(50);
    } else {
      toast({
        title: "Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      setTimeout(() => {
        scrollToFirstError(newErrors);
      }, 100);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamDetailFields.map((field, index) => (
          <FormField
            key={index}
            {...field}
            value={teamDetails[field.name as keyof typeof teamDetails] as string}
            handleChange={handleTeamChange}
            error={errors[field.name]}
          />
        ))}
      </div>
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2"
      >
        {teamDetails.members.map((member, memberIndex) => (
          <div key={memberIndex} className="space-y-2 p-4 border rounded-md">
            <h3 className="font-semibold">
              {t.team_details.member} {memberIndex + 1}
            </h3>
            {teamMemberFields(memberIndex).map((field, fieldIndex) => {
              if (field.name === "tShirtSize" && !member.wantsTshirt) {
                return null;
              }
              return (
                <FormField
                  key={fieldIndex}
                  {...field}
                  value={member[field.name as keyof typeof member] as string}
                  handleChange={(name, value) =>
                    handleMemberChange(memberIndex, name, value)
                  }
                  error={errors[`members.${memberIndex}.${field.name}`]}
                  fieldType={field.type}
                />
              );
            })}
            <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <input
                type="checkbox"
                checked={member.wantsTshirt}
                onChange={(e) =>
                  handleMemberChange(
                    memberIndex,
                    "wantsTshirt",
                    e.target.checked,
                  )
                }
                className="size-4 cursor-pointer accent-purple-600"
              />
              <label className="text-sm font-medium leading-none">
                {t.team_details.wants_tshirt.replace("{price}", "200")}
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button type="submit">{t.personal.next_button}</Button>
      </div>
    </form>
  );
}
