import { poppins } from "@/lib/fonts";
import React, { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLElement> {
  label: string;
  registration: Partial<UseFormRegisterReturn>;
  error?: FieldError;
  icon?: React.ReactNode;
  labelRight?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  registration,
  error,
  icon,
  labelRight,
  className,
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
      <div>
        <label className={` text-text text-sm font-bold`}>{label}</label>
        {labelRight && <div>{labelRight}</div>}
      </div>
      {/* icon */}
      <div className="flex relative">
        {icon && <div>{icon}</div>}
        <input
          type={inputType}
          className="bg-muted text-xs text-background font-bold focus:outline-none py-2 rounded px-3 w-full"
          {...registration}
          {...props}
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

      {error?.message && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
