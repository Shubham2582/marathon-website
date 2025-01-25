export const validateIdNumber = (idType: string, idNumber: string): string => {
  if (!idNumber) return "ID number is required";

  switch (idType) {
    case "AADHAR":
      if (!/^\d{12}$/.test(idNumber)) {
        return "Aadhar number must be 12 digits";
      }
      break;

    case "PAN":
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(idNumber)) {
        return "Invalid PAN format (e.g., ABCDE1234F)";
      }
      break;

    case "VOTER":
      if (!/^[A-Z]{3}[0-9]{7}$/.test(idNumber)) {
        return "Invalid Voter ID format (e.g., ABC1234567)";
      }
      break;

    case "DRIVING_LICENSE":
      if (!/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/.test(idNumber)) {
        return "Invalid Driving License format";
      }
      break;

    default:
      return "Please select an ID type";
  }

  return "";
};
