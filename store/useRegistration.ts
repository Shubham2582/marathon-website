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
  needsAccommodation: false,
};

interface RegistrationStore {
  form: RegistrationForm;
  setForm: <K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K] | File) => void;
  resetForm: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  form: defaultFormState,

  setForm: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),
  resetForm: () => set({ form: defaultFormState }),

  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "mobile" || name === "emergencyContactNumber" || name === "pincode") {
      if (value === "") {
        set((state) => ({
          form: {
            ...state.form,
            [name]: "",
          },
        }));
        return;
      }
      if (!/^\d*$/.test(value)) return;

      set((state) => ({
        form: {
          ...state.form,
          [name]: value,
        },
      }));
      return;
    }

    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    }));
  },
}));
