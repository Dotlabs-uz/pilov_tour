"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/(public)/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { StickyHeader } from "@/components/custom/StickyHeader";

interface Title {
  id: string;
  lang: string;
  title: string;
}

interface Description {
  id: string;
  lang: string;
  description: string;
}

interface Article {
  id: string;
  images: string[];
  titles: Title[];
  descriptions: Description[];
}

const Article = () => {
  const params = useParams();
  const rawId = params.id;

  const articleId = typeof rawId === "string" ? rawId : undefined;

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      const articleRef = doc(db, "articles", articleId);
      const articleSnap = await getDoc(articleRef);
      if (!articleSnap.exists()) return;

      const data = articleSnap.data() as DocumentData;

      const titlesSnap = await getDocs(
        collection(db, "articles", articleId, "titles")
      );
      const descriptionsSnap = await getDocs(
        collection(db, "articles", articleId, "descriptions")
      );

      const titles: Title[] = titlesSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as { lang: string; title: string }),
      }));
      const descriptions: Description[] = descriptionsSnap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as { lang: string; description: string }),
      }));

      setArticle({
        id: articleSnap.id,
        images: data.images || [],
        titles,
        descriptions,
      });
    };

    fetchArticle();
  }, [articleId]);

  if (!article) return <div className="p-4">Loading...</div>;

  const headerImage = article.images[0];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <StickyHeader/>
      {headerImage && (
        <div className="relative mt-15 h-96 w-full rounded-xl overflow-hidden">
          <img
            src={headerImage}
            alt={
              article.titles.find((t) => t.lang === "en")?.title || "Article"
            }
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          {article.titles.find((t) => t.lang === "en")?.title}
        </h1>
        <p className="text-gray-700 text-lg">
          {article.descriptions.find((d) => d.lang === "en")?.description}
        </p>
      </div>

      {article.images.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {article.images.slice(1).map((url) => (
            <img
              key={url}
              src={url}
              alt="article"
              className="w-full h-48 object-cover rounded-xl"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Article;
