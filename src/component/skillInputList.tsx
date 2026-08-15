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
    <div>
      <div>
        <label>{label}</label>
        <small>{small}</small>

        {skills.map((skill, i) => (
          <div key={i}>
            <input
              type="text"
              value={skill}
              onChange={(e) => updateSkill(i, e.target.value)}
              placeholder="e.g. Plumbing"
            />

            {skills.length > 1 && (
              <button type="button" onClick={() => removeSkill(i)}>
                -
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSkill}>+ Add another skill</button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SkillInputField;
