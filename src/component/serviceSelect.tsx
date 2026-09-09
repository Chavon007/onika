"use client";

interface ServiceOption {
  title: string;
  bg: string;
  icon: string;
  num?: string;
}

interface ServiceSelectProps {
  label: string;
  small?: string;
  options: ServiceOption[];
  multiple?: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
}

export const ServiceSelect = ({
  label,
  small,
  options,
  multiple = true,
  value,
  onChange,
  error,
  ...props
}: ServiceSelectProps) => {
  const isSelected = (title: string) =>
    multiple ? Array.isArray(value) && value.includes(title) : value === title;

  const handleSelect = (title: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      onChange(
        current.includes(title)
          ? current.filter((v) => v !== title)
          : [...current, title]
      );
    } else {
      onChange(title);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-heading">{label}</label>
      <small className="text-xs text-gray-400">{small}</small>

      <div className="grid  grid-col-2 lg:grid-cols-4 gap-3">
        {options.map((option) => {
          const selected = isSelected(option.title);
          return (
            <button
              type="button"
              key={option.title}
              onClick={() => handleSelect(option.title)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border text-sm transition-colors font-sans ${
                selected
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : `border-gray-200 ${option.bg} text-gray-700`
              }`}
            >
              <span>{option.icon}</span>
              <span>{option.title}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};