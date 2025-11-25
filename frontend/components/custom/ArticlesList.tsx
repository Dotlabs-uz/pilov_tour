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

export function ArticlesList() {
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

    const carouselArticles = articles.slice(0, 5);

<<<<<<< HEAD
  return (
    <div className="container max-w-[1200px] mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Get inspired in the good times
        </h2>
        <Link
          href="/articles"
          className="border border-[#8DD3BB] cursor-pointer text-[#112211] hover:bg-[#8DD3BB] px-5 py-2 rounded-lg font-semibold transition-colors"
        >
          Read all articles
        </Link>
      </div>
=======
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Get inspired in the good times
                </h2>
>>>>>>> f626d045a02a07528dc206c161673e6204d1faa4

                <Link
                    href="/articles"
                    className="border border-[#8DD3BB] cursor-pointer text-[#112211] hover:bg-[#8DD3BB] px-4 py-2 sm:px-5 sm:py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base w-fit">
                    Read all articles
                </Link>
            </div>

            <div className="flex gap-6 overflow-x-auto scrollbar-hide py-2">
                {carouselArticles.map((a) => (
                    <Link
                        key={a.id}
                        href={`/articles/${a.id}`}
                        className="flex-shrink-0 w-80 border rounded-xl shadow hover:shadow-lg overflow-hidden bg-white"
                    >
                        {a.images[0] && (
                            <img
                                src={a.images[0]}
                                alt={a.titles[0]?.title || "Article image"}
                                className="w-full h-40 object-cover"
                            />
                        )}
                        <div className="p-4 flex flex-col">
                            <h3 className="text-lg font-bold text-slate-900">
                                {a.titles[0]?.title}
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                                {a.descriptions[0]?.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
