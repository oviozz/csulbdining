
import Image from "next/image";
import Link from "next/link";
import {getLocationStatus, getQueryStringWithDate} from "@/lib/utils";

export default async function DormCard({name, image, rating}){

    const {isOpen} = getLocationStatus(name)
    return (
        <Link href={`/dorm/${name}?${getQueryStringWithDate()}`} className={" group block overflow-hidden hover:cursor-pointer"}>

            <div className={"relative"}>
                <Image src={image} width={700} height={700} alt={name} className={"bg-gray-200 rounded-md w-full object-center transition duration-500 h-[300px]"} />

                {
                    isOpen ? (
                        <div className={"absolute top-5 text-md bg-green-500 text-white font-semibold rounded-md rounded-l-none w-fit px-2 py-1"}>
                            ⏰ Open right now
                        </div>
                    ) : (
                        <div className={"absolute top-5 text-md bg-red-500 text-white font-semibold rounded-md rounded-l-none w-fit px-2 py-1"}>
                            ⏰ Closed right now
                        </div>
                    )
                }

            </div>
            <div className={"mt-3 space-y-1 lg:flex justify-between items-center"}>

                <div className={"flex justify-between items-center"}>
                    <h1 className={"font-bold text-xl group-hover:underline"}>{name}</h1>
                </div>

                <div className={"font-semibold flex items-center gap-2"}>
                    <span>
                        Rating:
                    </span>
                    <span className={"bg-green-200 px-2 rounded-lg text-green-700"}>
                        ⭐ {rating} / 5
                    </span>
                </div>

            </div>

        </Link>
    )
}