"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Login = () => {

    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const loginHandler = async () => {

        const { email, password } = formData;

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            toast.error("Invalid email or password");
        } else {
            toast.success("Successfully logged in");
            router.replace("/");
        }
    };

    const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== "";

    return (
        <section className="gradient-form h-full dark:bg-neutral-700">
            <div className="container h-full p-10">
                <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white dark:bg-neutral-800">
                            <div className="lg:flex lg:flex-wrap">
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            <h1 className="text-4xl font-bold">
                                                <span style={{ color: "#fbbf24" }}>CSULB</span>Dining
                                            </h1>
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                Find What You Want!
                                            </h4>
                                        </div>

                                        <div className="rounded-lg">
                                            <div className="p-4">
                                                <h2 className="font-semibold text-lg">Login to your account</h2>
                                                <form action={loginHandler}>
                                                    <div className="mt-4">
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                                                        <Input value={formData.email} onChange={handleInputChange} className="mt-1 block w-full" name={"email"} placeholder="Email" type="text" />
                                                    </div>
                                                    <div className="mt-4">
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                                                        <Input value={formData.password} onChange={handleInputChange} className="mt-1 block w-full" name={"password"} placeholder="Password" type="password" />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Button className={"w-full"} text={"Login"} disabled={!isFormValid} icon={<LogInIcon />}>Login</Button>
                                                    </div>

                                                    <div className="mt-4 text-center">
                                                        {"Don't have an account?"}
                                                        <Link
                                                            className="ml-2 underline text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-50"
                                                            href={"/register"}
                                                        >
                                                            Register
                                                        </Link>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                                    style={{
                                        background: "linear-gradient(to right, #fbbf24, #ff7e2f)",
                                    }}
                                >
                                    <div className="px-4 py-6 md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-5xl font-bold">Our mission</h4>
                                        <p className="text-l font-semibold">
                                            At CSULBDining, we're dedicated to helping dorming
                                            students stay informed about their dining options. Our
                                            goal is to provide easy access to meal cycles, menus, and
                                            reviews, fostering a community where students can make
                                            informed choices and share their dining experiences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

function LogInIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" x2="3" y1="12" y2="12" />
        </svg>
    );
}

export default Login;
