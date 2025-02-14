import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "ghost"; // Thêm variant vào đây
}

export function Button({ children, className, variant = "default", ...props }: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded";
  const variantStyles = {
    default: "bg-red-500 text-white",
    ghost: "bg-transparent text-black border border-gray-300",
  };

  return (
    <button className={`${baseStyle} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
