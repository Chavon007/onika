
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
}: ServiceSelectProps) => {
  const isSelected = (title: string) =>
    multiple
      ? Array.isArray(value) && value.includes(title)
      : value === title;

  const handleSelect = (title: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];

      onChange(
        current.includes(title)
          ? current.filter((v) => v !== title)
          : [...current, title],
      );
    } else {
      onChange(title);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans text-sm font-semibold text-text">
        {label}
      </label>

      {small && (
        <small className="font-sans text-xs text-muted">{small}</small>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {options.map((option) => {
          const selected = isSelected(option.title);

          return (
            <button
              type="button"
              key={option.title}
              onClick={() => handleSelect(option.title)}
              aria-pressed={selected}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 font-sans text-sm transition-all duration-200 ${
                selected
                  ? "border-primary bg-primary/10 font-medium text-primary"
                  : `border-border ${option.bg} text-text hover:border-primary/50`
              }`}
            >
              <span>{option.icon}</span>
              <span className="text-center">{option.title}</span>
            </button>
          );
        })}
      </div>

      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
};
