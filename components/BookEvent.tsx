// "use client";

// import { useState } from "react";
// import { createBooking } from "@/lib/actions/booking.actions";

// const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email) return;

//     setLoading(true);

//     try {
//       const { success } = await createBooking({ eventId, slug, email });

//       if (success) {
//         setSubmitted(true);
//       } else {
//         console.error("Booking creation failed");
//       }
//     } catch (error) {
//       console.error("Something went wrong:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div id="book-event">
//       {submitted ? (
//         <p className="text-sm text-green-500">Thank you for signing up!</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div>
//             <label htmlFor="email" className="block text-sm mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               id="email"
//               required
//               placeholder="Enter your email address"
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="button-submit disabled:opacity-50"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default BookEvent;

"use client";

import { useState } from "react";

interface BookEventProps {
  eventId: string;
  slug: string;
}

const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, slug, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Booking failed. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Booking failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="book-event" className="max-w-md mx-auto p-4">
      {submitted ? (
        <p className="text-sm text-green-500">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Book Event"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
