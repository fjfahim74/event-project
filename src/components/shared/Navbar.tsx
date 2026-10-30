import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-2xl">
                        💻
                    </div>

                    <span className="text-xl font-bold">My Project</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="text-sm font-medium hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <Link
                        href="/sign-in"
                        className="text-sm font-medium hover:text-blue-600"
                    >
                        Sign In
                    </Link>

                    <Link
                        href="/sign-up"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;