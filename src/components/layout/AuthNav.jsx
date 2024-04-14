
"use client"
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {LogOutIcon} from "lucide-react";
import {useRouter} from "next/navigation";

export default function AuthNav(){

    const { data: session } = useSession()

    const logout = () => {
        signOut({redirect: false});
        // router.refresh();

    }
    return (
        !session ?
            (
                <>
                    <Link href={"/login"}>
                        <li className={"flex gap-1.5 items-center "}>
                            Sign in
                        </li>
                    </Link>

                    <Link href={"/register"}>
                        <li className={"flex gap-1.5 items-center text-yellow-500"}>
                            Register
                        </li>
                    </Link>
                </>
            ) :
            (
                <Link
                    className={"mt-auto text-md font-semibold flex items-center gap-2 rounded-md px-3 py-2 text-red-500 transition-all dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-900"}
                    onClick={logout}
                    href={"/login"}>
                    <LogOutIcon className={"h-5 w-5"} />
                    Log out
                </Link>
            )
    )

}