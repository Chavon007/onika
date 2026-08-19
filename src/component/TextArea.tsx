import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  registration,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex mt-2 w-full flex-col gap-2">
      {label && (
        <label className="text-black/90 px-2 text-sm font-light font-sans">
          {label}
        </label>
      )}

      <textarea
        {...registration}
        {...props}
        className={`bg-transparent border border-black rounded-xl text-xs text-black/80 font-bold focus:outline-none p-3 w-full min-h-[140px] resize-none ${className ?? ""}`}
      />

      {error?.message && (
        <p className="text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default TextArea;