import axios from "axios";

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB chunks
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`;

interface UploadResponse {
  secure_url: string;
  public_id: string;
}

async function uploadChunk(
  chunk: Blob,
  fileName: string,
  chunkNumber: number,
  totalChunks: number
) {
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
  );
  formData.append("chunk", chunkNumber.toString());
  formData.append("total_chunks", totalChunks.toString());
  formData.append("public_id", `3d-models/${fileName}`);

  try {
    const response = await axios.post<UploadResponse>(
      CLOUDINARY_UPLOAD_URL,
      formData
    );
    return response.data;
  } catch (error) {
    console.error(`Error uploading chunk ${chunkNumber}:`, error);
    throw error;
  }
}

export async function uploadModelToCloudinary(file: File): Promise<string> {
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  let uploadedUrl = "";

  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);

    try {
      const response = await uploadChunk(chunk, file.name, i, totalChunks);
      if (i === totalChunks - 1) {
        uploadedUrl = response.secure_url;
      }
      console.log(`Uploaded chunk ${i + 1}/${totalChunks} of ${file.name}`);
    } catch (error) {
      throw new Error(`Failed to upload ${file.name}: ${error}`);
    }
  }

  return uploadedUrl;
}

export async function uploadAllModels(
  modelFiles: File[]
): Promise<Record<string, string>> {
  const modelUrls: Record<string, string> = {};
  const results: string[] = [];

  for (const file of modelFiles) {
    try {
      console.log(`Starting upload of ${file.name}...`);
      const url = await uploadModelToCloudinary(file);
      modelUrls[file.name] = url;
      results.push(`${file.name}: ${url}`);
      console.log(`Successfully uploaded ${file.name}`);
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
    }
  }

  // Save URLs to a file
  const urlsText = results.join("\n");
  const blob = new Blob([urlsText], { type: "text/plain" });
  const downloadUrl = URL.createObjectURL(blob);

  // Create and trigger download
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "model-urls.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);

  return modelUrls;
}
