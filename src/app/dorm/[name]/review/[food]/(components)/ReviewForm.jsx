
import {Slider} from "@/components/ui/slider";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {DialogFooter} from "@/components/ui/dialog";
import FormButton from "@/components/FormButton";
import {useState} from "react";
import {createReview} from "@/actions/review";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ReviewForm({closeDialog, foodname, dormName}){

    const router = useRouter();
    const [formData, setFormData] = useState({
        rating: 0,
        description: "",
        dorm: dormName,
        menuItem: foodname
    });

    const handleRatingChange = (newValue) => {
        setFormData({ ...formData, rating: newValue[0] });
    };

    const handleDescriptionChange = (event) => {
        setFormData({ ...formData, description: event.target.value });
    };

    const reviewHandler = async () => {

        const response = await createReview(formData);

        switch (response.status){
            case 200:
                toast.success(response.message);
                router.refresh()
                closeDialog();
                break;
            case 500:
                toast.error(response.message);
                break;
        }
    }

    const isReviewComplete = formData.description && formData.menuItem;

    return (
        <form action={reviewHandler}>
            <div className="grid gap-4 py-4">

                <div className="">
                    <Slider onValueChange={handleRatingChange} defaultValue={[1]} id="rating" max={6} min={1} />

                    <div className="flex justify-evenly mt-2 text-sm dark:text-gray-400">
                        <span className={"w-4 h-4 mx-2"}>😍 Delicious</span>
                        <span className={"w-4 h-4 mx-2"}>😊 </span>
                        <span className={"w-4 h-4 mx-2"}>😐 </span>
                        <span className={"w-4 h-4 mx-2"}>🤢  </span>
                        <span className={"w-4 h-4 mx-2"}>🤮 Horrible</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-10">
                    <Label htmlFor="username" className="text-left">
                        Description
                    </Label>
                    <Textarea
                        onChange={handleDescriptionChange}
                        placeholder={"How was the food?"}
                        id="username"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <FormButton className={!isReviewComplete ? "bg-red-500" : null} disable={isReviewComplete} text={"Add Review"} />
            </DialogFooter>
        </form>
    )

}