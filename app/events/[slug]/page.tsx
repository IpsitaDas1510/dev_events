import {Suspense} from "react";
import EventDetails from "@/components/EventDetails";

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
    const slug = params.then((p) => p.slug);

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <EventDetails params={slug} />
            </Suspense>
        </main>
    )
}
export default EventDetailsPage


// import EventDetails from "@/components/EventDetails";

// const EventDetailsPage = async ({ params }: { params: { slug: string } }) => {
//   const { slug } = params;

//   return (
//     <main>
//       <EventDetails slug={slug} />
//     </main>
//   );
// };

// export default EventDetailsPage;

