"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, User, MessageSquare, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import FormField from "./FormField";
import SuccessMessage from "./SuccessMessage";

type ContactFormData = {
  nombre: string;
  apellido: string;
  email: string;
  asunto: string;
  mensaje: string;
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("footer");

  const contactSchema = z.object({
    nombre: z.string().min(2, t("firstNameRequired")),
    apellido: z.string().min(2, t("lastNameRequired")),
    email: z.string().email(t("emailInvalid")),
    asunto: z.string().min(3, t("subjectRequired")),
    mensaje: z.string().min(10, t("messageMin")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(t("errorSending"));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert(t("errorSending"));
    }
  };

  return (
    <div className="relative">
      <div className="rounded-none bg-zinc-950/60 border border-zinc-800 p-6 lg:p-8">
        <h3 className="text-xl font-bold uppercase tracking-wider text-white text-center mb-1 font-heading">
          {t("formTitle")}
        </h3>
        <p className=" text-zinc-400 text-center mb-6 tracking-wide">
          {t("formSubtitle")}
        </p>

        {submitted ? (
          <SuccessMessage
            title={t("successMessage")}
            subtext={t("successSubtext")}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                icon={User}
                placeholder={t("firstName")}
                register={register("nombre")}
                error={errors.nombre}
              />
              <FormField
                icon={User}
                placeholder={t("lastName")}
                register={register("apellido")}
                error={errors.apellido}
              />
            </div>

            <FormField
              icon={Mail}
              type="email"
              placeholder={t("email")}
              register={register("email")}
              error={errors.email}
            />

            <FormField
              icon={FileText}
              placeholder={t("subject")}
              register={register("asunto")}
              error={errors.asunto}
            />

            <FormField
              icon={MessageSquare}
              isTextArea
              placeholder={t("message")}
              register={register("mensaje")}
              error={errors.mensaje}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-none bg-nasa-red hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300  font-bold uppercase tracking-widest text-white cursor-pointer"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? t("sending") : t("send")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
