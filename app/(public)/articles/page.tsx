"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/app/(public)/firebase";
import { collection, getDocs } from "firebase/firestore";
import { StickyHeader } from "@/components/custom/StickyHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLocale } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

interface ArticleCard {
  id: string;
  title: string;
  coverImage: string;
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<ArticleCard[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    const fetchArticles = async () => {
      const snapshot = await getDocs(collection(db, "articles"));
      const lang = locale.split("-")[0] as string;

      const data: ArticleCard[] = snapshot.docs.map((doc) => {
        const d = doc.data() as any;

        const titleObj = d.title || {};
        const title =
          titleObj[lang] ||
          titleObj["en"] ||
          Object.values(titleObj)[0] ||
          "Untitled";

        return {
          id: doc.id,
          title,
          coverImage: d.coverImage || "",
        };
      });

      setArticles(data);
      setLoading(false);
    };

    fetchArticles();
  }, [locale]);

  const skeletons = Array.from({ length: 5 });

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0">
      <StickyHeader />

      <Carousel opts={{ align: "start" }} className="py-20">
        <CarouselContent>
          {loading
            ? skeletons.map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex-shrink-0 border rounded-2xl shadow overflow-hidden bg-white flex flex-col">
                    <Skeleton className="w-full h-56 rounded-xl" />
                    <div className="p-4 flex flex-col gap-2">
                      <Skeleton className="h-6 w-3/4 rounded-lg" />
                    </div>
                  </div>
                </CarouselItem>
              ))
            : articles.map((a) => (
                <CarouselItem
                  key={a.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
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

export default ArticlesPage;
