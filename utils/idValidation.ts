export const validateIdNumber = (idType: string, govtId: string): string => {
  idType = idType.trim().toUpperCase();
  console.log(govtId)
  govtId = govtId.trim().toUpperCase();

  if (!govtId) return "ID number is required";

  const validations: Record<string, { regex: RegExp; message: string }> = {
    AADHAR: {
      regex: /^\d{12}$/,
      message: "Aadhar number must be 12 digits",
    },
    PAN: {
      // Updated PAN regex to handle the format better
      regex: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      message: "Invalid PAN format (e.g., ABCDE1234F)",
    },
    VOTER: {
      regex: /^[A-Z]{3}[0-9]{7}$/,
      message: "Invalid Voter ID format (e.g., ABC1234567)",
    },
    DRIVING_LICENSE: {
      regex: /^([A-Z]{2}[0-9]{2}[ -]?((19|20)[0-9]{2})[0-9]{7})$/,
      message: "Invalid Driving License format",
    },
  };

  const validation = validations[idType];
  if (!validation) return "Please select a valid ID type";

  if (!validation.regex.test(govtId)) return validation.message;

  return "";
};
