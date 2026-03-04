import { cn } from "@/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

const Button = ({ children, ...props }: ButtonProps) => {
  const variantClasses = {
    primary: "bg-white/10 backdrop-blur-sm border border-white/40 rounded-md p-2",
    ghost: "bg-transparent border-none rounded",
  }
  return <button {...props} className={cn(variantClasses[props.variant || "primary"], props.className)}>{children}</button>;
};

export default Button;