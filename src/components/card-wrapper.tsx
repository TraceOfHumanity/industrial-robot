import { cn } from "@/utils/cn";

type CardWrapperProps = {
    children: React.ReactNode;
    className?: string;
}

const CardWrapper = ({ children, className }: CardWrapperProps) => {
    return (
        <div className={cn("rounded-lg backdrop-blur-sm bg-white/10 p-4", className)}>
            {children}
        </div>
    )
}

export default CardWrapper;