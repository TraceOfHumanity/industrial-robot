import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Icon from "@/components/ui/icon/icon";
import { setIsOpen } from "@/store/features/interface";
import { cn } from "@/utils/cn";

const Header = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.interfaceSlice.isOpen);
  return (
    <div
      className={cn(
        "flex items-center justify-between p-2",
        isOpen &&
          "bg-linear-to-br from-[#77f8fc]/40 to-[#666666]/40 border-b border-white/40 ",
      )}
    >
      {isOpen && (
        <div className="flex items-center gap-1">
          <Icon name="industrial-robot" className="size-8" />
          <h3 className="font-medium">Industrial Robot</h3>
        </div>
      )}
      <button onClick={() => dispatch(setIsOpen(!isOpen))}>
        <Icon
          name={isOpen ? "close-sidebar" : "open-sidebar"}
          className="size-8"
        />
      </button>
    </div>
  );
};

export default Header;
