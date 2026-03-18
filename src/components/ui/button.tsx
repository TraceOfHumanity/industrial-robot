import { cn } from "@/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isActive?: boolean;
};

const Button = ({ children, isActive, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn("rounded p-1", isActive && "bg-linear-to-b from-[#393E46] to-[#111111] text-[#ECECEC]", props.className)}
    >
      {children}
    </button>
  );
};

export default Button;
