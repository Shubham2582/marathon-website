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
    gender: "",
    wantsTshirt: true,
    tShirtSize: "",
  }),
};

interface TeamRegistrationStore {
  teamDetails: TeamDetails;
  setTeamDetails: (details: TeamDetails) => void;
  handleTeamChange: (name: string, value: any) => void;
  handleMemberChange: (
    memberIndex: number,
    name: string,
    value: any,
    fieldType?: string,
  ) => void;
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
    handleMemberChange: (memberIndex, name, value) =>
      set((state) => {
        const members = [...state.teamDetails.members];
        members[memberIndex] = { ...members[memberIndex], [name]: value };
        return { teamDetails: { ...state.teamDetails, members } };
      }),
    resetTeamDetails: () => set({ teamDetails: defaultTeamDetails }),
  }),
);