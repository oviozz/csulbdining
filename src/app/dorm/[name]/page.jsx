
import FilterSection from "@/app/dorm/( components )/FilterSection";
import {menuData} from "@/lib/mockData";
import FoodItemCard from "@/components/FoodItemCard";
import {getDayOfWeek, getNumberFromDate} from "@/lib/utils";
import {notFound} from "next/navigation";
import {IoMdInformationCircle} from "react-icons/io";

export default function DormMenu({ params, searchParams }) {

    if (!searchParams?.date){
        notFound()
    }

    const dormName = decodeURIComponent(params.name)
    const cycleData = getNumberFromDate(searchParams);
    const getDay = getDayOfWeek(searchParams?.date)

    const dormData = cycleData[`Monday`][`${dormName}`]


    return (
        <div className={"mt-5 px-4"}>

            <FilterSection dormChosen={dormName}/>


            <div className={"space-y-10"}>
                <div className={"mt-7"}>
                    <h1 className="text-2xl  font-semibold mb-5 px-2 py-1 rounded-sm">🍳 Breakfast</h1>

                    <ul className={"grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                        {dormData && dormData?.Breakfast && dormData?.Breakfast?.Items.map((item, index) => (
                            <FoodItemCard dormName={dormName} item={item} key={index} />
                        ))}
                    </ul>
                </div>

                <div className={""}>
                    <h1 className="text-2xl font-semibold mb-5 px-2 py-1 rounded-sm">🥪 Lunch</h1>

                    <ul className={"grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                        {dormData && dormData?.Lunch && dormData?.Lunch?.Items.map((item, index) => (
                            <FoodItemCard dormName={dormName} item={item} key={index} />
                        ))}
                    </ul>
                </div>

                <div className={""}>
                    <h1 className="text-2xl font-semibold mb-5 px-2 py-1 rounded-sm">🍔 Dinner</h1>

                    <ul className={"grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                        {dormData && dormData?.Dinner && dormData?.Dinner.Items.map((item, index) => (
                            <FoodItemCard dormName={dormName} item={item} key={index} />
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )

}