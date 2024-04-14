
"use client"

import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

async function deleteReview(id) {
    const res = await fetch(`/${process.env.WEBSITE_URL}/api/review/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        throw new Error('Failed to delete review');
    }
}

export default function ReviewDelete({ reviewId }) {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await deleteReview(reviewId);

            switch (response.status){
                case 200:
                    toast.success("Review has been deleted");
                    router.refresh()
                    setIsOpen(false);
                    break;
                case 500:
                    toast.error("Review could not be deleted");
                    break;
            }

        } catch (error) {
            console.error('Error deleting review:', error.message);
        }
    };

    return (
        <div className="flex justify-center">
            <AlertDialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
                <AlertDialogTrigger>
                    <MdDelete className={"text-red-500"} size={25} onClick={() => setIsOpen(true)} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Do you want to delete your feedback?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className={"bg-red-500 text-white"} onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
