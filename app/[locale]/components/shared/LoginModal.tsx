"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Lock, Mail, Loader2 } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Algo salió mal");
      }

      onLoginSuccess(data.user);
      setEmail("");
      setPassword("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-[#0c0d12]/90 p-8 shadow-2xl backdrop-blur-md"
      >
        {/* Red Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo / Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white font-heading">
            Iniciar Sesión
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Acceso para el personal de Jóvenes en Órbita
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-lg bg-red-950/40 border border-red-900/60 p-3 text-sm text-red-400"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@jeo.com"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-red-950/40 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
