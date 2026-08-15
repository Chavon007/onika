import apiClient from "./axios";

interface CloudinarySignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

const getCloudinarySignature = async (
  folder: string,
): Promise<CloudinarySignature> => {
  return apiClient.get(`/cloudinary/signature?folder=${folder}`);
};

const uploadToCloudinary = async (
  file: File,
  folder: string,
): Promise<string> => {
  const {
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder: signedFolder,
  } = await getCloudinarySignature(folder);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("folder", signedFolder);
  formData.append("signature", signature);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url as string;
};

export default uploadToCloudinary;
