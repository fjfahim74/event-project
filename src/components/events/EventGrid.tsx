
"use client";

import { useState } from "react";
import EventCard from "./EventCard";

export type EventCardData = {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
};

export default function EventGrid({
    events,
}: {
    events: EventCardData[];
}) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Cleanup",
        "Plantation",
        "Donation",
        "Awareness",
    ];

    const filteredEvents =
        selectedCategory === "All"
            ? events
            : events.filter((event) => event.category === selectedCategory);

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-base-content/70">
                    Showing{" "}
                    <span className="font-semibold">
                        {filteredEvents.length}
                    </span>{" "}
                    events
                </p>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-xl border border-base-300 bg-base-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category === "All" ? "All Categories" : category}
                        </option>
                    ))}
                </select>
            </div>

            {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
                    <h3 className="text-xl font-semibold text-base-content">
                        No events found
                    </h3>

                    <p className="mt-2 text-base-content/60">
                        Try selecting a different category.
                    </p>
                </div>
            )}
        </div>
    );
}
