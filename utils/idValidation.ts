export const validateIdNumber = (idType: string, govtId: string, language: string): string => {
  idType = idType.trim().toUpperCase();
  govtId = govtId.trim().toUpperCase();

  if (!govtId) return language === "en" ? "ID number is required" : "पहचान संख्या आवश्यक है";

  const validations: Record<string, { regex: RegExp; message: string }> = {
    AADHAR: {
      regex: /^\d{12}$/,
      message: language === "en" ? "Aadhar number must be 12 digits" : "आधार संख्या 12 अंकों का होना चाहिए",
    },
    PAN: {
      // Updated PAN regex to handle the format better
      regex: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
      message: language === "en" ? "Invalid PAN format (e.g., ABCDE1234F)" : "अमान्य पैन स्वरूप (उदाहरण के लिए, ABCDE1234F)",
    },
    VOTER: {
      regex: /^[A-Z]{3}[0-9]{7}$/,
      message: language === "en" ? "Invalid Voter ID format (e.g., ABC1234567)" : "अमान्य वोटर आईडी स्वरूप (उदाहरण के लिए, ABC1234567)",
    },
    DRIVING_LICENSE: {
      regex: /^([A-Z]{2}[0-9]{2}[ -]?((19|20)[0-9]{2})[0-9]{7})$/,
      message: language === "en" ? "Invalid Driving License format" : "अमान्य ड्राइविंग लाइसेंस स्वरूप",
    },
  };

  const validation = validations[idType];
  if (!validation) return language === "en" ? "Please select a valid ID type" : "कृपया एक वैध पहचान प्रकार चुनें";

  if (!validation.regex.test(govtId)) return validation.message;

  return "";
};
