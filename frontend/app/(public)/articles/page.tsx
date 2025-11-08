"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/app/(public)/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

interface ArticlePreview {
  id: string;
  images: string[];
  titles: { lang: string; title: string }[];
  descriptions: { lang: string; description: string }[];
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<ArticlePreview[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const snapshot = await getDocs(collection(db, "articles"));

      const data: ArticlePreview[] = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const docData = docSnap.data() as DocumentData;

          const titlesSnap = await getDocs(
            collection(db, "articles", docSnap.id, "titles")
          );
          const descriptionsSnap = await getDocs(
            collection(db, "articles", docSnap.id, "descriptions")
          );

          const titleData = titlesSnap.docs
            .find((d) => d.data().lang === "en")
            ?.data();
          const title = {
            lang: titleData?.lang || "en",
            title: titleData?.title || "",
          };

          const descriptionData = descriptionsSnap.docs
            .find((d) => d.data().lang === "en")
            ?.data();
          const description = {
            lang: descriptionData?.lang || "en",
            description: descriptionData?.description || "",
          };

          return {
            id: docSnap.id,
            images: docData.images || [],
            titles: [title],
            descriptions: [description],
          };
        })
      );

      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-wrap gap-6">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/articles/${a.id}`}
            className="block w-64 border rounded-xl shadow hover:shadow-lg overflow-hidden"
          >
            {a.images[0] && (
              <img
                src={a.images[0]}
                alt={a.titles[0]?.title || "Article image"}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4 flex flex-col">
              <h2 className="text-lg font-bold">{a.titles[0]?.title}</h2>
              <p className="mt-2 text-gray-600 text-sm">
                {a.descriptions[0]?.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
