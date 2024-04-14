
import connectDB from "@/lib/dbConnect";
import {NextResponse} from "next/server";
import Review from "@/models/Review";


export const POST = async (req) => { // create post

    await connectDB();
    const reviewData = await req.json();

    try {

        const newPost = new Review({
            ...reviewData
        });

        await newPost.save();

        return NextResponse.json({message: "Post Created Successfully" ,  status: 200 });

    } catch (error) {

        console.error(error);
        return NextResponse.json({message: "Couldn't Create Post" ,  status: 500 });
    }

}