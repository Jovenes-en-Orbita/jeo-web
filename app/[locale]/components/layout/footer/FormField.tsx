"use client";

import { LucideIcon } from "lucide-react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  icon: LucideIcon;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  type?: string;
  isTextArea?: boolean;
  rows?: number;
}

export default function FormField({
  icon: Icon,
  placeholder,
  error,
  register,
  type = "text",
  isTextArea = false,
  rows = 4,
}: FormFieldProps) {
  const InputComponent = isTextArea ? "textarea" : "input";
  
  return (
    <div className="w-full">
      <div className="relative">
        <Icon className={`absolute left-3 ${isTextArea ? 'top-3' : 'top-1/2 -translate-y-1/2'} h-4 w-4 text-zinc-500`} />
        <InputComponent
          {...register}
          type={!isTextArea ? type : undefined}
          placeholder={placeholder}
          rows={isTextArea ? rows : undefined}
          className={`w-full pl-10 pr-4 py-3 rounded-none bg-black/40 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-nasa-red focus:border-nasa-red transition resize-none ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 font-bold">
          {error.message}
        </p>
      )}
    </div>
  );
}
