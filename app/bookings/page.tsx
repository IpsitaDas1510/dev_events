import { Suspense } from "react";
import BookingsList from "./BookingsList";

export default function BookingsPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <Suspense fallback={<p>Loading bookings...</p>}>
        <BookingsList />
      </Suspense>
    </div>
  );
}
