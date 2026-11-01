'use client'

export default function Newsletter() {
    return (
        <section className="bg-[#F0F7F2] px-5 py-20">
            {/* Greenish Tinted Overlay Box */}
            <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-green-100/50 px-6 py-14 text-center border border-emerald-100/60 shadow-sm md:px-12">

                {/* Small Top Tag */}
                <p className="mb-3 font-semibold text-green-700 tracking-wide text-sm">
                    STAY CONNECTED
                </p>

                {/* Main Heading */}
                <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                    Be Part of Something Good
                </h2>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-xl text-slate-600">
                    Get updates about upcoming events, volunteering opportunities,
                    and the positive changes happening in your community.
                </p>

                {/* Form */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
                >
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="min-w-0 flex-1 rounded-xl border border-emerald-100 bg-white/80 px-5 py-3 text-gray-800 outline-none placeholder:text-gray-400 focus:bg-white focus:border-green-600"
                    />

                    <button
                        type="submit"
                        className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        Subscribe
                    </button>
                </form>

                {/* Footer Note */}
                <p className="mt-4 text-sm text-slate-500">
                    Stay inspired. Stay involved. Make a difference.
                </p>

            </div>
        </section>
    );
}