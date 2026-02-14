// import connectDB from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";
// import  Event  from "@/database/event.model";
// import { resolve } from "path";
// import { rejects } from "assert";
// // import { v2 as cloudinary } from 'cloudinary';
// import cloudinary from "@/lib/cloudinary";

// import { error } from "console";


// const response = await connectDB();

// export async function GET() {
//     try {
//         await connectDB();
//         const events = await Event.find();

//         return NextResponse.json(events);
//     } catch (error) {
//         return NextResponse.json(
//             { message: "Error fetching events" },
//             { status: 500 }
//         );
//     }
// }



// export async function POST(req: NextRequest) {
//     try {
//         await connectDB();

//         const formData = await req.formData();

//         let event;

//         try{
//             event = Object.fromEntries(formData.entries());
//         } catch (e) {
//             return NextResponse.json({message: 'Invalid JSON data format'},{status: 400})
//         }

//         const file = formData.get('image') as File;

//         if(!file) return NextResponse.json({ message: 'Image file is required' }, { status:400 })

//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);

//         console.log("Cloud:", process.env.CLOUDINARY_CLOUD_NAME);
//         console.log("Key:", process.env.CLOUDINARY_API_KEY);
//         console.log("Secret exists:", !!process.env.CLOUDINARY_API_SECRET);



//         const uploadResult = await new Promise((resolve, reject) => {
//             cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'DevEvent'}, (error, results) => {
//                 if(error) return reject(error);
                
//                 resolve(results);
//             }).end(buffer);
//         });

//         event.image = (uploadResult as {secure_url: string}).secure_url;

//         const createdEvent = await Event.create(event);

//         return NextResponse.json({message: 'Event created successfully', event: createdEvent},{status:201});

//     } catch (error: any) {
//   console.error("EVENT ERROR:", error);

//   return NextResponse.json(
//     {
//       message: "Event Creation Failed",
//       error: error?.message || "Unknown error"
//     },
//     { status: 500 }
//   );
// }

// }


// // console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// // console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
// // console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);





// export const runtime = "nodejs";

import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import cloudinary from "@/lib/cloudinary";



/* ---------------- GET EVENTS ---------------- */

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1});

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching events" },
      { status: 500 }
    );
  }
}



/* ---------------- CREATE EVENT ---------------- */

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    console.log({
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secretLength: process.env.CLOUDINARY_API_SECRET?.length
});



    const formData = await req.formData();

    const event = Object.fromEntries(formData.entries());

    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    /* ---------- Convert Image ---------- */

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    /* ---------- Upload To Cloudinary ---------- */

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "DevEvent",
    });

    event.image = uploadResult.secure_url;

    /* ---------- Save Event ---------- */

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("EVENT ERROR:", error);

    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
