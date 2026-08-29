import React from "react";

interface skillInputProps {
  label: string;
  small?: string;
  value: string[];
  error?: string;
  onChange: (skills: string[]) => void;
}

const SkillInputField: React.FC<skillInputProps> = ({
  label,
  value,
  small,
  error,
  onChange,
}) => {
  const skills = value.length > 0 ? value : [""];
  const updateSkill = (index: number, newValue: string) => {
    const updated = [...skills];
    updated[index] = newValue;
    onChange(updated);
  };

  const addSkill = () => {
    onChange([...skills, ""]);
  };

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    onChange(updated.length > 0 ? updated : [""]);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col p-2">
        <label className="text-black/90 text-sm font-light font-sans">
          {label}
        </label>
        <small className="text-black/50 text-xs">{small}</small>
      </div>

      {skills.map((skill, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={skill}
            onChange={(e) => updateSkill(i, e.target.value)}
            placeholder="e.g. Plumbing"
            className="bg-transparent border border-black rounded-xl text-xs text-black/80 font-bold focus:outline-none p-3 w-full"
          />

          {skills.length > 1 && (
            <button
              type="button"
              onClick={() => removeSkill(i)}
              className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border border-black text-black/80 font-bold"
            >
              -
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        className="self-start text-sm font-bold font-heading text-primary"
      >
        + Add another skill
      </button>

      {error && <p className="text-red-500 text-xs font-sans">{error}</p>}
    </div>
  );
};

export default SkillInputField;
