import { cloudinary } from "../lib/cloudinary.js";

export const uploadImage = async (
  fileBuffer: Buffer,
  folder: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      })
      .end(fileBuffer);
  });
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  const splitUrl = imageUrl.split("/upload/");
  const withoutVersion = splitUrl[1].split("/").slice(1).join("/");
  const publicId = withoutVersion.split(".")[0];

  console.log("Deleting publicId:", publicId); // ← add karo

  const result = await cloudinary.uploader.destroy(publicId);
  console.log("Cloudinary delete result:", result); // ← add karo
};
