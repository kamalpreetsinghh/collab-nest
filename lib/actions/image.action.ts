"use server";

import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (
  image: string,
  type: "project" | "profile"
) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const folder = `collab-nest/${type}`;

  const response = await cloudinary.uploader.upload(image, {
    folder,
  });

  return response.secure_url;
};
