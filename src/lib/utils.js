import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {cycle2} from "@/lib/cycles/cycle2";
import {cycle3} from "@/lib/cycles/cycle3";
import {cycle4} from "@/lib/cycles/cycle4";
import {cycle1} from "@/lib/cycles/cycle1";
import {cycle5} from "@/lib/cycles/cycle5";

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function getIngredients(itemName) {

    const ingredients = itemName.split(" ").pop().split("/");

    return ingredients.map(ingredient => {
        switch (ingredient) {
            case "M":
                return "Milk";
            case "W":
                return "Wheat";
            case "S":
                return "Soy";
            case "E":
                return "Eggs";
            default:
                return "Unknown";
        }
    });
}

export function cleanIngredientName(itemName) {

    if (itemName.includes("/")){
        const parts = itemName.split(" ");

        parts.pop();

        return parts.join(" ");
    }

    return itemName
}


export function mergeItems(data) {
    const items = data?.items;

    let mergedItem = {
        sugar_g: 0,
        fiber_g: 0,
        serving_size_g: 0,
        sodium_mg: 0,
        potassium_mg: 0,
        fat_saturated_g: 0,
        fat_total_g: 0,
        calories: 0,
        cholesterol_mg: 0,
        protein_g: 0,
        carbohydrates_total_g: 0
    };

    items?.forEach(item => {
        mergedItem.sugar_g += item.sugar_g;
        mergedItem.fiber_g += item.fiber_g;
        mergedItem.serving_size_g += item.serving_size_g;
        mergedItem.sodium_mg += item.sodium_mg;
        mergedItem.potassium_mg += item.potassium_mg;
        mergedItem.fat_saturated_g += item.fat_saturated_g;
        mergedItem.fat_total_g += item.fat_total_g;
        mergedItem.calories += item.calories;
        mergedItem.cholesterol_mg += item.cholesterol_mg;
        mergedItem.protein_g += item.protein_g;
        mergedItem.carbohydrates_total_g += item.carbohydrates_total_g;
    });

    return mergedItem;
}

export function roundToInteger(number) {
    return Math.ceil(number);
}



export function getRandomFoodEmoji() {

    const foodEmojis = [
        "🍔", "🍕", "🌮", "🍣", "🍦", "🥪", "🍩", "🍟", "🥨", "🍝", "🍜", "🥗", "🥞", "🍳", "🍗", "🍖", "🍤", "🍫", "🍰", "🍪"
    ];

    const randomIndex = Math.floor(Math.random() * foodEmojis.length);
    return foodEmojis[randomIndex];
}

export function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) {
        return 0; // return 0 if there are no reviews
    }

    let totalRating = 0;
    for (const review of reviews) {
        totalRating += review.rating; // sum up all ratings
    }

    const averageRating = totalRating / reviews.length; // calculate the average
    return averageRating.toFixed(2); // round to 2 decimal places
}


export function getNumberFromDate(dateString) {
    // Parse the dateString into a Date object
    const date = new Date(dateString);

    const dateRanges = {
        "Spring 2024": {
            "Apr 15": cycle2,
            "Apr 22": cycle3,
            "Apr 29": cycle4,
            "Apr 8": cycle1,
            "Feb 12": cycle4,
            "Feb 19": cycle5,
            "Feb 26": cycle1,
            "Feb 5": cycle3,
            "Jan 22": cycle1,
            "Jan 29": cycle2,
            "Mar 11": cycle3,
            "Mar 18": cycle4,
            "Mar 25": cycle5,
            "Mar 4": cycle2,
            "May 6": cycle5
        }
    };

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}`;

    for (const key in dateRanges["Spring 2024"]) {
        if (formattedDate === key) {
            return dateRanges["Spring 2024"][key];
        }
    }

    // If date is not found in the defined ranges, find the nearest one
    const sortedDates = Object.keys(dateRanges["Spring 2024"]).sort((a, b) => {
        const dateA = new Date(`2024 ${a}`);
        const dateB = new Date(`2024 ${b}`);
        return dateA - dateB;
    });

    for (let i = 0; i < sortedDates.length - 1; i++) {
        const currentDate = new Date(`2024 ${sortedDates[i]}`);
        const nextDate = new Date(`2024 ${sortedDates[i + 1]}`);

        if (date >= currentDate && date < nextDate) {
            return dateRanges["Spring 2024"][sortedDates[i]];
        }
    }

    return dateRanges["Spring 2024"][sortedDates[sortedDates.length - 1]];
}

export function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = days[date.getDay()];

    // Adjust if it's Saturday or Sunday
    if (dayOfWeek === 'Saturday') {
        dayOfWeek = 'Monday';
    } else if (dayOfWeek === 'Sunday') {
        dayOfWeek = 'Monday';
    }

    return dayOfWeek;
}

export function getQueryStringWithDate() {
    const date = new Date().toISOString();
    const params = new URLSearchParams();
    params.set('date', date);
    return params.toString();
}

export function getLocationStatus(locationName) {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = new Date();

    if (openingHours.hasOwnProperty(locationName)) {
        const hours = openingHours[locationName][currentDay];
        if (hours) {
            const [openStr, closeStr] = hours.split(' - ');
            const [openHour, openMinute] = openStr.split(':').map(str => parseInt(str));
            const [closeHour, closeMinute] = closeStr.split(':').map(str => parseInt(str));

            const openTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), openHour, openMinute);
            const closeTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), closeHour, closeMinute);

            return currentTime >= openTime && currentTime <= closeTime ? { isOpen: true } : { isOpen: false };
        } else {
            return { isOpen: false };
        }
    } else {
        return { error: "Location not found" };
    }
}

// Example usage
const openingHours = {
    "Beachside Village": {
        "Monday-Friday": "6:30 am - 8:30 pm"
    },
    "Hillside Village": {
        "Monday-Friday": "7 am - 8:30 pm"
    },
    "Parkside Village": {
        "Monday-Friday": "7 am - 8:30 pm"
    }
};

