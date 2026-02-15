// 'use client';

// import Link from "next/link";

// const BookingBtn = () => {
//   return (
//     <button type="button" id="booking-btn" className="mt-7 mx-auto block">
//       <Link href="/bookings">
//         Go to Bookings
//       </Link>
//     </button>
//   );
// }



// "use client";

// import Image from "next/image";

// const BookingBtn = () => {
//   // Ensure we only render client-side for smooth hydration
//   return (
//     <div className="flex justify-center mt-7">
//       <a
//         href="/bookings" // changed from #booking to actual page route
//         className="
//           inline-flex items-center gap-2 px-6 py-3
//           bg-white/20 backdrop-blur-md border border-white/30
//           text-white font-medium rounded-lg shadow-lg
//           hover:bg-white/30 transition-colors duration-300
//         "
//       >
//         Go to Booking
//         <Image
//           src="/icons/arrow-down.svg"
//           alt="arrow-down"
//           width={24}
//           height={24}
//           priority // helps with hydration of images
//         />
//       </a>
//     </div>
//   );
// };

// export default BookingBtn;



"use client";

import Image from "next/image";

const BookingBtn = () => {
  return (
    <div className="flex justify-center mt-7">
      <a
        href="/bookings"
        className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium rounded-lg shadow-lg hover:bg-white/30 transition-colors duration-300"
      >
        Go to Booking
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
          unoptimized
          priority
        />
      </a>
    </div>
  );
};

export default BookingBtn;
