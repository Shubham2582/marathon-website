import { FormFieldType, RegistrationForm } from "@/types/form";
import { citiesByState } from "./locations/cities";
import { statesByCountry } from "./locations/states";

export const personelFormDetails = (
  form: RegistrationForm,
  handleChange: (name: string, value: string, type: string) => void,
  t: any,
): FormFieldType[] => [
  {
    label: t.fields.first_name,
    name: "firstName",
    fieldType: "text" as const,
    placeholder: t.fields.first_name_placeholder,
    value: form.firstName,
    handleChange: handleChange,
  },
  {
    label: t.fields.last_name,
    name: "lastName",
    fieldType: "text" as const,
    placeholder: t.fields.last_name_placeholder,
    value: form.lastName,
    handleChange: handleChange,
  },
  {
    label: t.fields.email,
    name: "email",
    type: "email",
    fieldType: "text" as const,
    placeholder: t.fields.email_placeholder,
    value: form.email,
    handleChange: handleChange,
  },
  {
    label: t.fields.mobile,
    name: "mobile",
    fieldType: "text" as const,
    placeholder: t.fields.mobile_placeholder,
    value: form.mobile,
    handleChange: handleChange,
    maxLength: 10,
  },
  {
    label: t.fields.dob,
    name: "dateOfBirth",
    fieldType: "date" as const,
    placeholder: t.fields.dob_placeholder,
    value: form.dateOfBirth,
    handleChange: handleChange,
  },
  {
    label: t.fields.pin_code,
    name: "pincode",
    fieldType: "text" as const,
    placeholder: t.fields.pin_code_placeholder,
    value: form.pincode,
    disabled: form.isFromNarayanpur,
    handleChange: handleChange,
    maxLength: 6,
  },
  {
    label: t.fields.state,
    name: "state",
    fieldType: "select" as const,
    placeholder: t.fields.state_placeholder,
    value: form.state,
    disabled: true,
    handleChange: handleChange,
    options: statesByCountry["India"].map((state) => ({
      label: state,
      value: state,
    })),
  },
  {
    label: t.fields.city,
    name: "city",
    fieldType: "select" as const,
    placeholder: t.fields.city_placeholder,
    value: form.city,
    disabled: true,
    handleChange: handleChange,
    options: form.state
      ? citiesByState[form.state].map((city) => ({ label: city, value: city }))
      : [],
  },
  {
    label: t.fields.race_category,
    name: "raceCategory",
    fieldType: "select" as const,
    placeholder: t.fields.race_category_placeholder,
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
    label: t.fields.tshirt_size,
    name: "tShirtSize",
    fieldType: "select" as const,
    placeholder: t.fields.tshirt_size_placeholder,
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
    label: t.fields.occupation,
    name: "occupation",
    fieldType: "select" as const,
    placeholder: t.fields.occupation_placeholder,
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
    label: t.fields.emergency_contact_name,
    name: "emergencyContactName",
    fieldType: "text" as const,
    placeholder: t.fields.emergency_contact_name_placeholder,
    value: form.emergencyContactName,
    handleChange: handleChange,
  },
  {
    label: t.fields.emergency_contact_number,
    name: "emergencyContactNumber",
    fieldType: "text" as const,
    placeholder: t.fields.emergency_contact_number_placeholder,
    value: form.emergencyContactNumber,
    handleChange: handleChange,
    maxLength: 10,
  },
  {
    label: t.fields.blood_group,
    name: "bloodGroup",
    fieldType: "select" as const,
    placeholder: t.fields.blood_group_placeholder,
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
    label: t.fields.id_type,
    name: "idType",
    placeholder: t.fields.id_type_placeholder,
    value: form.idType,
    handleChange: handleChange,
    fieldType: "select",
    options: [
      { label: t.fields.id_type_options.aadhar, value: "AADHAR" },
      { label: t.fields.id_type_options.pan, value: "PAN" },
      { label: t.fields.id_type_options.voter, value: "VOTER" },
      {
        label: t.fields.id_type_options.driving_license,
        value: "DRIVING_LICENSE",
      },
    ],
  },
  {
    label: t.fields.id_number,
    name: "govtId",
    placeholder: t.fields.id_number_placeholder,
    value: form.govtId,
    handleChange: handleChange,
    fieldType: "text",
    maxLength:
      form.idType === "AADHAR"
        ? 12
        : form.idType === "PAN"
          ? 10
          : form.idType === "VOTER"
            ? 10
            : form.idType === "DRIVING_LICENSE"
              ? 15
              : undefined,
    style: { textTransform: form.idType === "AADHAR" ? "none" : "uppercase" },
  },
];
