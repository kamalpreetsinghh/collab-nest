import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const POST = async (request: NextRequest) => {
  const { image } = await request.json();

  if (!image) {
    NextResponse.json({ message: "Image is required" }, { status: 400 });
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      quality: "auto:eco",
    };

    const result = await cloudinary.uploader.upload(image, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to upload image on Cloudinary" },
      { status: 500 }
    );
  }
};
