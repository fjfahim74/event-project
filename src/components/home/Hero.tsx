import Link from "next/link";

const Hero = () => {
    return (<section className="bg-gray-50"> <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center md:py-28"> <span className="mb-4 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
        Your Next.js Starter </span>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Build Something
            <span className="text-blue-600"> Amazing</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            A reusable starting point for your next web project, built with
            Next.js, TypeScript, and Tailwind CSS.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
                href="/items/example"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
                Explore Items
            </Link>

            <Link
                href="/signup"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
                Get Started
            </Link>
        </div>
    </div>
    </section>

    );
};

export default Hero;
