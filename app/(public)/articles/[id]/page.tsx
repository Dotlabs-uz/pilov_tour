"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/(public)/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useLocale } from "next-intl";
import { StickyHeader } from "@/components/custom/StickyHeader";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Article() {
  const { id } = useParams();
  const locale = useLocale();

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
  if (!article) return <div className="p-10 text-center">Not Found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-0">

      <div className="py-20 mt-5">
        <div className="relative w-full h-96 rounded-xl overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold mt-6">{article.title}</h1>

        <p className="text-gray-700 text-lg mt-4 leading-relaxed whitespace-pre-line">
          {article.description}
        </p>
      </div>
    </div>
  );
}
