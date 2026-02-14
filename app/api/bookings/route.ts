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

/* -------- DELETE BOOKING -------- */
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Booking ID required" },
        { status: 400 }
      );
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Booking cancelled successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
