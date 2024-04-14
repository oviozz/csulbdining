
import {cn} from "@/lib/utils";

const MaxWidthWrapper = ({className, children}) => {
    return (
        <div
            className={cn(
                'mx-auto w-full p-4',
                className
            )}>
            {children}
        </div>
    )
}
export default MaxWidthWrapper;