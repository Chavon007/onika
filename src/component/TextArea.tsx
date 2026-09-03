import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";



interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  small?: string;
  labelClassName?: string;
  smallClassName?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  registration,
  error,
  small,
  className,
  labelClassName,
  smallClassName,
  ...props
}) => {
  return (
    <div className="flex mt-2 w-full flex-col gap-2">
      {label && (
        <label
          className={twMerge(
            "text-black/90  text-sm font-light font-sans",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <small className={twMerge("", smallClassName)}>{small}</small>

      <textarea
        {...registration}
        {...props}
        className={`bg-transparent border border-black rounded-xl text-xs text-black/80 font-bold focus:outline-none p-3 w-full min-h-[140px] resize-none ${className ?? ""}`}
      />

      {error?.message && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default TextArea;
