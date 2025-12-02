import { supabase } from "./supabase";

// Define BIB number ranges for each category
const BIB_RANGES = {
  OPEN_MALE: { start: 1000, end: 1500 },
  OPEN_FEMALE: { start: 1501, end: 2000 },
  BASTAR_MALE: { start: 2100, end: 6000 },
  BASTAR_FEMALE: { start: 6001, end: 9000 },
  NARAYANPUR_MALE: { start: 11000, end: 17000 },
  NARAYANPUR_FEMALE: { start: 17001, end: 21000 },
} as const;

const BASTAR_CITIES = [
  "Jagdalpur",
  "Kondagaon",
  "Kanker",
  "Bijapur",
  "Dantewada",
].map((city) => city.toLowerCase());

type Category =
  | "OPEN_MALE"
  | "OPEN_FEMALE"
  | "BASTAR_MALE"
  | "BASTAR_FEMALE"
  | "NARAYANPUR_MALE"
  | "NARAYANPUR_FEMALE";

interface RegistrationData {
  city: string;
  gender: "MALE" | "FEMALE";
  is_from_narayanpur: boolean;
}

/**
 * Determines the category based on city, gender, and Narayanpur flag
 */
function determineCategory(data: RegistrationData): Category {
  const gender = data.gender.toUpperCase();
  const city = data.city.toLowerCase().trim();

  // Check if from Narayanpur
  if (data.is_from_narayanpur || city === "narayanpur") {
    return gender === "MALE" ? "NARAYANPUR_MALE" : "NARAYANPUR_FEMALE";
  }

  // Check if from Bastar region
  if (BASTAR_CITIES.includes(city)) {
    return gender === "MALE" ? "BASTAR_MALE" : "BASTAR_FEMALE";
  }

  // Default to Open category
  return gender === "MALE" ? "OPEN_MALE" : "OPEN_FEMALE";
}

/**
 * Gets the next available BIB number for a category
 */
async function getNextBibNumber(category: Category): Promise<number> {
  const range = BIB_RANGES[category];

  try {
    // Query the database to find the highest BIB number in this category's range
    const { data, error } = await supabase
      .schema("marathon")
      .from("registrations_2026")
      .select("bib_num")
      .gte("bib_num", range.start)
      .lte("bib_num", range.end)
      .order("bib_num", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error fetching BIB numbers:", error);
      throw error;
    }

    // If no BIB exists in this range, start from the beginning
    if (!data || data.length === 0) {
      return range.start;
    }

    const highestBib = data[0].bib_num;

    // Check if we've reached the limit
    if (highestBib >= range.end) {
      throw new Error(
        `BIB number range exhausted for category ${category}. Range: ${range.start}-${range.end}`,
      );
    }

    // Return the next number
    return highestBib + 1;
  } catch (error) {
    console.error("Error in getNextBibNumber:", error);
    throw error;
  }
}

/**
 * Generates a BIB number for a registration based on identification number
 */
export async function generateBibNumber(
  identificationNumber: string,
): Promise<number> {
  try {
    console.log("[BIB Generator] Starting for:", identificationNumber);
    
    // Fetch registration data
    const { data: registration, error: fetchError } = await supabase
      .schema("marathon")
      .from("registrations_2026")
      .select("city, gender, is_from_narayanpur, bib_num")
      .eq("identification_number", identificationNumber)
      .single();

    console.log("[BIB Generator] Registration data:", registration);

    if (fetchError || !registration) {
      console.error("[BIB Generator] Error fetching registration:", fetchError);
      throw new Error("Registration not found");
    }

    // If BIB already exists, return it
    if (registration.bib_num) {
      console.log("[BIB Generator] BIB already exists:", registration.bib_num);
      return registration.bib_num;
    }

    // Determine category
    const category = determineCategory({
      city: registration.city,
      gender: registration.gender,
      is_from_narayanpur: registration.is_from_narayanpur,
    });

    console.log("[BIB Generator] Category determined:", category);

    // Get next BIB number
    const bibNumber = await getNextBibNumber(category);

    console.log("[BIB Generator] Generated BIB:", bibNumber);

    // Update the registration with the BIB number
    console.log("[BIB Generator] Attempting to update database...");
    console.log("[BIB Generator] Update params:", { 
      bib_num: bibNumber, 
      identification_number: identificationNumber 
    });
    
    const { data: updateData, error: updateError } = await supabase
      .schema("marathon")
      .from("registrations_2026")
      .update({ bib_num: bibNumber })
      .eq("identification_number", identificationNumber)
      .select();

    console.log("[BIB Generator] Update response data:", updateData);
    console.log("[BIB Generator] Update response error:", updateError);

    if (updateError) {
      console.error("[BIB Generator] Error updating BIB number:", updateError);
      throw updateError;
    }

    if (!updateData || updateData.length === 0) {
      console.error("[BIB Generator] Update succeeded but no rows affected!");
      throw new Error("No rows updated - identification_number might not exist");
    }

    console.log("[BIB Generator] Successfully generated and saved BIB:", bibNumber);
    return bibNumber;
  } catch (error) {
    console.error("[BIB Generator] Error generating BIB number:", error);
    throw error;
  }
}

/**
 * Gets category statistics (for admin/debugging purposes)
 */
export async function getCategoryStats() {
  const stats: Record<string, { used: number; available: number }> = {};

  for (const [category, range] of Object.entries(BIB_RANGES)) {
    const { count } = await supabase
      .schema("marathon")
      .from("registrations_2026")
      .select("bib_num", { count: "exact", head: true })
      .gte("bib_num", range.start)
      .lte("bib_num", range.end);

    stats[category] = {
      used: count || 0,
      available: range.end - range.start + 1,
    };
  }

  return stats;
}
