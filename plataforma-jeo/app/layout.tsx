import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Universo Para Todos | Explorá el Cosmos",
    template: "%s | Universo Para Todos",
  },
  description:
    "Descubrí los misterios del universo: desde la composición de la materia oscura hasta las constelaciones. Información educativa sobre astronomía y ciencia espacial.",
  keywords: [
    "astronomía",
    "universo",
    "cosmos",
    "sistema solar",
    "planetas",
    "estrellas",
    "galaxias",
    "nebulosas",
    "constelaciones",
    "ciencia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
