"use client";

import React, { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import BookingBtn from "@/components/BookingBtn";

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
  agenda: string[];
  tags: string[];
}

export default function Page() {
  const [events, setEvents] = useState<FetchedEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Normalize arrays like your previous code
  const normalizeStringArray = (value: unknown): string[] => {
    if (!Array.isArray(value)) return [];
    return value.flatMap((item) => {
      if (typeof item !== "string") return [];
      const trimmed = item.trim();
      if (!trimmed) return [];
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed))
          return parsed.filter((v): v is string => typeof v === "string");
        if (typeof parsed === "string") return [parsed];
      } catch {}
      return [trimmed];
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        // ✅ Ensure we always have an array
        const eventsArray: FetchedEvent[] = Array.isArray(data.events)
          ? data.events
          : [];

        const parsedEvents = eventsArray.map((event) => ({
          ...event,
          agenda: normalizeStringArray(event.agenda),
          tags: normalizeStringArray(event.tags),
        }));

        setEvents(parsedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]); // safe fallback
      }
    };

    fetchEvents();
  }, []);

  // Filter and sort events based on search and sort order
  const filteredEvents = events
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <section className="px-4 md:px-20">
      <h1 className="text-center text-3xl font-bold">
        The Hub for Every Dev <br />
        Event You Can't Miss
      </h1>

      <p className="text-center mt-5 text-lg">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/3"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-4 py-2"
        >
          <option value="asc">Sort by Date: Earliest</option>
          <option value="desc">Sort by Date: Latest</option>
        </select>
      </div>

      {/* Booking Button */}
      <div className="flex justify-center mt-4">
        <BookingBtn />
      </div>

      <div className="mt-12 space-y-7">
        <h3 className="text-2xl font-semibold">Featured Events</h3>

        {filteredEvents.length === 0 && <p>No events found.</p>}

        <ul className="events list-none space-y-6">
          {filteredEvents.map((event) => (
            <li key={event._id}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
