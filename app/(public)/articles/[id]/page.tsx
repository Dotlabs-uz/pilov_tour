"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/(public)/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function Article() {
  const { id } = useParams();
  const locale = useLocale();
  const t = useTranslations("pages");

  const { toast } = useToast();

  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const ref = doc(db, "articles", id as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      const data = snap.data() as any;
      const lang = locale.split("-")[0];

      const titleObj = data.title || {};
      const descObj = data.description || {};

      setArticle({
        coverImage: data.coverImage || "",
        title:
          titleObj[lang] ||
          titleObj.en ||
          Object.values(titleObj)[0] ||
          "Untitled",
        description:
          descObj[lang] || descObj.en || Object.values(descObj)[0] || "",
      });

      setLoading(false);
    };

    fetchArticle();
  }, [id, locale]);

  if (loading)
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mt-10 space-y-6">
          <Skeleton className="w-full h-96 rounded-xl" />
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="h-6 w-full rounded-lg" />
          <Skeleton className="h-6 w-full rounded-lg" />
        </div>
      </div>
    );
  if (!article) return <div className="p-10 text-center">{t("not_found")}</div>;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/articles"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t("articles_title")}
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="text-sm px-3 py-2 bg-white rounded-full shadow-sm hover:shadow-md"
            >
              {t("common.share") || t("share")}
            </button>
          </div>
        </div>

        <div className="relative w-full h-[420px] md:h-[520px] rounded-xl overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute left-6 bottom-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow">
              {article.title}
            </h1>
          </div>
        </div>

        <article className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
          <div className="prose max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
            {article.description}
          </div>
        </article>
      </div>
    </main>
  );
}
