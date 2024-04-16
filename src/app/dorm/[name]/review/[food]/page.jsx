
import {cleanIngredientName, getRandomFoodEmoji, mergeItems} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import ReviewModal from "@/app/dorm/[name]/review/[food]/(components)/ReviewModal";
import WrittenReviews from "@/app/dorm/[name]/review/[food]/(components)/WrittenReviews";
import {notFound} from "next/navigation";
import {Suspense} from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


async function getFoodDetails(value) {

    if (value.trim() === ""){
        return;
    }

    const res = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${value}`, {
        method: 'GET',
        headers: { 'X-Api-Key': process.env.CALORIES_KEY},
    })
    if (!res.ok) {
        throw new Error('Failed to fetch tableFoodDetails')
    }
    return res.json()
}
async function getImageData(foodName) {
    if (foodName.trim() === ""){
        return;
    }

    const res = await fetch(`https://www.googleapis.com/customsearch/v1?q=${foodName}&key=${process.env.API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&searchType=image&image_size=large`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return await res.json()
}

export default async function ReviewPage({params}) {

    const session = await getServerSession(authOptions)

    const foodName = cleanIngredientName(decodeURIComponent(params.food))
    const dormName = decodeURIComponent(params.name);
    const items = await getFoodDetails(foodName)
    const imgURL = await getImageData(foodName);

    const tableFoodDetails = mergeItems(items)


    const roundValue = (value) => Math.round(value * 10) / 10;
    const calculatePercentage = (value, total) => (value / total) * 100;

    return (
        <div className={"mt-5 px-4"}>

            <h1 className={"text-2xl font-bold mb-3"}>{`${getRandomFoodEmoji()} ${foodName}`}</h1>

            <div className={"mt-5 grid gap-7 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2"}>

                <div className={""}>
                    <img src={imgURL['items'][1]['link']} className={"bg-gray-200 rounded-md w-full object-cover transition duration-500 h-[350px]"}  />

                </div>

                <div className="flow-root">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-gray-900 ">Calories 🔥</dt>
                            <div className={"flex items-center gap-2 "}>
                                <dd className="text-gray-700 sm:col-span-2">{roundValue(tableFoodDetails.calories)}</dd>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-gray-900">Sugar (g) 🍬</dt>
                            <dd className="text-gray-700 sm:col-span-2">{roundValue(tableFoodDetails.sugar_g)}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-gray-900">Fiber (g) 🌾</dt>
                            <dd className="text-gray-700 sm:col-span-2">{roundValue(tableFoodDetails.fiber_g)}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-gray-900">Sodium (mg) 🧂</dt>
                            <dd className="text-gray-700 sm:col-span-2">{roundValue(tableFoodDetails.sodium_mg)}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-gray-900">Saturated Fat (g) 🥩</dt>
                            <dd className="text-gray-700 sm:col-span-2">{roundValue(tableFoodDetails.fat_saturated_g)}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-gray-900">Total Fat (g) 🧈</dt>
                            <dd className="text-gray-700 sm:col-span-2">{roundValue(tableFoodDetails.fat_total_g)}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-gray-900">Cholesterol (mg) 🍳</dt>
                            <dd className="text-gray-700 sm:col-span-2">{roundValue(tableFoodDetails.cholesterol_mg)}</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-gray-900">Protein (g) 🍗</dt>
                            <dd className="text-gray-700 sm:col-span-2">{roundValue(tableFoodDetails.protein_g)}</dd>
                        </div>

                    </dl>
                </div>

            </div>

            <div className={"flex justify-between items-center"}>
                <h1 className={"text-xl font-bold mt-5"}>Reviews:</h1>

                {
                    session && <ReviewModal dormName={dormName} foodname={foodName}/>
                }
            </div>

            <div className={"mt-4 space-y-7"}>
                <Suspense fallback={<h1 className={"font-light text-center"}>Loading</h1>}>
                    <WrittenReviews dormName={dormName} foodName={foodName}/>
                </Suspense>
            </div>

        </div>
    )

}