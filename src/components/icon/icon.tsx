import { cn } from "@/utils/cn";
import { icons, type Icon as IconType } from "./icons.types";

const Icon = ({
  name,
  className,
  onClick,
}: {
  name: IconType;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn("size-6 min-w-6", className)}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
};

export default Icon;
