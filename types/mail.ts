export interface MarathonDetails {
    otp?: string;
    raceCategory?: string;
    tShirtSize?: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
}

export interface EmailUserData {
    personal_info: PersonalInfo;
    marathon_details: MarathonDetails;
    identification_number: string;
}