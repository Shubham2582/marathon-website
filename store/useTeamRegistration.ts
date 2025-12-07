import { create } from "zustand";

export interface TeamMember {
  name: string;
  mobile: string;
  gender: "MALE" | "FEMALE";
  wantsTshirt: boolean;
  tShirtSize: "S" | "M" | "L" | "XL" | "XXL" | "";
}

export interface TeamDetails {
  team_name: string;
  email: string;
  mobile: string;
  wants_tshirt: boolean;
}

const defaultTeamDetails: TeamDetails = {
  team_name: "",
  email: "",
  mobile: "",
  wants_tshirt: false,
};

interface TeamRegistrationStore {
  teamDetails: TeamDetails;
  setTeamDetails: (details: TeamDetails) => void;
  handleTeamChange: (name: string, value: any, fieldType?: string) => void;
  resetTeamDetails: () => void;
}

export const useTeamRegistrationStore = create<TeamRegistrationStore>(
  (set) => ({
    teamDetails: defaultTeamDetails,
    setTeamDetails: (details) => set({ teamDetails: details }),
    handleTeamChange: (name, value, fieldType) =>
      set((state) => ({
        teamDetails: { ...state.teamDetails, [name]: value },
      })),
    resetTeamDetails: () => set({ teamDetails: defaultTeamDetails }),
  }),
);
