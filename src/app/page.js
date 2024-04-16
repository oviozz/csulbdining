
import React from 'react';
import {dormData, menuData} from "@/lib/mockData";
import DormCard from "@/components/DormCard";
import { IoMdInformationCircle } from "react-icons/io";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

async function getAllDromRating() {

    const res = await fetch(`${process.env.WEBSITE_URL}/api/listings`, {
        method: 'GET',
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return await res.json()
}


const Home = async () => {

    const dormRatings = await getAllDromRating();

    return (
        <div className={""}>

            <div
                className="ml-4 flex items-center gap-2 text-md text-lime-700 bg-lime-100 rounded-md px-2 p-0.5 w-fit mt-0.5">
                <IoMdInformationCircle sx={{fontSize: "1rem"}}/>
                <span className="font-semibold">Click on the card to select your dorm.</span>
            </div>

            <div className="p-4 grid gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {
                    dormData.map((dorm, index) => {
                        const ratingVal = dormRatings.dorms[dorm.name] || 0
                        return <DormCard key={index} rating={ratingVal} name={dorm.name} image={dorm.image}/>
                    })
                }
            </div>

        </div>
    )
};

export default Home;

