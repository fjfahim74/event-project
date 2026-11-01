"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignUpPage() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Google sign up failed.");
                setIsGoogleLoading(false);
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
            setIsGoogleLoading(false);
        }
    };

    const handleGithubSignUp = async () => {
        setIsGithubLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "GitHub sign up failed.");
                setIsGithubLoading(false);
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
            setIsGithubLoading(false);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = (formData.get("name") as string).trim();
        const email = (formData.get("email") as string).trim();
        const image = (formData.get("image") as string).trim();
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!name || !email || !image || !password || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must contain at least 6 characters.");
            return;
        }

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            toast.error("Password must contain uppercase and lowercase letters.");
            return;
        }

        try {
            setIsLoading(true);

            const { error } = await authClient.signUp.email({
                name,
                email,
                password,
                image,
            });


            if (error) {
                if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
                    toast.error("An account with this email already exists!");
                } else {
                    toast.error(error.message || "Unable to create your account.");
                }

                return;
            }

            toast.success("Account created successfully!");

            router.push("/sign-in");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex min-h-[75vh] items-center justify-center bg-[#F8FAF8] px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[#172B24]">
                        Create an Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Join Eventify and start making a difference.
                    </p>
                </div>

                <form onSubmit={onSubmit} noValidate className="space-y-4">

                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            autoComplete="name"
                            required
                            disabled={isLoading}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            disabled={isLoading}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-700">
                            Photo URL
                        </label>

                        <input
                            id="image"
                            name="image"
                            type="url"
                            placeholder="Enter your profile photo URL"
                            required
                            disabled={isLoading}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                autoComplete="new-password"
                                minLength={6}
                                required
                                disabled={isLoading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-20 outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-green-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                minLength={6}
                                required
                                disabled={isLoading}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-20 outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-green-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-[#12583E] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="space-y-3">
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={isGoogleLoading || isGithubLoading}
                        className="w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                        {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                    </button>

                    <button
                        type="button"
                        onClick={handleGithubSignUp}
                        disabled={isGithubLoading || isGoogleLoading}
                        className="w-full rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                        {isGithubLoading ? "Connecting..." : "Continue with GitHub"}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="font-semibold text-[#176B4D] hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </section>
    );
}