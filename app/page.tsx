// import React from 'react'
// import ExploreBtn from "@/components/ExploreBtn";
// import { title } from 'process';
// import EventCard from '@/components/EventCard';
// import { events } from '@/lib/constants';
// import { IEvent } from '@/database';


// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const page = async () => {
//   // const response = await fetch(`${BASE_URL}/api/events`);
//   // const { events } = await response.json();

//   const response = await fetch(`${BASE_URL}/api/events`);
//   const events = await response.json();


//   return (
//     <section>
//       <h1 className="text-center">The Hub for Every Dev <br/>Event You Can't Miss</h1>
//       <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

//       <ExploreBtn />

//       <div className="mt20 space-y-7">
//         <h3>Featured Events</h3>

//         <ul className="events">
//           {events && events.length > 0 && events.map((event:IEvent ) =>(
//             <ul key={event.title}>
//               <EventCard {...event}/>
//             </ul>
            
//           ))}
//         </ul>

//       </div>

//     </section>
//   )
// }

// export default page




// import React from "react";
// import ExploreBtn from "@/components/ExploreBtn";
// import EventCard from "@/components/EventCard";
// import { IEvent } from "@/database";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const Page = async () => {
//   const response = await fetch(`${BASE_URL}/api/events`, {
//     next: { revalidate: 3600 },
//   });

//   const events = await response.json();

//   return (
//     <section>
//       <h1 className="text-center">
//         The Hub for Every Dev <br />
//         Event You Can't Miss
//       </h1>

//       <p className="text-center mt-5">
//         Hackathons, Meetups, and Conferences, All in One Place
//       </p>

//       <ExploreBtn />

//       <div className="mt20 space-y-7">
//         <h3>Featured Events</h3>

//         <ul className="events">
//           {events?.length > 0 &&
//             events.map((event: IEvent) => (
//               <ul key={event.title}>
//                 <EventCard {...event} />
//               </ul>
//             ))}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default Page;






// import React from "react";
// import ExploreBtn from "@/components/ExploreBtn";
// import EventCard from "@/components/EventCard";
// import { IEvent } from "@/database";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const Page = async () => {
//   const response = await fetch(`${BASE_URL}/api/events`, {
//     cache: "force-cache", // always fetch fresh data
//   });

//   const data = await response.json();

//   // 👇 IMPORTANT FIX
//   const events: IEvent[] = data.events || data;

//   return (
//     <section>
//       <h1 className="text-center">
//         The Hub for Every Dev <br />
//         Event You Can't Miss
//       </h1>

//       <p className="text-center mt-5">
//         Hackathons, Meetups, and Conferences, All in One Place
//       </p>

//       <ExploreBtn />

//       <div className="mt20 space-y-7">
//         <h3>Featured Events</h3>

//         <ul className="events">
//           {events.length === 0 && <p>No events found.</p>}

//           {events.map((event: IEvent) => (
//             <li key = {event._id.toString()}>
//               <EventCard {...event} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default Page;



// "use client";

// import React, { useEffect, useState } from "react";
// import ExploreBtn from "@/components/ExploreBtn";
// import EventCard from "@/components/EventCard";
// import { IEvent } from "@/database";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export default function Page() {
//   const [events, setEvents] = useState<IEvent[]>([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/events`);
//         const data = await res.json();
//         const eventsData: IEvent[] = data.events || data;

//         const parsedEvents = eventsData.map(event => ({
//           ...event,
//           agenda: event.agenda?.map(a => JSON.parse(a)).flat() || [],
//           tags: event.tags?.map(t => JSON.parse(t)).flat() || [],
//         }));

//         setEvents(parsedEvents);
//       } catch (err) {
//         console.error("Error fetching events:", err);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <section>
//       <h1 className="text-center">
//         The Hub for Every Dev <br />
//         Event You Can't Miss
//       </h1>

//       <p className="text-center mt-5">
//         Hackathons, Meetups, and Conferences, All in One Place
//       </p>

//       <ExploreBtn />

//       <div className="mt20 space-y-7">
//         <h3>Featured Events</h3>

//         <ul className="events">
//           {events.length === 0 && <p>No events found.</p>}

//           {events.map(event => (
//             <ul key={event._id.toString()}>
//               <EventCard {...event} />
//             </ul>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import ExploreBtn from "@/components/ExploreBtn";
import BookingBtn from "@/components/BookingBtn";
import EventCard from "@/components/EventCard";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface FetchedEvent {
  _id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  organizer: string;
  agenda: string[]; // parsed array
  tags: string[];   // parsed array
}

export default function Page() {
  const [events, setEvents] = useState<FetchedEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const res = await fetch(`${BASE_URL}/api/events`);
        const res = await fetch("/api/events");
        const data = await res.json();
        const eventsData: FetchedEvent[] = data.events || data;

        const parsedEvents = eventsData.map(event => ({
          ...event,
          agenda: event.agenda?.map(a => JSON.parse(a)).flat() || [],
          tags: event.tags?.map(t => JSON.parse(t)).flat() || [],
        }));

        setEvents(parsedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br />
        Event You Can't Miss
      </h1>

      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

  <ExploreBtn />
  {/* <BookingBtn /> */}



      <div className="mt20 space-y-7">
        <h3>Featured Events</h3>

        {events.length === 0 && <p>No events found.</p>}

        <ul className="events list-none">
          {events.map(event => (
            <li key={event._id}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


