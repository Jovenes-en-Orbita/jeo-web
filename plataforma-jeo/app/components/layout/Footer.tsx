"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, User, MessageSquare, FileText } from "lucide-react";
import { useState } from "react";

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  apellido: z.string().min(2, "El apellido es requerido"),
  email: z.string().email("Correo electrónico inválido"),
  asunto: z.string().min(3, "El asunto es requerido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const formData = new FormData();
    formData.append("Nombre", data.nombre);
    formData.append("Apellido", data.apellido);
    formData.append("Correo electrónico", data.email);
    formData.append("Asunto", data.asunto);
    formData.append("Mensaje", data.mensaje);

    await fetch("https://formsubmit.co/santi.gar.paredes@gmail.com", {
      method: "POST",
      body: formData,
    });

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
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
              UPT
            </h2>
            <div className="h-px w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent mb-8" />

            <div className="space-y-4 text-sm leading-relaxed text-white/60">
              <p>
                La página &quot;Universo para todos&quot; fue diseñada con el
                propósito de enseñar al público sobre ciencia, específicamente en
                el área del conocimiento sobre el cosmos, su composición, origen y
                estructuras presentes en él. Aquí, encontrarás información vital
                sobre gran cantidad de astros, desde su origen, evolución y fin de
                su existencia, hasta de fenómenos presentes tanto en nuestra vida
                cotidiana, como a miles de millones de años luz.
              </p>
              <p>
                El sitio web fue creado para que sea una forma entretenida de
                aprender sobre la naturaleza de todo lo que existió, existe y
                existirá. Además, dispone de varias fuentes de información si le
                interesa aprender en persona, sobre este campo de la ciencia.
              </p>
              <p className="text-white/40 text-xs italic">
                El dato astronómico se actualizará cada semana con información nueva
                y variada.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="relative">
            <div className="rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-white text-center mb-1">
                Envíe su consulta
              </h3>
              <p className="text-xs text-white/40 text-center mb-6">
                o reporte cualquier problema del sitio web
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Send className="h-7 w-7 text-green-400" />
                  </div>
                  <p className="text-green-400 font-medium">
                    ¡Mensaje enviado con éxito!
                  </p>
                  <p className="text-white/40 text-sm mt-1">
                    Responderemos a la brevedad.
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
                          placeholder="Nombre"
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
                          placeholder="Apellido"
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
                        placeholder="Correo electrónico"
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
                        placeholder="Asunto"
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
                        placeholder="Mensaje"
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
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Universo Para Todos. Hecho con ✦ para explorar el cosmos.
          </p>
        </div>
      </div>
    </footer>
  );
}
