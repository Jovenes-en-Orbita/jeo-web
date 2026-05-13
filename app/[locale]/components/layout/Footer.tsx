"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, User, MessageSquare, FileText, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

type ContactFormData = {
  nombre: string;
  apellido: string;
  email: string;
  asunto: string;
  mensaje: string;
};

export default function Footer() {
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
  };

  return (
    <footer
      id="contacto"
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://i.postimg.cc/9F5xdrB7/2022-E3-2022-08-29-fichtl.webp')",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: About Text */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
              JEO
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent mb-8" />

            <div className="space-y-4 text-sm leading-relaxed text-white/60">
              <p>{t("aboutText1")}</p>
              <p>{t("aboutText2")}</p>
              <p className="text-white/40 text-xs italic">
                {t("weeklyNote")}
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="relative">
            <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-white text-center mb-1">
                {t("formTitle")}
              </h3>
              <p className="text-xs text-white/40 text-center mb-6">
                {t("formSubtitle")}
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Send className="h-7 w-7 text-green-400" />
                  </div>
                  <p className="text-green-400 font-medium">
                    {t("successMessage")}
                  </p>
                  <p className="text-white/40 text-sm mt-1">
                    {t("successSubtext")}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <input
                          {...register("nombre")}
                          placeholder={t("firstName")}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition"
                        />
                      </div>
                      {errors.nombre && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.nombre.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <input
                          {...register("apellido")}
                          placeholder={t("lastName")}
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition"
                        />
                      </div>
                      {errors.apellido && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.apellido.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                      <input
                        {...register("email")}
                        type="email"
                        placeholder={t("email")}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                      <input
                        {...register("asunto")}
                        placeholder={t("subject")}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition"
                      />
                    </div>
                    {errors.asunto && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.asunto.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-white/20" />
                      <textarea
                        {...register("mensaje")}
                        rows={4}
                        placeholder={t("message")}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition resize-none"
                      />
                    </div>
                    {errors.mensaje && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.mensaje.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium text-white hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? t("sending") : t("send")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <a href="#" className="text-white/20 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/20 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/20 hover:text-white transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/20 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
