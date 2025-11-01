import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate a random alphanumeric ID
const generateIdentificationNumber = () => {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Check if the ID exists in the database
const isIdentificationNumberUnique = async (number: string) => {
  const { data, error } = await supabase
    .schema("marathon")
    .from("registrations_2026")
    .select("id")
    .eq("identification_number", number)
    .single();

  if (error && error.code === "PGRST116") {
    // No record found, number is unique
    return true;
  }
  console.log(error);
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
