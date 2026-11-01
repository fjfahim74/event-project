import Link from "next/link";
import UserProfile from "./UserProfile";

const MobileNav = ({
    session,
    isPending,
    isMenuOpen,
    isDark,
    handleThemeChange,
    setIsMenuOpen,
    handleSignOut,
}: any) => {
    return (
        <div className="navbar-end md:hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="btn btn-ghost btn-circle text-xl"
                aria-label="Toggle menu"
            >
                ☰
            </button>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="absolute left-0 top-full w-full border-t border-base-300 bg-base-100 p-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/upcoming-events"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Upcoming Events
                        </Link>

                        <button
                            onClick={handleThemeChange}
                            className="text-left"
                        >
                            {isDark ? "Light Mode ☀️" : "Dark Mode 🌙"}
                        </button>

                        {isPending ? (
                            <div className="h-5 w-24 animate-pulse rounded bg-base-300" />
                        ) : !session ? (
                            <>
                                <Link
                                    href="/sign-in"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/sign-up"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-semibold text-green-700"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <UserProfile
                                user={session.user}
                                isOpen={false}
                                onToggle={() => { }}
                                onClose={() => setIsMenuOpen(false)}
                                onSignOut={handleSignOut}
                                variant="mobile"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileNav;