"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(public)/firebase";
import Link from "next/link";

interface ArticleCard {
    id: string;
    title: string;
    coverImage: string;
}

const ArticlesList = () => {
    const [articles, setArticles] = useState<ArticleCard[]>([]);
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        const fetchArticles = async () => {
            const snapshot = await getDocs(collection(db, "articles"));
            const lang = locale.split("-")[0];

            const articlesData: ArticleCard[] = snapshot.docs.map((doc) => {
                const data = doc.data() as any;
                const titleObj = data.title || {};
                const title = titleObj[lang] || titleObj["en"] || Object.values(titleObj)[0] || "Untitled";

                return {
                    id: doc.id,
                    title,
                    coverImage: data.coverImage || "",
                };
            });

            setArticles(articlesData);
        };

        fetchArticles();
    }, [locale]);

    return (
        <div className="container max-w-[1200px] mx-auto px-4 py-12 lg:px-0" id="articles">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900">
                    Get inspired in the good times
                </h2>
                <Button
                    onClick={() => router.push("/articles")}
                    className="border border-[#8DD3BB] cursor-pointer bg-white text-[#112211] hover:bg-[#8DD3BB] px-5 py-2 rounded-lg font-semibold transition-colors"
                >
                    Read all articles
                </Button>
            </div>

            <Carousel opts={{ align: "start" }}>
                <CarouselContent>
                    {articles.map((a) => (
                        <CarouselItem key={a.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                            <Link
                                href={`/articles/${a.id}`}
                                className="flex-shrink-0 border rounded-2xl shadow hover:shadow-lg overflow-hidden bg-white flex flex-col"
                            >
                                {a.coverImage && (
                                    <img
                                        src={a.coverImage}
                                        alt={a.title}
                                        className="w-full h-56 object-cover"
                                    />
                                )}
                                <div className="p-4 flex flex-col">
                                    <h3 className="text-lg font-semibold text-[#112211] truncate">
                                        {a.title}
                                    </h3>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
    );
};

export default ArticlesList;
