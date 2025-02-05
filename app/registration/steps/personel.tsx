import { useRegistrationStore } from "@/store/useRegistration";
import React, { useEffect } from "react";
import { FormField } from "../_components/form-field";
import { Button } from "@/components/ui/button";
import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";
import { personelFormDetails } from "@/data/personel-fields";
import { fetchAddressFromPincode } from "@/services/pincodeService";
import { validateIdNumber } from "@/utils/idValidation";
import { validateEmail } from "@/utils/validation";
import { useLanguage, useTranslation } from "@/store/useLanguage";

export const Personel = () => {
  const { form, handleChange, setForm } = useRegistrationStore();
  const { nextStep, previousStep } = useStep();
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { language } = useLanguage();
  const t = useTranslation();


  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const fields = personelFormDetails(form, handleChange, t.personal);

    fields.forEach((field) => {
      const value = form[field.name as keyof typeof form];

      // Skip ID validation if user is from Narayanpur
      if (!form.isFromNarayanpur && (field.name === "idType" || field.name === "govtId")) {
        return;
      }

      if (!value || value.toString().trim() === "") {
        newErrors[field.name] = language === "en" ? `${field.label} is required` : `${field.label} आवश्यक है`;
      } else {
        if (field.name === "emergencyContactNumber" || field.name === "mobile") {
          if (value?.toString().length !== 10) {
            newErrors.emergencyContactNumber = language === "en" ? "Phone number must be 10 digits long" : "फोन नंबर 10 अंकों का होना चाहिए";
          }
        }
      }
    });

    // Add ID validation only for non-Narayanpur residents
    if (form.isFromNarayanpur && form.idType) {
      const idError = validateIdNumber(form.idType, form.govtId, language);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4">
          {personelFormDetails(form, handleChange, t.personal).map((detail, index) => {
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

        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-x-2 text-sm font-medium">
            <Input className="size-4" type="checkbox" id="isRunner" checked={form.isRunner} onChange={() => setForm("isRunner", !form.isRunner)} />
            <label htmlFor="isRunner">{t.personal.fields.have_you_participated_in_marathons}</label>
          </div>

          {form.isRunner && (
            <div className="space-y-2 p-3 border rounded-md bg-gray-50">
              <div className="space-y-1">
                <label className="block text-sm font-medium">{t.personal.fields.previous_marathon_name}</label>
                <Input
                  type="text"
                  placeholder={t.personal.fields.previous_marathon_name_placeholder}
                  value={form.previousMarathonName || ""}
                  onChange={(e) => setForm("previousMarathonName", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium">{t.personal.fields.previous_marathon_rank}</label>
                <Input
                  type="number"
                  placeholder={t.personal.fields.previous_marathon_rank_placeholder}
                  value={form.previousMarathonRank || ""}
                  onChange={(e) => setForm("previousMarathonRank", e.target.value)}
                  min="1"
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {!form.isFromNarayanpur && (
          <div className="flex items-center gap-x-2 text-sm font-medium mt-4">
            <Input
              className="size-4"
              type="checkbox"
              name="accomodation"
              id="needsAccommodation"
              checked={form.needsAccommodation}
              onChange={() => setForm("needsAccommodation", !form.needsAccommodation)}
            />
            <label htmlFor="needsAccommodation">{t.personal.fields.need_accommodation}</label>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <Button type="button" onClick={previousStep} variant="secondary">
          {t.personal.back_button}
        </Button>
        <Button type="submit" variant="primary">
          {t.personal.next_button}
        </Button>
      </div>
    </form>
  );
};
