// import Link from "next/link";
// import Image from "next/image";

// interface Props {
//     image: string;
//     title: string;
//     slug: string;
//     location: string;
//     date: string;
//     time: string;
// }

// const EventCard = ({title,image,slug,location,date,time}: Props) => {
//   return (
//     <Link href={`/events`} id="event-card">
//         <Image src={image} alt={title} width={410} height={300} className="poster"></Image>
        
//         <div className="flex flex-row gap-2">
//             <Image src="/icons/pin.svg" alt="location" width={14} height={14}/>
//             <p>{location}</p>
//         </div>

//         <p className="title">{title}</p>

//         <div className="datetime">
//             <div>
//                 <Image src="/icons/calendar.svg" alt="date" width={14} height={14}/>
//                 <p>{date}</p>
//             </div>
//             <div>
//                 <Image src="/icons/clock.svg" alt="time" width={14} height={14}/>
//                 <p>{time}</p>
//             </div>
//         </div>
//     </Link>
//   )
// }

// export default EventCard









import Link from "next/link";
import Image from "next/image";

interface Props {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card" className="block">

      {/* Poster Image */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mt-3">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p className="text-sm text-gray-600">{location}</p>
      </div>

      {/* Title */}
      <p className="mt-2 text-lg font-semibold">{title}</p>

      {/* Date & Time */}
      <div className="flex gap-4 mt-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
          <p>{date}</p>
        </div>

        <div className="flex items-center gap-1">
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>

    </Link>
  );
};

export default EventCard;
