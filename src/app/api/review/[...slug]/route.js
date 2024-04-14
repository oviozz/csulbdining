
import connectDB from "@/lib/dbConnect";
import Review from "@/models/Review";
import {NextResponse} from "next/server";

export const GET = async (_, {params}) => {

    await connectDB();

    const dorm = decodeURIComponent(params.slug[0]);
    const name = decodeURIComponent(params.slug[1]);

    console.log(name)
    try {

        const reviews = await Review.find({
            $and: [
                { dorm: dorm },
                { menuItem: name }
            ]
        }).populate("user").sort({ createdAt: -1 });

        if (!reviews){
            return NextResponse.json({ status: 500, error: "Couldn't find the food" });
        }

        return NextResponse.json({ reviews, status: 200 });

    } catch (error) {
        console.error('Error fetching posts:', error.message);
        return NextResponse.json({ status: 500, error: "Something went wrong" });
    }

}

export const DELETE = async (_, {params}) => {

    await connectDB();

    const reviewID = decodeURIComponent(params.slug[0]);

    try {

        const deletedReview = await Review.findByIdAndDelete(reviewID);

        if (!deletedReview){
            return NextResponse.json({ status: 404, error: "Review not found" });
        }

        return NextResponse.json({ review: deletedReview, status: 200 });

    } catch (error) {
        console.error('Error deleting review:', error.message);
        return NextResponse.json({ status: 500, error: "Something went wrong" });
    }

}