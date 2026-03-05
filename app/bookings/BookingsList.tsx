

// import connectDB from "@/lib/mongodb";
// import Booking from "@/database/booking.model";
// import CancelBookingButton from "@/components/CancelBookingButton";

// const BookingsList = async () => {
//   try {
//     await connectDB();

//     const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

//     if (!bookings || bookings.length === 0) {
//       return <p>No bookings found.</p>;
//     }

//     return (
//       <>
//         {bookings.map((booking: any) => (
//           <div
//             key={booking._id.toString()}
//             className="border p-4 rounded mb-4 shadow"
//           >
//             <p>
//               <strong>Email:</strong> {booking.email}
//             </p>

//             <p>
//               <strong>Event ID:</strong> {booking.eventId.toString()}
//             </p>

//             <CancelBookingButton bookingId={booking._id.toString()} />
//           </div>
//         ))}
//       </>
//     );
//   } catch (error) {
//     console.error("BOOKINGS ERROR:", error);
//     return <p>Failed to load bookings.</p>;
//   }
// };

// export default BookingsList;



import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";
import CancelBookingButton from "@/components/CancelBookingButton";

const BookingsList = async () => {
  let bookings = [];

  try {
    await connectDB();
    bookings = await Booking.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error("BOOKINGS ERROR:", error);
    return <p>Failed to load bookings.</p>;
  }

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
            <strong>Event ID:</strong> {booking.eventId?.toString()}
          </p>

          <CancelBookingButton bookingId={booking._id.toString()} />
        </div>
      ))}
    </>
  );
};

export default BookingsList;