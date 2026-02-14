"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CancelBookingButton = ({ bookingId }: { bookingId: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setLoading(true);

    console.log("Deleting booking ID:", bookingId);


    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh(); // better than reload
    } else {
      alert("Failed to cancel booking");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
};

export default CancelBookingButton;
