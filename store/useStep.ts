import { create } from "zustand";

type StepState = {
  currentStep: number;
  totalSteps: number;
  progress: number;
  nextStep: () => void;
  previousStep: () => void;
  setStep: (step: number) => void;
  setTotalSteps: (total: number) => void;
  setProgress: (progress: number) => void;
  resetStep: () => void;
};

export const useStep = create<StepState>((set) => ({
  currentStep: 1,
  totalSteps: 5,
  progress: 0,

  nextStep: () =>
    set((state) => ({
      currentStep:
        state.currentStep < state.totalSteps
          ? state.currentStep + 1
          : state.currentStep,
    })),

  previousStep: () =>
    set((state) => ({
      currentStep:
        state.currentStep > 1 ? state.currentStep - 1 : state.currentStep,
    })),

  setStep: (step) =>
    set((state) => ({
      currentStep: step >= 1 && step <= state.totalSteps ? step : 1,
    })),
  
  setTotalSteps: (total) => set({ totalSteps: total }),

  setProgress: (progress) => set({ progress }),

  resetStep: () =>
    set(() => ({
      currentStep: 1,
      progress: 0
    })),
}));

