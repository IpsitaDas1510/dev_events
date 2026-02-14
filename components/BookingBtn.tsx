'use client';

import Link from "next/link";

const BookingBtn = () => {
  return (
    <button type="button" id="booking-btn" className="mt-7 mx-auto block">
      <Link href="/bookings">
        Go to Bookings
      </Link>
    </button>
  );
}

export default BookingBtn;
