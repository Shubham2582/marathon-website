import { google } from 'googleapis'

const API_KEY = 'AIzaSyBfln3MbHZnBv8wL7BNf1_hNTakXfT8S38'

const drive = google.drive({ 
  version: 'v3', 
  auth: API_KEY 
})

export async function listDriveFiles(folderId: string) {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, webContentLink, thumbnailLink)',
      pageSize: 100,
      orderBy: 'name',
    })
    return response.data.files
  } catch (error) {
    console.error('Error fetching files:', error)
    return []
  }
}