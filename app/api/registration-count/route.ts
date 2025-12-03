import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const { count, error } = await supabase
    .schema("marathon")
    .from("registrations_2026")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count });
}
