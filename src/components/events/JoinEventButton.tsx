"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

type Event = {
    _id: string;
    title: string;
    image: string;
};

export default function JoinEventButton({ event }: { event: Event }) {
    const { data: session } = authClient.useSession();
    const [isJoining, setIsJoining] = useState(false);
    const router = useRouter();

    const handleJoinEvent = async () => {
        const user = session?.user;

        if (!user) {
            toast.error("Please log in to join this event.");
            router.push("/sign-in");
            return;
        }

        const data = {
            eventId: event._id,
            eventTitle: event.title,
            eventImage: event.image,
            userName: user.name,
            userEmail: user.email,
        };

        try {
            setIsJoining(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/event-joins`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (res.status === 409) {
                toast.error("You have already joined this event!");
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to join event");
            }

            toast.success("You joined the event successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Unable to join this event. Please try again.");
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <button
            onClick={handleJoinEvent}
            disabled={isJoining}
            className="mt-6 rounded-xl bg-[#176B4D] px-8 py-3 font-semibold text-white transition hover:bg-[#12563D] disabled:cursor-not-allowed disabled:opacity-60"
        >
            {isJoining ? "Joining..." : "Join Event"}
        </button>
    );
}