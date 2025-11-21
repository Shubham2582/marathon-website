import React, { useRef } from "react";

import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form-field";
import { validateIdNumber } from "@/utils/idValidation";
import { personelFormDetails } from "@/data/personel-fields";
import { useRegistrationStore } from "@/store/useRegistration";
import { useLanguage, useTranslation } from "@/store/useLanguage";
import { fetchAddressFromPincode } from "@/services/pincodeService";

export const Personel = () => {
  const { form, handleChange, setForm } = useRegistrationStore();
  const { nextStep, previousStep } = useStep();
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { language } = useLanguage();
  const t = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    const fields = personelFormDetails(form, handleChange, t.personal);

    // Track if required core fields are filled
    let coreFieldsFilled = true;

    fields.forEach((field) => {
      // Skip validation for ID fields if user is NOT from Narayanpur (including international)
      if (
        !form.isFromNarayanpur &&
        (field.name === "idType" || field.name === "govtId")
      ) {
        return;
      }

      // Skip validation for location fields for international participants
      if (
        form.isInternational &&
        (field.name === "pincode" ||
          field.name === "state" ||
          field.name === "city" ||
          field.name === "country")
      ) {
        return;
      }

      const value = form[field.name as keyof typeof form];

      // Check if field is required and empty
      if (field.required && (!value || value.toString().trim() === "")) {
        newErrors[field.name] =
          language === "en"
            ? `${field.label} is required`
            : `${field.label} आवश्यक है`;
        coreFieldsFilled = false;
      }

      // Phone number validation - skip length check for international participants
      if (
        !form.isInternational &&
        value &&
        (field.name === "emergencyContactNumber" || field.name === "mobile")
      ) {
        if (value.toString().length !== 10) {
          newErrors[field.name] =
            language === "en"
              ? "Phone number must be 10 digits long"
              : "फोन नंबर 10 अंकों का होना चाहिए";
          coreFieldsFilled = false;
        }
      }

      // For international participants, just verify that phone numbers contain only digits
      if (
        form.isInternational &&
        value &&
        (field.name === "emergencyContactNumber" || field.name === "mobile")
      ) {
        if (!/^\d+$/.test(value.toString())) {
          newErrors[field.name] =
            language === "en"
              ? "Phone number must contain only digits"
              : "फोन नंबर में केवल अंक होने चाहिए";
          coreFieldsFilled = false;
        }
      }
    });

    // Additional validation for specific fields

    // Only validate ID fields for Narayanpur participants
    if (form.isFromNarayanpur) {
      if (!form.idType || form.idType.trim() === "") {
        newErrors.idType =
          language === "en" ? "ID type is required" : "पहचान प्रकार आवश्यक है";
        coreFieldsFilled = false;
      }

      if (!form.govtId || form.govtId.trim() === "") {
        newErrors.govtId =
          language === "en"
            ? "ID number is required"
            : "पहचान संख्या आवश्यक है";
        coreFieldsFilled = false;
      } else {
        const idError = validateIdNumber(form.idType, form.govtId, language);
        if (idError) {
          newErrors.govtId = idError;
          coreFieldsFilled = false;
        }
      }
    }

    // Validate that all other required fields are filled
    if (!form.firstName?.trim()) {
      newErrors.firstName =
        language === "en" ? "First name is required" : "पहला नाम आवश्यक है";
      coreFieldsFilled = false;
    }

    if (!form.lastName?.trim()) {
      newErrors.lastName =
        language === "en" ? "Last name is required" : "अंतिम नाम आवश्यक है";
      coreFieldsFilled = false;
    }

    if (!form.email?.trim()) {
      newErrors.email =
        language === "en" ? "Email is required" : "ईमेल आवश्यक है";
      coreFieldsFilled = false;
    }

    if (!form.mobile?.trim()) {
      newErrors.mobile =
        language === "en"
          ? "Mobile number is required"
          : "मोबाइल नंबर आवश्यक है";
      coreFieldsFilled = false;
    }

    if (!form.dateOfBirth?.trim()) {
      newErrors.dateOfBirth =
        language === "en" ? "Date of birth is required" : "जन्म तिथि आवश्यक है";
      coreFieldsFilled = false;
    }

    // if (!form.raceCategory?.trim()) {
    //   newErrors.raceCategory =
    //     language === "en"
    //       ? "Race category is required"
    //       : "दौड़ श्रेणी आवश्यक है";
    //   coreFieldsFilled = false;
    // }

    if (!form.tShirtSize?.trim()) {
      newErrors.tShirtSize =
        language === "en"
          ? "T-shirt size is required"
          : "टी-शर्ट आकार आवश्यक है";
      coreFieldsFilled = false;
    }

    if (!form.emergencyContactName?.trim()) {
      newErrors.emergencyContactName =
        language === "en"
          ? "Emergency contact name is required"
          : "आपातकालीन संपर्क नाम आवश्यक है";
      coreFieldsFilled = false;
    }

    if (!form.emergencyContactNumber?.trim()) {
      newErrors.emergencyContactNumber =
        language === "en"
          ? "Emergency contact number is required"
          : "आपातकालीन संपर्क नंबर आवश्यक है";
      coreFieldsFilled = false;
    }

    if (!form.bloodGroup?.trim()) {
      newErrors.bloodGroup =
        language === "en" ? "Blood group is required" : "रक्त समूह आवश्यक है";
      coreFieldsFilled = false;
    }

    // Non-international participants need to provide location details
    if (!form.isInternational) {
      if (!form.pincode?.trim()) {
        newErrors.pincode =
          language === "en" ? "Pin code is required" : "पिन कोड आवश्यक है";
        coreFieldsFilled = false;
      }

      if (!form.state?.trim()) {
        newErrors.state =
          language === "en" ? "State is required" : "राज्य आवश्यक है";
        coreFieldsFilled = false;
      }

      if (!form.city?.trim()) {
        newErrors.city =
          language === "en" ? "City is required" : "शहर आवश्यक है";
        coreFieldsFilled = false;
      }
    }

    setErrors(newErrors);

    const isValid = coreFieldsFilled && Object.keys(newErrors).length === 0;

    if (isValid) {
      nextStep();
    } else {
      // Scroll to the first error field
      setTimeout(() => {
        scrollToFirstError(newErrors);
      }, 100);
    }
  };

  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleChange(e.target.name, e.target.value, "text");
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
          setTimeout(() => {
            setForm("city", addressData.District);
          }, 200);
        }
      } catch (error) {
        setForm("state", "");
        setTimeout(() => {
          setForm("city", "");
        }, 200);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div>
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-3 overflow-auto max-h-[350px] px-2"
        >
          {personelFormDetails(form, handleChange, t.personal).map(
            (detail, index) => {
              // CORRECTED: Only show ID fields if the user IS from Narayanpur
              if (
                !form.isFromNarayanpur &&
                (detail.name === "idType" || detail.name === "govtId")
              ) {
                return null;
              }

              // Skip pincode, state, city for international participants
              if (
                form.isInternational &&
                (detail.name === "pincode" ||
                  detail.name === "state" ||
                  detail.name === "city")
              ) {
                return null;
              }

              // For country field, no longer making it required for international participants
              if (detail.name === "country") {
                return (
                  <FormField
                    key={index}
                    {...detail}
                    error={errors[detail.name]}
                  />
                );
              }

              return detail.name === "pincode" ? (
                <FormField
                  key={index}
                  onChange={handlePincodeChange}
                  {...detail}
                  error={errors[detail.name]}
                />
              ) : (
                <FormField
                  key={index}
                  {...detail}
                  error={errors[detail.name]}
                />
              );
            },
          )}
        </div>

        <div className="space-y-2 mt-4 pt-4 border-t border-purple-100">
          <label
            htmlFor="isRunner"
            className="flex items-center gap-x-2.5 p-2 rounded-lg hover:bg-white/30 transition-colors cursor-pointer group"
          >
            <Input
              className="size-4 cursor-pointer accent-purple-600"
              type="checkbox"
              id="isRunner"
              checked={form.isRunner}
              onChange={() => setForm("isRunner", !form.isRunner)}
            />
            <p className="text-xs font-semibold cursor-pointer group-hover:text-purple-700 transition-colors flex-1">
              {t.personal.fields.have_you_participated_in_marathons}
            </p>
          </label>

          {form.isRunner && (
            <div className="space-y-2.5 p-3 border border-white rounded-lg bg-white/30 animate-fade-in shadow-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold">
                  {t.personal.fields.previous_marathon_name}
                </label>
                <Input
                  type="text"
                  placeholder={
                    t.personal.fields.previous_marathon_name_placeholder
                  }
                  value={form.previousMarathonName || ""}
                  onChange={(e) =>
                    setForm("previousMarathonName", e.target.value)
                  }
                  className="w-full border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all bg-white/30 h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold">
                  {t.personal.fields.previous_marathon_rank}
                </label>
                <Input
                  type="number"
                  placeholder={
                    t.personal.fields.previous_marathon_rank_placeholder
                  }
                  value={form.previousMarathonRank || ""}
                  onChange={(e) =>
                    setForm("previousMarathonRank", e.target.value)
                  }
                  min="1"
                  className="w-full border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-lg transition-all bg-white/30 h-9 text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {!form.isFromNarayanpur && (
          <label
            htmlFor="needsAccommodation"
            className="flex items-center gap-x-2.5 p-2 rounded-lg hover:bg-white/30 transition-colors cursor-pointer group mt-2"
          >
            <Input
              className="size-4 cursor-pointer accent-purple-600"
              type="checkbox"
              name="accomodation"
              id="needsAccommodation"
              checked={form.needsAccommodation}
              onChange={() =>
                setForm("needsAccommodation", !form.needsAccommodation)
              }
            />
            <p className="text-xs font-semibold cursor-pointer group-hover:text-purple-700 transition-colors flex-1">
              {t.personal.fields.need_accommodation}
            </p>
          </label>
        )}
      </div>
      <div className="mt-4 pt-4 flex justify-between gap-3 border-t border-purple-100">
        <Button
          type="button"
          onClick={previousStep}
          variant="secondary"
          size="sm"
        >
          {t.personal.back_button}
        </Button>
        <Button type="submit" size="sm">
          {t.personal.next_button}
        </Button>
      </div>
    </form>
  );
};
