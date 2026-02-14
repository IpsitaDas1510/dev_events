import CancelBookingButton from "@/components/CancelBookingButton";

const BookingsList = async () => {
  const res = await fetch("http://localhost:3000/api/bookings", {
    cache: "no-store",
  });

  const bookings = await res.json();

  if (bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <>
      {bookings.map((booking: any) => (
        <div
          key={booking._id.toString()}
          className="border p-4 rounded mb-4 shadow"
        >
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Event ID:</strong> {booking.eventId}</p>

          <CancelBookingButton bookingId={booking._id} />
        </div>
      ))}
    </>
  );
};

export default BookingsList;
