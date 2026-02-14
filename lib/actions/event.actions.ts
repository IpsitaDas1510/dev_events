'use server';

import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";

export const getEventBySlug = async (slug: string) => {
    try {
        await connectDB();
        const sanitizedSlug = slug.trim().toLowerCase();
        return await Event.findOne({ slug: sanitizedSlug }).lean();
    } catch {
        return null;
    }
}

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const sanitizedSlug = slug.trim().toLowerCase();
        const event = await Event.findOne({ slug: sanitizedSlug }).lean();

        if (!event) return [];

        return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
    } catch {
        return [];
    }
}
