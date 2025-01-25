import { useRegistrationStore } from "@/store/useRegistration";
import React from "react";
import { FormField } from "../_components/form-field";
import { Button } from "@/components/ui/button";
import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";
import { personelFormDetails } from "@/data/personel-fields";


export const Personel = () => {
  const { form, handleChange, setForm } = useRegistrationStore();
  const { nextStep, previousStep } = useStep();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Get all form fields from personelFormDetails
    const fields = personelFormDetails(form, handleChange);
    
    fields.forEach((field) => {
      const value = form[field.name as keyof typeof form];
      
      if (!value || value.toString().trim() === '') {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="grid grid-cols-2 gap-2 gap-x-4">
          {/* --- Verification Form --- */}
          {personelFormDetails(form, handleChange).map((detail, index) => (
            <FormField 
              key={index} 
              {...detail} 
              error={errors[detail.name]}
            />
          ))}
          {/* /--- Verification Form --- */}
        </div>
        <div className="flex items-center gap-x-2 text-sm font-medium mt-4 pl-1">
          <Input
            className="size-4"
            type="checkbox"
            name="accomodation"
            id="needsAccommodation"
            checked={form.needsAccommodation}
            onChange={() => setForm("needsAccommodation", !form.needsAccommodation)}
          />
          <label htmlFor="needsAccommodation">Do you need accommodation?</label>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Button type="button" onClick={previousStep} variant="secondary">
          Back
        </Button>
        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
};
