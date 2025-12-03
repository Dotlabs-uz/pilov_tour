"use client";

import Subscribe from "@/components/custom/Subcribe";
import TourFilter from "@/components/custom/TourFilter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
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
  dates?: string[];
  inclusions?: {
    included: string[];
    notincluded: string[];
  };
  itinerary?: any;
  location?: string;
  maxGroupCount?: number;
  price: string;
  duration: {
    days: number | string;
    nights: number | string;
  };
  style: string;
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

const Tours = () => {
  const [tours, setTours] = useState<TourCard[]>([]);
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const fetchTours = async () => {
      const snapshot = await getDocs(collection(db, "tours"));

      const toursData: TourCard[] = snapshot.docs.map((tourDoc) => {
        const data = tourDoc.data() as TourPreview;

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
            duration: data.duration || {days: "", nights: ""},
            style: data.style || ""
          }
      });

      setTours(toursData);
    };

    fetchTours();
  }, [locale]);

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen">
      <StickyHeader />

      <section className="flex mt-20 justify-center">
        <TourFilter />
      </section>

      <main className="flex justify-between max-w-7xl mx-auto w-full px-4 mt-12">
        <section className="grid grid-cols-4 gap-5">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="rounded-2xl shadow bg-white overflow-hidden"
            >
              {tour.images[0] && (
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="h-48 w-full object-cover"
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
                  className="mt-2 cursor-pointer bg-[#8DD3BB] text-[#112211]"
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
