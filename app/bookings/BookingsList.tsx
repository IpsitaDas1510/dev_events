// import CancelBookingButton from "@/components/CancelBookingButton";

// const BookingsList = async () => {
//   const res = await fetch("NEXT_PUBLIC_BASE/api/bookings", {
//     cache: "no-store",
//   });

//   const bookings = await res.json();

//   if (bookings.length === 0) {
//     return <p>No bookings found.</p>;
//   }

//   return (
//     <>
//       {bookings.map((booking: any) => (
//         <div
//           key={booking._id.toString()}
//           className="border p-4 rounded mb-4 shadow"
//         >
//           <p><strong>Email:</strong> {booking.email}</p>
//           <p><strong>Event ID:</strong> {booking.eventId}</p>

//           <CancelBookingButton bookingId={booking._id} />
//         </div>
//       ))}
//     </>
//   );
// };

// export default BookingsList;




// import CancelBookingButton from "@/components/CancelBookingButton";

// const BookingsList = async () => {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // fallback for dev

//   const res = await fetch(`${baseUrl}/api/bookings`, {
//     cache: "no-store",
//   });

//   const bookings = await res.json();

//   if (bookings.length === 0) {
//     return <p>No bookings found.</p>;
//   }

//   return (
//     <>
//       {bookings.map((booking: any) => (
//         <div
//           key={booking._id.toString()}
//           className="border p-4 rounded mb-4 shadow"
//         >
//           <p><strong>Email:</strong> {booking.email}</p>
//           <p><strong>Event ID:</strong> {booking.eventId}</p>

//           <CancelBookingButton bookingId={booking._id} />
//         </div>
//       ))}
//     </>
//   );
// };

// export default BookingsList;



import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";
import CancelBookingButton from "@/components/CancelBookingButton";

const BookingsList = async () => {
  try {
    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 });

    if (!bookings || bookings.length === 0) {
      return <p>No bookings found.</p>;
    }

    return (
      <>
        {bookings.map((booking: any) => (
          <div
            key={booking._id.toString()}
            className="border p-4 rounded mb-4 shadow"
          >
            <p>
              <strong>Email:</strong> {booking.email}
            </p>

            <p>
              <strong>Event ID:</strong> {booking.eventId}
            </p>

            <CancelBookingButton bookingId={booking._id.toString()} />
          </div>
        ))}
      </>
    );
  } catch (error) {
    console.error("BOOKINGS ERROR:", error);
    return <p>Failed to load bookings.</p>;
  }
};

export default BookingsList;
