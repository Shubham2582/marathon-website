import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key exists:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Debug table structure
supabase
  .from("registrations")
  .select("*")
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error("Table structure error:", error);
    } else {
      console.log("Available columns:", Object.keys(data?.[0] || {}));
    }
  });

// Test the connection and table access
(async () => {
  console.log("Testing Supabase connection...");
  try {
    const { error, count } = await supabase.from("registrations").select("*", { count: "exact", head: true });

    if (error) {
      console.error("Supabase connection test failed:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
    } else {
      console.log("Supabase connection test successful");
      console.log("Table count:", count);
    }
  } catch (err) {
    console.error("Unexpected error during Supabase connection test:", err);
  }
})();

  // Generate a random alphanumeric ID
  const generateIdentificationNumber = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Check if the ID exists in the database
  const isIdentificationNumberUnique = async (number: string) => {
    const { data, error } = await supabase
      .from("registrations")
      .select("id")
      .eq("identification_number", number)
      .single();
    
    if (error && error.code === "PGRST116") {
      // No record found, number is unique
      return true;
    }
    return false;
  };

  // Get a unique identification number
  export const getUniqueIdentificationNumber = async () => {
    let number = generateIdentificationNumber();
    while (!(await isIdentificationNumberUnique(number))) {
      number = generateIdentificationNumber();
    }
    return number;
  };
