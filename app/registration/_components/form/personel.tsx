"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { BambooFrame } from "@/components/ui/bamboo-frame";
import { useRegistrationStore } from "@/store/useRegistration";
import { RenderField } from "../render-field";
import { occupations } from "@/data/occupations";
import { fetchAddressFromPincode } from "@/services/pincodeService";
import { toast } from "react-hot-toast";
import { getCountries } from "@/data/locations";
import { validateName } from "@/utils/validation";
import { validatePostalCode, getPostalCodeFormat } from "@/utils/postalCodes";
import { bloodGroups } from "@/data/bloodGroups";

interface PersonalInformationFormProps {
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ prevStep, handleSubmit }) => {
  const { form: formData, handleChange, setForm } = useRegistrationStore();
  const [isLoading, setIsLoading] = useState(false);

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleChange(e);
    const pincode = e.target.value;

    if (!pincode) {
      setForm("state", "");
      setForm("city", "");
      return;
    }

    if (formData.country === "India" && pincode.length === 6) {
      setIsLoading(true);
      try {
        const addressData = await fetchAddressFromPincode(pincode);
        if (addressData) {
          setForm("state", addressData.State);
          setForm("city", addressData.District);
          toast.success("Address details fetched successfully!");
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch address");
        setForm("state", "");
        setForm("city", "");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getRaceCategories = (gender: "MALE" | "FEMALE") => {
    return gender === "MALE" ? ["10km", "21km"] : ["5km", "10km", "21km"];
  };

  return (
    <BambooFrame>
      <form onSubmit={handleSubmit} className="pb-5">
        <div className="grid grid-cols-2 gap-y-2 md:gap-x-20 gap-x-4">
          <RenderField
            label="First Name / पहला नाम"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            validateInput={validateName}
            errorMessage="Please enter a valid name (letters only)"
          />
          <RenderField
            label="Last Name / अंतिम नाम"
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            validateInput={validateName}
            errorMessage="Please enter a valid name (letters only)"
          />

          <RenderField label="Date of Birth / जन्म तिथि" name="dateOfBirth" type="date" placeholder="" />
          <RenderField label="Country / देश" name="country" type="select" placeholder="Select Country" options={getCountries()} />
          <RenderField
            label="Postal Code / डाक कोड"
            name="pincode"
            type="text"
            placeholder={`Enter your ${formData.country === "India" ? "pincode" : "postal code"}`}
            validateInput={(value) => validatePostalCode(value, formData.country)}
            errorMessage={`Please enter a valid ${formData.country === "India" ? "pincode" : "postal code"} (${getPostalCodeFormat(formData.country)})`}
            onChange={handlePincodeChange}
          />
          <RenderField
            label="State / राज्य"
            name="state"
            type="text"
            placeholder="Enter pincode to auto-fill"
            disabled={isLoading}
            errorMessage="Please enter pincode first"
            required={true}
          />
          <RenderField
            label="City / शहर"
            name="city"
            type="text"
            placeholder="Enter pincode to auto-fill"
            disabled={true}
            errorMessage="Please enter pincode first"
            required={true}
          />
          <RenderField
            label="Race Category / दौड़ श्रेणी"
            name="raceCategory"
            type="select"
            placeholder="Select Category"
            options={formData.gender ? getRaceCategories(formData.gender) : []}
            disabled={!formData.gender}
          />
          <RenderField
            label="T-Shirt Size / टी-शर्ट का आकार"
            name="tShirtSize"
            type="select"
            placeholder="Select Size"
            options={["S", "M", "L", "XL", "XXL"]}
          />
          <RenderField label="Occupation / पेशा" name="occupation" type="select" placeholder="Select Occupation" options={occupations} />
          <RenderField
            label="Emergency Contact Number / आपातकालीन संपर्क नंबर"
            name="emergencyContactNumber"
            type="tel"
            placeholder="Enter emergency contact number"
            validateInput={validateMobile}
            errorMessage="Please enter a valid mobile number"
          />

          <RenderField
            label="Emergency Contact Name / आपातकालीन संपर्क नाम"
            name="emergencyContactName"
            type="text"
            placeholder="Enter emergency contact name"
            validateInput={validateName}
            errorMessage="Please enter a valid name"
          />
          <RenderField label="Blood Group / रक्त समूह" name="bloodGroup" type="select" placeholder="Select Blood Group" options={bloodGroups} />

          {!formData.isFromBastar && (
            <div className="mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.needsAccommodation}
                  onChange={(e) => setForm("needsAccommodation", e.target.checked)}
                  className="rounded text-[#4CAF50] focus:ring-[#4CAF50]"
                />
                <span className="text-white text-sm">Do you need accommodation? / क्या आपको ठहरने की व्यवस्था चाहिए?</span>
              </label>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="md:px-6 md:py-2 px-4 py-1 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button type="submit" className="md:px-6 md:py-2 px-4 py-1 bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors">
            Complete Registration
          </button>
        </div>
      </form>
    </BambooFrame>
  );
};

export default PersonalInformationForm;
