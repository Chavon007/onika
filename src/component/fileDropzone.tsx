"use client";

import { useState, useRef, DragEvent } from "react";
import Image from "next/image";

interface FileDropZoneProps {
  label: string;
  hint?: string;
  multiple?: boolean;
  maxFiles?: number;
  value: File[] | File | null;
  onChange: (files: File[] | File | null) => void;
  error?: string;
}

function FileDropZone({
  label,
  hint,
  maxFiles = 1,
  multiple = false,
  value,
  onChange,
  error,
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const files: File[] = value ? (Array.isArray(value) ? value : [value]) : [];

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);

    if (multiple) {
      const combined = [...files, ...newFiles].slice(0, maxFiles);
      onChange(combined);
    } else {
      onChange(newFiles[0] ?? null);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    if (multiple) {
      onChange(files.filter((_, i) => i !== index));
    } else {
      onChange(null);
    }
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <p>{label}</p>
        {hint && <p>{hint}</p>}

        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {error && <p>{error}</p>}

      {files.length > 0 && (
        <div>
          {files.map((file, i) => (
            <div key={i}>
              <Image src={URL.createObjectURL(file)} alt={file.name} />
              <button type="button" onClick={() => removeFile(i)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default FileDropZone