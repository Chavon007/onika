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
            "font-sans text-sm font-light text-text",
            labelClassName,
          )}
        >
          {label}
        </label>
        <small className={twMerge("", smallClassName)}>{small}</small>
        {labelRight && <div>{labelRight}</div>}
      </div>
      {/* icon */}
      <div className="relative flex">
        {icon && <div>{icon}</div>}
        <input
          type={inputType}
          className="w-full rounded-xl border border-text/40 bg-transparent p-3 font-sans text-xs font-bold text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
          {...registration}
          {...props}
          onChange={(e) => {
            registration.onChange?.(e);
          }}
        />

        {isPasswordType && (
          <button
            type="button"
            className="absolute right-2 top-2.5 text-text"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        )}
      </div>

      {error?.message && (
        <p className="font-sans text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
}