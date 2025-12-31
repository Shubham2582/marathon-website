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
import { getUniqueIdentificationNumber, supabase } from "@/lib/supabase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Helper function to get race category
function getRaceCategory(city: string, gender: string, language: string) {
  const bastarCities = ["Jagdalpur", "Kondagaon", "Kanker", "Bijapur", "Dantewada", "Sukma", "Bastar"];
  
  const normalizedGender = gender ? gender.toUpperCase() : "";
  
  if (language === "hi") {
    if (city === "Narayanpur") {
      if (normalizedGender === "MALE") {
        return "नारायणपुर ओपन 21 किमी";
      } else if (normalizedGender === "FEMALE") {
        return "नारायणपुर महिला 21 किमी";
      }
    } else if (bastarCities.includes(city)) {
      if (normalizedGender === "MALE") {
        return "बस्तर पुरुष 21 किमी";
      } else if (normalizedGender === "FEMALE") {
        return "बस्तर महिला 21 किमी";
      }
    } else {
      if (normalizedGender === "MALE") {
        return "ओपन 21 किमी";
      } else if (normalizedGender === "FEMALE") {
        return "महिला ओपन 21 किमी";
      }
    }
    return "21 किमी";
  } else {
    // English version
    if (city === "Narayanpur") {
      if (normalizedGender === "MALE") {
        return "Narayanpur Open 21 KM";
      } else if (normalizedGender === "FEMALE") {
        return "Narayanpur Women 21 KM";
      }
    } else if (bastarCities.includes(city)) {
      if (normalizedGender === "MALE") {
        return "Bastar Men 21 KM";
      } else if (normalizedGender === "FEMALE") {
        return "Bastar Women 21 KM";
      }
    } else {
      if (normalizedGender === "MALE") {
        return "Open 21 KM";
      } else if (normalizedGender === "FEMALE") {
        return "Women Open 21 KM";
      }
    }
    return "21 KM";
  }
}

export const Personel = () => {
  const { form, handleChange, setForm, setIdentificationNumber } =
    useRegistrationStore();
  const { nextStep, previousStep } = useStep();
  const [showVerificationAlert, setShowVerificationAlert] =
    React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { language } = useLanguage();
  const t = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollToFirstError = (errorFields: Record<string, string>) => {
    const firstErrorField = Object.keys(errorFields)[0];
    if (!firstErrorField || !scrollContainerRef.current) return;
    const errorInput = scrollContainerRef.current.querySelector(
      `[name="${firstErrorField}"]`,
    ) as HTMLElement;
    if (errorInput) {
      const container = scrollContainerRef.current;
      const inputRect = errorInput.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const isAbove = inputRect.top < containerRect.top;
      const isBelow = inputRect.bottom + 8 > containerRect.bottom;
      if (isAbove || isBelow) {
        const inputOffsetTop = errorInput.offsetTop;
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
  
  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    const fields = personelFormDetails(form, handleChange, t.personal);
    let coreFieldsFilled = true;
    
    fields.forEach((field) => {
      // Skip removed fields from validation
      if (
        field.name === "occupation" ||
        field.name === "emergencyContactName" ||
        field.name === "emergencyContactNumber"
      ) {
        return;
      }

      if (
        !form.isFromNarayanpur &&
        (field.name === "idType" || field.name === "govtId")
      ) {
        return;
      }
      
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
      if (field.required && (!value || value.toString().trim() === "")) {
        newErrors[field.name] =
          language === "en"
            ? `${field.label} is required`
            : `${field.label} आवश्यक है`;
        coreFieldsFilled = false;
      }
      
      if (
        !form.isInternational &&
        value &&
        field.name === "mobile"
      ) {
        if (value.toString().length !== 10) {
          newErrors[field.name] =
            language === "en"
              ? "Phone number must be 10 digits long"
              : "फोन नंबर 10 अंकों का होना चाहिए";
          coreFieldsFilled = false;
        }
      }
      
      if (
        form.isInternational &&
        value &&
        field.name === "mobile"
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
    if (!form.tShirtSize?.trim()) {
      newErrors.tShirtSize =
        language === "en"
          ? "T-shirt size is required"
          : "टी-शर्ट आकार आवश्यक है";
      coreFieldsFilled = false;
    }
    if (!form.bloodGroup?.trim()) {
      newErrors.bloodGroup =
        language === "en" ? "Blood group is required" : "रक्त समूह आवश्यक है";
      coreFieldsFilled = false;
    }
    
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
      const identificationNumber = await getUniqueIdentificationNumber();
      const raceCategory = getRaceCategory(form.city, form.gender, language);
      
      const registrationData = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        mobile: form.mobile,
        gender: form.gender,
        date_of_birth: form.dateOfBirth,
        country: form.country || "India",
        state: form.isInternational ? "International" : form.state,
        city: form.isInternational ? "International" : form.city,
        occupation: "N/A",
        race_category: raceCategory,
        t_shirt_size: form.tShirtSize,
        emergency_contact_name: "N/A",
        emergency_contact_number: "N/A",
        blood_group: form.bloodGroup || null,
        is_from_narayanpur: form.isFromNarayanpur,
        is_international: form.isInternational || false,
        needs_accommodation: form.needsAccommodation,
        identification_number: identificationNumber,
        govt_id: form.govtId || "N/A",
        payment_status: "PENDING",
        previous_marathon_name: form.previousMarathonName || null,
        previous_marathon_rank: form.previousMarathonRank || null,
      };
      
      try {
        const { error } = await supabase
          .schema("marathon")
          .from("registrations_2026")
          .insert([registrationData])
          .select("id");
        if (error) {
          console.error("Supabase insertion error:", error);
          throw error;
        }
        setIdentificationNumber(identificationNumber);
        nextStep();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
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

  const handleBeforeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowVerificationAlert(true);
  };

  // Get the race category for the alert
  const raceCategory = getRaceCategory(form.city, form.gender, language);

  return (
    <form onSubmit={handleBeforeSubmit} className="animate-fade-in">
      <AlertDialog
        open={showVerificationAlert}
        onOpenChange={setShowVerificationAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.verification_alert.title}</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>{t.verification_alert.description}</p>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm font-semibold text-purple-900">
                  {language === "en" ? "Category:" : "श्रेणी:"}{" "}
                  <span className="text-purple-700">{raceCategory}</span>
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.verification_alert.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              {t.personal.next_button}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div>
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-3 overflow-auto max-h-[350px] px-2"
        >
          {personelFormDetails(form, handleChange, t.personal).map(
            (detail, index) => {
              // Skip rendering removed fields
              if (
                detail.name === "occupation" ||
                detail.name === "emergencyContactName" ||
                detail.name === "emergencyContactNumber"
              ) {
                return null;
              }

              if (
                !form.isFromNarayanpur &&
                (detail.name === "idType" || detail.name === "govtId")
              ) {
                return null;
              }
              if (
                form.isInternational &&
                (detail.name === "pincode" ||
                  detail.name === "state" ||
                  detail.name === "city")
              ) {
                return null;
              }
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