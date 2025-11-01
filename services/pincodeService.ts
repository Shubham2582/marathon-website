export interface PincodeData {
  State: string;
  District: string;
  Country: string;
}

interface PostOffice {
  State: string;
  District: string;
  Country: string;
  Pincode: string;
}

interface PincodeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

export const fetchAddressFromPincode = async (
  pincode: string,
): Promise<PincodeData> => {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
    );
    const data: PincodeResponse[] = await response.json();

    if (
      data[0].Status === "Success" &&
      data[0].PostOffice &&
      data[0].PostOffice.length > 0
    ) {
      const postOffice = data[0].PostOffice[0];
      return {
        State: postOffice.State,
        District: postOffice.District,
        Country: postOffice.Country,
      };
    }
    throw new Error("Invalid pincode or no data found");
  } catch (error) {
    throw new Error(
      "Failed to fetch address details. Please check your pincode.",
    );
  }
};

export const getPincodeFromCityAndState = async (
  city: string,
  state: string,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/postoffice/${city}`,
    );
    const data: PincodeResponse[] = await response.json();

    if (
      data[0].Status === "Success" &&
      data[0].PostOffice &&
      data[0].PostOffice.length > 0
    ) {
      const postOffice = data[0].PostOffice.find((po) => po.State === state);
      if (postOffice && postOffice.Pincode) {
        return postOffice.Pincode;
      }
      return data[0].PostOffice[0].Pincode;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch pincode from city and state:", error);
    return null;
  }
};
