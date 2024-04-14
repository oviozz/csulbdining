
"use server"


import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {revalidatePath, revalidateTag} from "next/cache";

export const createReview = async (postData) => {

    const {user} = await getServerSession(authOptions);

    try{
        const res = await fetch(`${process.env.WEBSITE_URL}/api/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...postData,
                user: user.id,
            })
        });

        return await res.json();

    } catch (error){
        console.error('Error creating post:', error.message);
    }

}