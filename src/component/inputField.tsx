import React, { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLElement> {
  label?: string;
  registration: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  icon?: React.ReactNode;
  labelRight?: React.ReactNode;
  small?: string;
  labelClassName?: string;
  smallClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  registration,
  error,
  small,
  icon,
  labelRight,
  className,
  labelClassName,
  smallClassName,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className={className}>
      {/* label */}
      <div className="p-2">
        <label
          className={twMerge(
            ` text-black/90 text-sm font-light font-sans`,
            labelClassName,
          )}
        >
          {label}
        </label>
        <small className={twMerge("", smallClassName)}>{small}</small>
        {labelRight && <div>{labelRight}</div>}
      </div>
      {/* icon */}
      <div className="flex relative">
        {icon && <div>{icon}</div>}
        <input
          type={inputType}
          className="bg-transparent border border-black rounded-xl text-xs text-black/80 font-bold focus:outline-none p-3  w-full"
          {...registration}
          {...props}
          onChange={(e) => {
            registration.onChange?.(e);
          }}
        />

        {isPasswordType && (
          <button
            type="button"
            className="text-text absolute top-2.5  right-2"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide pssword" : "Show password"}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        )}
      </div>

      {error?.message && (
        <p className="text-red-500 text-xs font-sans">{error.message}</p>
      )}
    </div>
  );
};
