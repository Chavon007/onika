import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  loadingText,
  icon,
  disabled,
  className = "",
  ...props
}) => {
  const baseStyle =
    "bg-primary w-full text-sm font-bold text-background rounded-xl p-3 flex items-center justify-center gap-2 hover:bg-accent/70 cursor-pointer";

  return (
    <button
      className={twMerge(baseStyle, className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <AiOutlineLoading3Quarters className="animate-spin text-lh" />
          {loadingText}
        </>
      ) : (
        <div>
          <>
            {icon && <span>{icon}</span>}
            {children}
          </>
        </div>
      )}
    </button>
  );
};

export default Button;
