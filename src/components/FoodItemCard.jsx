
import {cleanIngredientName, getIngredients, mergeItems, roundToInteger} from "@/lib/utils";
import Link from "next/link";


async function getData(value) {

    if (value.trim() === ""){
        return;
    }

    const res = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${value}`, {
        method: 'GET',
        headers: { 'X-Api-Key': process.env.CALORIES_KEY},
    })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return await res.json()
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

export default async function FoodItemCard({dormName, item}){

    const ingredients = item.split(" ").pop().split("/").filter(ingredient => ingredient.length === 1);

    const items = await getData(cleanIngredientName(item))
    const {calories} = mergeItems(items)

    const imgURL = await getImageData(cleanIngredientName(item));

    return (
        <Link href={`/${dormName}/review/${cleanIngredientName(item)}`} className={"flex flex-col gap-2"}>

            <div className={"relative"}>
                <img src={imgURL['items'][1]['link']} className={"bg-gray-200 rounded-md w-full object-cover transition duration-500 h-[250px]"}  alt={item}/>
                <span className={"absolute top-3 right-2 bg-white px-2 rounded-lg font-semibold shadow"}>{`🔥 ${roundToInteger(calories)} calories`}</span>

            </div>

            <div className={"flex items-center justify-between mb-2"}>
                <h1 className={"text-xl group-hover:underline"}>{cleanIngredientName(item)}</h1>
            </div>

            <ul className={"flex flex-wrap gap-2"}>
                {
                    ingredients.length >= 1 && (
                        getIngredients(item).map((tag, key) => (
                            <li key={key} className={`${ingredientColors[tag]} text-sm text-white px-2 py-0.5 rounded-lg`}>
                                {ingredientEmojis[tag]}{tag}
                            </li>
                        ))
                    )
                }
            </ul>
        </Link>
    )
}

const ingredientColors = {
    Milk: "bg-blue-500",
    Wheat: "bg-yellow-500",
    Soy: "bg-green-500",
    Eggs: "bg-red-500",
    Unknown: "bg-gray-500" // You can choose a color for unknown ingredients
};

const ingredientEmojis = {
    Milk: "🥛",
    Wheat: "🌾",
    Soy: "🌱",
    Eggs: "🥚",
    Unknown: "❓"
};