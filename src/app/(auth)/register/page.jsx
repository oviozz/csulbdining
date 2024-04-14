
"use client"

import {Input} from "@/components/ui/input";
import Link from "next/link";
import {registerAuth} from "@/lib/authFunctions/registerAuth";
import React, {useState} from "react";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

export default function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const registerHandler = async () => {

        const data = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }

        const response = await registerAuth(data);

        switch (response.status) {
            case 200:
                toast.success("Account created successfully.")
                redirect("/login")
                break;
            case 400:
                toast.error("Email is already in use.")
                break;
            case 500:
                toast.error("Something went wrong. Try Again")
                break;
        }
    }

    const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== "" && formData.username.trim() !== "";

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

                                        <form action={registerHandler}>

                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
                                                <Input
                                                    name="username"
                                                    className="mt-1 block w-full"
                                                    placeholder="Username"
                                                    type="text"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                /></div>

                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                                                <Input
                                                    name="email"
                                                    className="mt-1 block w-full"
                                                    placeholder="Email"
                                                    type="text"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                /></div>

                                            <div className="mt-4">
                                                <label
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                                                <Input
                                                    name="password"
                                                    className="mt-1 block w-full"
                                                    placeholder="Password"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                /></div>
                                            <div className="mt-4">

                                                <Button className={"w-full"} text={"Register"} icon={<LogInIcon />} disable={isFormValid}>Register</Button>
                                            </div>

                                            <div className="mt-4 text-center">
                                                Already have account?
                                                <Link
                                                    className="ml-2 underline text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-50"
                                                    href={"/login"}
                                                >
                                                    Log in
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none" style={{ background: "linear-gradient(to right, #fbbf24, #ff7e2f)" }}>
                                    <div className="px-4 py-6 md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-5xl font-bold">Our mission</h4>
                                        <p className="text-l font-semibold">
                                            {"At CSULBDining, we're dedicated to helping dorming students stay informed about their dining options. Our goal is to provide easy access to meal cycles, menus, and reviews, fostering a community where students can make informed choices and share their dining experiences."}
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

