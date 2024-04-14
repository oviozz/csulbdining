
"use client"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {getQueryStringWithDate} from "@/lib/utils";
import {IoMdInformationCircle} from "react-icons/io";

export default function FilterSection({dormChosen}){

    const router = useRouter();
    const [position, setPosition] = useState("bottom")
    const [date, setDate] = useState(new Date())
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const changeDorm = (value) => {
        router.replace(`/dorm/${value}?${getQueryStringWithDate()}`);
    }

    const formatDate = (date) => {

        const params = new URLSearchParams(searchParams);

        if (params) {
            params.set('date', date.toISOString());
        } else {
            params.delete('date');
        }

        router.replace(`${pathname}?${params.toString()}`);

        return date.toLocaleDateString(undefined, {
            weekday: 'long', // Display full weekday name
            day: 'numeric', // Display day of the month
            month: 'short', // Display abbreviated month name
            year: 'numeric' // Display full year
        });
    }

    return (
        <div>
            <div className={"space-y-2"}>

                <div
                    className="flex items-center gap-2 text-md text-lime-700 bg-lime-100 rounded-md px-2 p-1 w-fit ">
                    <IoMdInformationCircle sx={{fontSize: "1rem"}}/>
                    <span className="font-semibold">Filter by dorm and the date to find your meal.</span>
                </div>

                <h1 className={"text-2xl font-bold mt-3 mb-3"}>{dormChosen}</h1>

            </div>

            <div className={"lg:flex space-y-3 justify-between items-center "}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="lg:w-fit w-full rounded-lg flex items-center text-yellow-500 font-bold" variant="outline">
                            <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                            {formatDate(date)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                            onSelect={setDate}
                            selected={date}
                            initialFocus mode="single" />
                    </PopoverContent>
                </Popover>


                <DropdownMenu placement="bottom">
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={"lg:w-fit w-full text-yellow-500 font-bold"}>
                            {dormChosen}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Choose dorm:</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup onChange={changeDorm} value={dormChosen} onValueChange={changeDorm}>
                                <DropdownMenuRadioItem value="Beachside Village">Beachside Village</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Hillside Village">Hillside Village</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Parkside Village">Parkside Village</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    )

}


function CalendarDaysIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    )
}