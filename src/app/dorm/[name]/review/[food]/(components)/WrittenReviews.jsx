
import React from 'react';
import {calculateAverageRating} from "@/lib/utils";
import ReviewDelete from "@/app/dorm/[name]/review/[food]/(components)/ReviewDelete";

async function getReviewData(dorm, food) {
    const res = await fetch(`${process.env.WEBSITE_URL}/api/review/${dorm}/${food}`, {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return await res.json();
}

export default async function WrittenReviews({ dormName, foodName }) {

    const { reviews } = await getReviewData(dormName, foodName);

    if (reviews.length === 0) {
        return (
            <div className="font-semibold text-yellow-500 flex items-center justify-center text-2xl h-10">
                <p>Be the first to write a review! <span role="img" aria-label="Smiley emoji">😊</span></p>
            </div>
        );
    }


    const averageRating = calculateAverageRating(reviews);

    return (
        <div>

            <div className="flex jusitfy-between">
                {[...Array(Math.round(averageRating))].map((_, index) => (
                    <svg
                        key={index}
                        className="w-5 h-5 text-yellow-300 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{averageRating}</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
            </div>
            {reviews.map(review => (
                <article key={review._id} className="space-y-3 border-b pb-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="pt-5 font-medium dark:text-white">
                                <p>👤 {review.user.username}</p>
                            </div>
                        </div>
                        <div className={""}>
                            <div className="text-gray-500 text-sm dark:text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.description}</p>
                    <div className={"flex justify-between items-center"}>
                        <div className={"flex items-center gap-2 text-gray-500 font-semibold"}>
                            Rating:
                            <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <ReviewDelete ReviewId={review._id}/>
                    </div>
                </article>
            ))}
        </div>
    );
}
