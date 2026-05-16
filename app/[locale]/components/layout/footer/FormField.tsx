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
        <Icon className={`absolute left-3 ${isTextArea ? 'top-3' : 'top-1/2 -translate-y-1/2'} h-4 w-4 text-white/20`} />
        <InputComponent
          {...register}
          type={!isTextArea ? type : undefined}
          placeholder={placeholder}
          rows={isTextArea ? rows : undefined}
          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition resize-none ${
            error ? "border-red-500/50" : ""
          }`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}
