"use client";

import { useEffect, useState } from "react";
import ManageEventCard from "@/components/events/ManageEventCard";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

type Event = {
    _id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
};

export default function ManageEventsPage() {
    const { data: session } = authClient.useSession();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyEvents = async () => {
            if (!session?.user?.email) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/my-events/${session.user.email}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await res.json();
                setEvents(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, [session?.user?.email]);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete event");
            }

            setEvents(events.filter((event) => event._id !== id));

            toast.success("Event deleted successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete event.");
        }
    };

    return (
        <main className="min-h-screen bg-[#F8FAF8] px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-2 text-3xl font-bold text-[#172B24]">
                    Manage Events
                </h1>

                <p className="mb-8 text-gray-600">
                    Manage the events you have created.
                </p>

                {loading ? (
                    <p className="text-gray-500">Loading your events...</p>
                ) : events.length === 0 ? (
                    <p className="text-gray-500">
                        You haven't created any events yet.
                    </p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <ManageEventCard
                                key={event._id}
                                id={event._id}
                                title={event.title}
                                category={event.category}
                                date={new Date(event.date).toLocaleDateString()}
                                location={event.location}
                                image={event.image}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}