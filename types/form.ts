import { BloodGroup } from "@/data/bloodGroups";

export interface FormFieldType extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  fieldDataType?: "text" | "numeric";
  fieldType?: "text" | "date" | "select" | "textarea";
  options?: { label: string; value: string }[];
  error?: string;
}

export interface RegistrationForm {
  // --- PERSONEL INFORMATION ---
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: "MALE" | "FEMALE";
  dateOfBirth: string;
  country: string;
  pincode: string;
  state: string;
  city: string;
  occupation: string;
  bloodGroup: BloodGroup | "";

  selfie: File | null;
  idType: "AADHAR" | "PAN" | "VOTER" | "DRIVING_LICENSE" | "";
  govtId: string;

  // --- REGISTRATION DETAILS ---
  isFromNarayanpur: boolean;
  isInternational: boolean; // Add international flag
  needsAccommodation: boolean;
  isRunner: boolean;
  previousMarathonName?: string;
  previousMarathonRank?: string;

  // --- MARATHON DETAILS ---
  raceCategory: string;
  tShirtSize: string;
  emergencyContactNumber: string;
  emergencyContactName: string;
}
