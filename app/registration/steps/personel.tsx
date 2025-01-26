import { useRegistrationStore } from "@/store/useRegistration";
import React, { useEffect } from "react";
import { FormField } from "../_components/form-field";
import { Button } from "@/components/ui/button";
import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";
import { personelFormDetails } from "@/data/personel-fields";
import { fetchAddressFromPincode } from "@/services/pincodeService";
import { validateIdNumber } from "@/utils/idValidation";

export const Personel = () => {
  const { form, handleChange, setForm } = useRegistrationStore();
  const { nextStep, previousStep } = useStep();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const fields = personelFormDetails(form, handleChange);

    fields.forEach((field) => {
      const value = form[field.name as keyof typeof form];

      // Skip ID validation if user is from Narayanpur
      if (form.isFromNarayanpur && (field.name === "idType" || field.name === "govtId")) {
        return;
      }

      if (!value || value.toString().trim() === "") {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    // Add ID validation only for non-Narayanpur residents
    if (!form.isFromNarayanpur && form.idType) {
      const idError = validateIdNumber(form.idType, form.govtId);
      if (idError) {
        newErrors.govtId = idError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      nextStep();
    }
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleChange(e);
    const pincode = e.target.value;

    if (!pincode) {
      setForm("state", "");
      setForm("city", "");
      return;
    }

    if (pincode.length === 6) {
      try {
        const addressData = await fetchAddressFromPincode(pincode);
        if (addressData) {
          setForm("state", addressData.State);
          setForm("city", addressData.District);
        }
      } catch (error) {
        setForm("state", "");
        setForm("city", "");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="grid grid-cols-2 gap-2 gap-x-4">
          {personelFormDetails(form, handleChange).map((detail, index) => {
            // Skip ID fields if user is from Narayanpur
            if (!form.isFromNarayanpur && (detail.name === "idType" || detail.name === "govtId")) {
              return null;
            }

            return detail.name === "pincode" ? (
              <FormField key={index} onChange={handlePincodeChange} {...detail} error={errors[detail.name]} />
            ) : (
              <FormField key={index} {...detail} error={errors[detail.name]} />
            );
          })}
        </div>
        {!form.isFromNarayanpur && (
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
        )}
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
