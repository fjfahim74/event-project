import Link from "next/link";

type ManageEventCardProps = {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
    onDelete: (id: string) => void;
};

export default function ManageEventCard({
    id,
    title,
    category,
    date,
    location,
    image,
    onDelete,
}: ManageEventCardProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
            <div className="relative h-48">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-5">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
                    {category}
                </span>

                <h3 className="mt-3 text-xl font-bold text-[#172B24]">
                    {title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    📅 {date}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                    📍 {location}
                </p>

                <div className="mt-5 flex gap-3 border-t border-gray-100 pt-4">
                    <Link
                        href={`/edit-event/${id}`}
                        className="flex-1 rounded-lg bg-green-700 px-4 py-2 text-center font-semibold text-white transition hover:bg-green-800"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => onDelete(id)}
                        className="flex-1 rounded-lg bg-red-50 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}