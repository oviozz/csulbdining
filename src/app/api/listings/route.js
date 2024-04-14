
import connectDB from "@/lib/dbConnect";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export const GET = async (_, { params }) => {
    await connectDB();

    try {
        const listings = await Review.aggregate([
            {
                "$group": {
                    "_id": "$dorm",
                    "average_rating": { "$avg": "$rating" }
                }
            }
        ]);

        if (!listings || listings.length === 0) {
            return NextResponse.json({ status: 404, error: "No dorms found" });
        }

        const dorms = {};
        listings.forEach(listing => {
            dorms[listing._id] = parseFloat(listing.average_rating.toFixed(1));
        });

        return NextResponse.json({ dorms, status: 200 });
    } catch (error) {
        console.error('Error fetching dorms:', error.message);
        return NextResponse.json({ status: 500, error: "Something went wrong" });
    }
};
