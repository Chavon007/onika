"use client";

import { useState, useRef, DragEvent } from "react";
import Image from "next/image";
import { FiUploadCloud, FiX } from "react-icons/fi";

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
    <div className="flex flex-col gap-3">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
          isDragging ? "border-primary bg-primary/5" : "border-black/30"
        } ${error ? "border-red-500" : ""}`}
      >
        <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center">
          <FiUploadCloud className="text-xl text-black/60" />
        </div>
        <p className="text-sm font-bold text-black/80">{label}</p>
        {hint && <p className="text-xs text-black/50">{hint}</p>}

        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {files.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {files.map((file, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded-xl overflow-hidden border border-black/20"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-black/60 text-white"
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default FileDropZone;