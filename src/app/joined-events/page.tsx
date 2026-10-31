"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import { authClient } from "@/lib/auth-client";

type JoinedEvent = {
    _id: string;
    eventId: string;
    eventTitle: string;
    eventImage: string;
    eventCategory: string;
    eventLocation: string;
    eventDate: string;
};

export default function JoinedEventsPage() {
    const { data: session } = authClient.useSession();
    const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            if (!session?.user?.email) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/event-joins/${session.user.email}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch joined events");
                }

                const data = await res.json();
                setJoinedEvents(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [session?.user?.email]);

    return (
        <main className="min-h-screen bg-[#F8FAF8] px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-2 text-3xl font-bold text-[#172B24]">
                    Joined Events
                </h1>

                <p className="mb-8 text-gray-600">
                    Events you have joined and are looking forward to.
                </p>

                {loading ? (
                    <p className="text-gray-500">Loading joined events...</p>
                ) : joinedEvents.length === 0 ? (
                    <p className="text-gray-500">
                        You haven't joined any events yet.
                    </p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {joinedEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                id={event.eventId}
                                title={event.eventTitle}
                                category={event.eventCategory}
                                date={new Date(event.eventDate).toLocaleDateString()}
                                location={event.eventLocation}
                                image={event.eventImage}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}