import { create } from "zustand";

interface TeamMember {
  name: string;
  mobile: string;
  gender: "MALE" | "FEMALE";
  wantsTshirt: boolean;
  tShirtSize: "S" | "M" | "L" | "XL" | "XXL";
}

export interface TeamDetails {
  team_name: string;
  email: string;
  city: string;
  members: TeamMember[];
}

const defaultTeamDetails: TeamDetails = {
  team_name: "",
  email: "",
  city: "",
  members: Array(4).fill({
    name: "",
    mobile: "",
    gender: "MALE",
    wantsTshirt: false,
    tShirtSize: "",
  }),
};

interface TeamRegistrationStore {
  teamDetails: TeamDetails;
  setTeamDetails: (details: TeamDetails) => void;
  resetTeamDetails: () => void;
}

export const useTeamRegistrationStore = create<TeamRegistrationStore>(
  (set) => ({
    teamDetails: defaultTeamDetails,
    setTeamDetails: (details) => set({ teamDetails: details }),
    resetTeamDetails: () => set({ teamDetails: defaultTeamDetails }),
  }),
);
