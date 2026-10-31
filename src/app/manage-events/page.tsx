
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
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

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

    const handleDelete = (id: string) => {
        setSelectedEventId(id);
    };

    const confirmDelete = async () => {
        if (!selectedEventId) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/events/${selectedEventId}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete event");
            }

            setEvents(events.filter((event) => event._id !== selectedEventId));
            toast.success("Event deleted successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete event.");
        } finally {
            setSelectedEventId(null);
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

            {selectedEventId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-[#172B24]">
                            Delete Event?
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Are you sure you want to delete this event? This
                            action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedEventId(null)}
                                className="rounded-lg border border-gray-300 px-5 py-2 font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700 cursor-pointer"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
