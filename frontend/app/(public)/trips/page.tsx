"use client";

import Subscribe from "@/components/custom/Subcribe";
import TourFilter from "@/components/custom/TourFilter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { StickyHeader } from "@/components/custom/StickyHeader";

export type LangCodes = "en" | "ru" | "ge" | "it" | "sp" | "uk" | "uz";

export type MultiLangString = {
  [key in LangCodes]?: string;
};

export interface TourPreview {
  id: string;
  images: string[];
  title: MultiLangString;
  description: MultiLangString;
  price: string;
  duration: {
    days: number | string;
    nights: number | string;
  };
  style: string;
  category?: string;
}

export interface TourCard {
  id: string;
  images: string[];
  title: string;
  description: string;
  price: string;
  duration: {
    days: number | string;
    nights: number | string;
  };
  style: string;
}

export interface Category {
  id: string;
  destination: string;
  image: string;
}

const Tours = () => {
  const [tours, setTours] = useState<TourCard[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    const fetchTours = async () => {
      const snapshot = await getDocs(collection(db, "tours"));

      const toursData: TourCard[] = snapshot.docs
        .map((tourDoc) => {
          const data = tourDoc.data() as TourPreview;

          if (activeCategory && data.category !== activeCategory) {
            return null;
          }

          const titleObj = data.title || {};
          const descObj = data.description || {};

          const title =
            titleObj[locale as keyof typeof titleObj] ||
            titleObj["en"] ||
            Object.values(titleObj)[0] ||
            "";

          const description =
            descObj[locale as keyof typeof descObj] ||
            descObj["en"] ||
            Object.values(descObj)[0] ||
            "";

          return {
            id: tourDoc.id,
            images: data.images || [],
            title,
            description,
            price: data.price || "",
            duration: data.duration || { days: "", nights: "" },
            style: data.style || "",
          };
        })
        .filter(Boolean) as TourCard[];

      setTours(toursData);
    };

    fetchTours();
  }, [locale, activeCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));

      const categoriesDb: Category[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Category, "id">),
      }));

      setCategories(categoriesDb);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen px-4">
      <StickyHeader />

      {/* FILTER */}
      <section className="mt-24 bg-white rounded-2xl shadow-sm py-6 flex justify-center">
        <TourFilter />
      </section>

      {/* ACTIVE CATEGORY */}
      {activeCategory && (
        <p className="text-center mt-6 text-sm text-gray-500">
          Showing tours for:{" "}
          <span className="font-semibold">{activeCategory}</span>
        </p>
      )}

      {/* CATEGORIES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              router.push(`/trips?category=${category.destination}`)
            }
            className="
              cursor-pointer h-[160px] p-5
              rounded-2xl bg-white
              shadow-md hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
              flex items-center justify-between
            "
          >
            <p className="text-lg font-bold text-[#112211]">
              {category.destination}
            </p>
            <img
              src={category.image}
              alt="category"
              className="w-[120px] h-[100px] rounded-xl object-cover"
            />
          </div>
        ))}
      </section>

      {/* TOURS */}
      <main className="mt-20">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="
                rounded-2xl bg-white overflow-hidden
                shadow-md hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              {tour.images[0] && (
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="h-52 w-full object-cover"
                />
              )}

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-[#112211]">
                  {tour.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {tour.description}
                </p>

                <Button
                  onClick={() => router.push(`/trips/${tour.id}`)}
                  className="
                    mt-2 bg-[#8DD3BB] text-[#112211]
                    hover:bg-[#6fbfa3]
                    transition-colors
                  "
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Subscribe />
    </div>
  );
};

export default Tours;
