import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params; // ✅ THIS IS THE FIX

  console.log("DELETE ID:", id);

  const deleted = await Booking.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "Booking not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Booking deleted" });
}
