import Link from "next/link";

export default function CreateEventPage() {
    return (
        <main className="min-h-screen px-4 py-16">
            <div className="mx-auto max-w-3xl">
                {/* Heading */}
                <div className="mb-10 text-center">
                    <span className="mb-3 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                        Make an Impact
                    </span>

                    <h1 className="mb-3 text-3xl font-bold text-[#172B24] md:text-4xl">
                        Create a Community Event
                    </h1>

                    <p className="mx-auto max-w-xl text-gray-500">
                        Bring people together for a meaningful cause. Create an
                        event and inspire your community to make a difference.
                    </p>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
                    <form className="space-y-6">

                        {/* Event Title */}
                        <div>
                            <label className="mb-2 block font-medium text-[#172B24]">
                                Event Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Community Tree Plantation"
                                className="input w-full border-gray-300"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block font-medium text-[#172B24]">
                                Event Description
                            </label>
                            <textarea
                                placeholder="Describe your event and its purpose..."
                                rows={5}
                                className="textarea w-full border-gray-300"
                            />
                        </div>

                        {/* Category and Date */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block font-medium text-[#172B24]">
                                    Event Category
                                </label>
                                <select
                                    defaultValue=""
                                    className="select w-full border-gray-300"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    <option value="Cleanup">Cleanup</option>
                                    <option value="Plantation">Plantation</option>
                                    <option value="Donation">Donation</option>
                                    <option value="Awareness">Awareness</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block font-medium text-[#172B24]">
                                    Event Date
                                </label>
                                <input
                                    type="date"
                                    min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                                        .toISOString()
                                        .split("T")[0]}
                                    className="input w-full border-gray-300"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="mb-2 block font-medium text-[#172B24]">
                                Event Location
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Comilla, Bangladesh"
                                className="input w-full border-gray-300"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="mb-2 block font-medium text-[#172B24]">
                                Event Image URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com/event-image.jpg"
                                className="input w-full border-gray-300"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                            <button
                                type="submit"
                                className="btn flex-1 border-none bg-[#176B4D] text-white hover:bg-[#12563D]"
                            >
                                Create Event
                            </button>

                            <Link
                                href="/upcoming-events"
                                className="btn btn-outline border-gray-300 text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}