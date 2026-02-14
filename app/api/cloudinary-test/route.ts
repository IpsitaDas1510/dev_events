export const runtime = "nodejs";

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    console.log("Cloud:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("Key:", process.env.CLOUDINARY_API_KEY);
    console.log("Secret exists:", !!process.env.CLOUDINARY_API_SECRET);

    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    );

    return NextResponse.json({
      message: "Upload successful",
      url: result.secure_url,
    });

  } catch (error: any) {
    console.error("TEST ERROR:", error);

    return NextResponse.json(
      {
        message: "Cloudinary test failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
