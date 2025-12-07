export interface MarathonDetails {
  otp?: string;
  raceCategory?: string;
  tShirtSize?: string;
  teamId?: string;
  teamName?: string;
}

export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  email: string;
  teamName?: string;
}

export interface EmailUserData {
  personal_info: PersonalInfo;
  marathon_details: MarathonDetails;
  identificationNumber?: string;
  bibNumber?: string;
}
