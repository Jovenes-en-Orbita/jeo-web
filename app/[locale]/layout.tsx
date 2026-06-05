import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    title: {
      default: messages.metadata.title,
      template: messages.metadata.titleTemplate,
    },
    description: messages.metadata.description,
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
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
