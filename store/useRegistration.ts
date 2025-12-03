import { RegistrationForm } from "@/types/form";
import { create } from "zustand";

const defaultFormState: RegistrationForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  gender: "MALE",
  dateOfBirth: "",
  country: "",
  pincode: "",
  state: "",
  city: "",
  occupation: "",
  raceCategory: "",
  tShirtSize: "",
  emergencyContactNumber: "",
  emergencyContactName: "",
  bloodGroup: "",
  selfie: null,
  isFromNarayanpur: false,
  isInternational: false,
  needsAccommodation: false,
  idType: "AADHAR",
  govtId: "",
  isRunner: false,
  previousMarathonName: "",
  previousMarathonRank: "",
};

interface RegistrationStore {
  form: RegistrationForm;
  pastRecords: Partial<RegistrationForm>[];
  identificationNumber: string | null;
  setIdentificationNumber: (id: string) => void;
  setForm: <K extends keyof RegistrationForm>(
    field: K,
    value: RegistrationForm[K] | File,
  ) => void;
  setPastRecords: (records: Partial<RegistrationForm>[]) => void;
  resetForm: () => void;
  handleChange: (name: string, value: string, type: string) => void;
}

export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
  form: defaultFormState,
  pastRecords: [],
  identificationNumber: null,

  setIdentificationNumber: (id) => set({ identificationNumber: id }),

  setForm: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),

  setPastRecords: (records) => set({ pastRecords: records }),

  resetForm: () => set({ form: defaultFormState, pastRecords: [] }),

  handleChange: (name, value, type) => {
    const form = get().form;

    if (
      name === "mobile" ||
      name === "emergencyContactNumber" ||
      name === "pincode" ||
      name === "otp"
    ) {
      if (value === "") {
        set((state) => ({
          form: {
            ...state.form,
            [name]: "",
          },
        }));
        return;
      }

      // For international participants, allow any length for phone numbers
      // Only validate that it's numeric
      if (
        (name === "mobile" || name === "emergencyContactNumber") &&
        form.isInternational
      ) {
        if (!/^\d*$/.test(value)) return;
      }
      // For non-international participants or other fields, enforce existing rules
      else {
        if (!/^\d*$/.test(value)) return;

        // Enforce 10-digit limit only for Indian phone numbers
        if (
          (name === "mobile" || name === "emergencyContactNumber") &&
          value.length > 10 &&
          !form.isInternational
        ) {
          return;
        }
      }

      set((state) => ({
        form: {
          ...state.form,
          [name]: value,
        },
      }));
      return;
    }

    if (name === "emergencyContactName") {
      if (!/^[a-zA-Z ]*$/.test(value)) return;
    }

    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    }));
  },
}));
