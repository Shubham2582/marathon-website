import { listDriveFiles } from "@/lib/google-drive";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get("folderId");

  if (!folderId) {
    return NextResponse.json(
      { error: "Folder ID is required" },
      { status: 400 },
    );
  }

  const files = await listDriveFiles(folderId);
  return NextResponse.json({ files });
}
