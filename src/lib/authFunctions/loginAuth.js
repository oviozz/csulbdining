

"use server"

import {signIn} from "next-auth/react";

export const LoginAuth = async (formData) => {

    const {email, password} = formData;

    const res = await signIn("credentials", {
        email,
        password,
        //callbackUrl: '/setting',
        //redirect: false,
    })

}