
"use client"
import {Button} from "@/components/ui/button";
import { LiaSpinnerSolid } from "react-icons/lia";
import {cn} from "@/lib/utils";
import React from 'react'
import { useFormStatus } from "react-dom";

const FormButton = ({text, className, disable}) => {

    const { pending } = useFormStatus();

    return (
        <Button
            disabled={!disable || pending}
            type={"submit"}
            className={cn("w-full flex justify-center items-center bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-200", className)}
            variant="solid"
        >
            {pending ?
                <LiaSpinnerSolid size={20} className={"mr-2 animate-spin"}/>
                :
                null
            }

            {text}
        </Button>
    )
}

export default FormButton;
