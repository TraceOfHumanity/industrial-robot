import { cn } from "@/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isActive?: boolean;
};

const Button = ({ children, isActive, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn("rounded p-1 bg-[#33363b] border border-transparent", isActive && " border-[#77f8fc] shadow-active", props.className)}
    >
      {children}
    </button>
  );
};

export default Button;
