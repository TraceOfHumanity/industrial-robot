import { useAppSelector } from "@/store/hooks";
import { cn } from "@/utils/cn";

type InterfaceWrapperProps = {
    children: React.ReactNode;
    className?: string;
}

const InterfaceWrapper = ({ children }: InterfaceWrapperProps) => {
    const isOpen = useAppSelector((state) => state.interfaceSlice.isOpen);
    return (
        <div className={cn("rounded-lg backdrop-blur-sm bg-black/15 h-[calc(100vh-1rem)] absolute top-2 right-2 border-l border-white/40 flex flex-col gap-2 overflow-hidden", isOpen ? "w-1/4 h-[calc(100vh-1rem)]" : "w-fit h-fit")}>
            {children}
        </div>
    )
}

export default InterfaceWrapper;