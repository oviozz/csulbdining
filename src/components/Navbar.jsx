
import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {LogOutIcon} from "lucide-react";
import {signOut} from "next-auth/react";
import AuthNav from "@/components/layout/AuthNav";


export default async function Navbar () {

    return (
        <header className={"lg:flex justify-between items-center bg-white mb-5"}>

            <Link href={"/"} className={"text-2xl font-bold flex gap-2 items-center"}>

                <h1 className={"text-amber-400"}>🍽️ CSULB</h1>
                <span className={""}>Dining</span>
            </Link>

            <ul className={"lg:mt-0 mt-2 font-semibold text-xl flex gap-5"}>

                <AuthNav />

            </ul>
        </header>
    )


}

