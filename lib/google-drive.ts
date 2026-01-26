import { google } from "googleapis";

//
const credentialsString = process.env.GOOGLE_DRIVE_CREDENTIALS;
if (!credentialsString) {
  throw new Error("GOOGLE_DRIVE_CREDENTIALS environment variable not set.");
}

const credentials = JSON.parse(credentialsString);

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

export async function listDriveFiles(folderId: string) {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: "files(id, name, webContentLink, thumbnailLink)",
      pageSize: 100,
      orderBy: "name",
    });
    return response.data.files;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
}

export async function getDriveFileByName(folderId: string, fileName: string) {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and name contains '${fileName}' and mimeType contains 'image/'`,
      fields: "files(id, name, webContentLink, thumbnailLink)",
      pageSize: 1,
    });
    if (response.data.files && response.data.files.length > 0) {
      return response.data.files[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching file by name:", error);
    return null;
  }
}
