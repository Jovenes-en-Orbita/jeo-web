import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Calendar, Tag, User, Share2 } from "lucide-react";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <NewsDetailContent slug={slug} />;
}

function NewsDetailContent({ slug }: { slug: string }) {
  const t = useTranslations("newsDetail");

  // Mock data fetching based on slug
  const news = {
    title: slug.split("-").join(" ").toUpperCase(),
    date: "2024-03-15",
    category: "Astronomía",
    author: "JEO Team",
    image: "https://i.ibb.co/TDqySwcs/Hubble-ultra-deep-field.jpg",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
  };

  return (
    <article className="min-h-screen bg-[#050508] text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/#noticias"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {t("back")}
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
              <Tag className="h-3 w-3" />
              {news.category}
            </span>
            <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest">
              <Calendar className="h-3.5 w-3.5" />
              {news.date}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            {news.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                <User className="h-5 w-5 text-white/60" />
              </div>
              <div>
                <span className="block text-xs text-white/40 uppercase tracking-widest">{t("author")}</span>
                <span className="text-sm font-medium">{news.author}</span>
              </div>
            </div>
            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 mb-12 shadow-2xl">
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/60 prose-p:leading-relaxed prose-headings:text-white">
          <p>{news.content}</p>
          <p>{news.content}</p>
        </div>
      </div>
    </article>
  );
}
