import { FormFieldType, RegistrationForm } from "@/types/form";
import { citiesByState } from "./locations/cities";
import { statesByCountry } from "./locations/states";

export const personelFormDetails = (
  form: RegistrationForm,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
): FormFieldType[] => [
  {
    label: "First Name",
    name: "firstName",
    fieldType: "text" as const,
    placeholder: "Enter your first name",
    value: form.firstName,
    handleChange: handleChange,
  },
  {
    label: "Last Name",
    name: "lastName",
    fieldType: "text" as const,
    placeholder: "Enter your last name",
    value: form.lastName,
    handleChange: handleChange,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    fieldType: "text" as const,
    placeholder: "Enter your email",
    value: form.email,
    handleChange: handleChange,
  },
  {
    label: "Mobile",
    name: "mobile",
    fieldType: "text" as const,
    placeholder: "Enter your mobile",
    value: form.mobile,
    handleChange: handleChange,
    maxLength: 10,
  },
  {
    label: "Date of Birth",
    name: "dateOfBirth",
    fieldType: "date" as const,
    placeholder: "Enter your date of birth",
    value: form.dateOfBirth,
    handleChange: handleChange,
  },
  {
    label: "Pin Code",
    name: "pincode",
    fieldType: "text" as const,
    placeholder: "Enter your pin code",
    value: form.pincode,
    disabled: form.isFromNarayanpur,
    handleChange: handleChange,
    maxLength: 6,
  },
  {
    label: "State",
    name: "state",
    fieldType: "select" as const,
    placeholder: "Select your state",
    value: form.state,
    disabled: true,
    handleChange: handleChange,
    options: statesByCountry["India"].map((state) => ({ label: state, value: state })),
  },
  {
    label: "City",
    name: "city",
    fieldType: "select" as const,
    placeholder: "Enter your city",
    value: form.city,
    disabled: true,
    handleChange: handleChange,
    options: form.state ? citiesByState[form.state].map((city) => ({ label: city, value: city })) : [{ label: "Please select your state", value: "" }],
  },
  {
    label: "Race Category",
    name: "raceCategory",
    fieldType: "select" as const,
    placeholder: "Select race category",
    value: form.raceCategory,
    handleChange: handleChange,
    options:
      form.gender === "FEMALE"
        ? [
            { label: "5KM", value: "5KM" },
            { label: "10KM", value: "10KM" },
            { label: "21KM", value: "21KM" },
          ]
        : [
            { label: "10KM", value: "10KM" },
            { label: "21KM", value: "21KM" },
          ],
  },
  {
    label: "T-Shirt Size",
    name: "tShirtSize",
    fieldType: "select" as const,
    placeholder: "Select T-shirt size",
    value: form.tShirtSize,
    handleChange: handleChange,
    options: [
      { label: "S", value: "S" },
      { label: "M", value: "M" },
      { label: "L", value: "L" },
      { label: "XL", value: "XL" },
      { label: "XXL", value: "XXL" },
    ],
  },
  {
    label: "Occupation",
    name: "occupation",
    fieldType: "select" as const,
    placeholder: "Select your occupation",
    value: form.occupation,
    handleChange: handleChange,
    options: [
      { label: "Student", value: "student" },
      { label: "Professional", value: "professional" },
      { label: "Self Employed", value: "self_employed" },
      { label: "Business Owner", value: "business_owner" },
      { label: "Government Employee", value: "government_employee" },
      { label: "Healthcare Professional", value: "healthcare_professional" },
      { label: "Teacher/Educator", value: "teacher_educator" },
      { label: "IT Professional", value: "it_professional" },
      { label: "Engineer", value: "engineer" },
      { label: "Retired", value: "retired" },
      { label: "Other", value: "other" },
    ],
  },
  {
    label: "Emergency Contact Name",
    name: "emergencyContactName",
    fieldType: "text" as const,
    placeholder: "Enter emergency contact name",
    value: form.emergencyContactName,
    handleChange: handleChange,
  },
  {
    label: "Emergency Contact Number",
    name: "emergencyContactNumber",
    fieldType: "text" as const,
    placeholder: "Enter emergency contact number",
    value: form.emergencyContactNumber,
    handleChange: handleChange,
    maxLength: 10,
  },
  {
    label: "Blood Group",
    name: "bloodGroup",
    fieldType: "select" as const,
    placeholder: "Select your blood group",
    value: form.bloodGroup,
    handleChange: handleChange,
    options: [
      { label: "A+", value: "A+" },
      { label: "A-", value: "A-" },
      { label: "B+", value: "B+" },
      { label: "B-", value: "B-" },
      { label: "AB+", value: "AB+" },
      { label: "AB-", value: "AB-" },
      { label: "O+", value: "O+" },
      { label: "O-", value: "O-" },
    ],
  },
  {
    label: "ID Type",
    name: "idType",
    placeholder: "Select ID Type",
    value: form.idType,
    handleChange: handleChange,
    fieldType: "select",
    options: [
      { label: "Aadhar Card", value: "AADHAR" },
      { label: "PAN Card", value: "PAN" },
      { label: "Voter ID", value: "VOTER" },
      { label: "Driving License", value: "DRIVING_LICENSE" },
    ],
  },
  {
    label: "ID Number",
    name: "govtId",
    placeholder: "Enter your ID number",
    value: form.govtId,
    handleChange: handleChange,
    fieldType: "text",
    maxLength: form.idType === "AADHAR" ? 12 : form.idType === "PAN" ? 10 : form.idType === "VOTER" ? 10 : form.idType === "DRIVING_LICENSE" ? 15 : undefined,
    style: { textTransform: form.idType === "AADHAR" ? "none" : "uppercase" },
  },
];
