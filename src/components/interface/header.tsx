import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Button from "../ui/button"
import Icon from "../ui/icon/icon"
import { setIsOpen } from "@/store/features/interface";

const Header = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.interfaceSlice.isOpen);
    return (
        <div className="flex items-center justify-end">
            <Button variant="ghost" onClick={() => dispatch(setIsOpen(!isOpen))}>
                <Icon name={isOpen ? "close-sidebar" : "open-sidebar"} className="size-8" />
            </Button>
        </div>
    )
}

export default Header