
"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {useState} from "react";
import {createReview} from "@/actions/review";
import toast from "react-hot-toast";
import {BsFillSendPlusFill} from "react-icons/bs";
import FormButton from "@/components/FormButton";
import ReviewForm from "@/app/dorm/[name]/review/[food]/(components)/ReviewForm";



export default function ReviewModal({foodname, dormName}) {

    const [open, setOpen] = useState(false);
    const closeDialog = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className={"text-yellow-500 font-bold"}>
                    Write Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                    <DialogDescription>
                        Rate your dorm food and share with others.
                    </DialogDescription>
                </DialogHeader>

                <ReviewForm closeDialog={closeDialog} dormName={dormName} foodname={foodname} />
            </DialogContent>
        </Dialog>
    )
}
