import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";
import { NextResponse } from "next/server";

/* -------- GET ALL BOOKINGS -------- */
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}

/* -------- CREATE BOOKING -------- */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const booking = await Booking.create(body);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Booking failed" },
      { status: 500 }
    );
  }
}
