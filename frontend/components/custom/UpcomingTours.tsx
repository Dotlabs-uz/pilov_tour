"use client";

import { useLocale, useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(public)/firebase";

interface TourPreview {
  id: string;
  images: string[];
  titles: { lang: string; title: string }[];
  descriptions: { lang: string; description: string }[];
  price: string;
  duration: string;
  style: string;
}

export default function UpcomingTours() {
  const [tours, setTours] = useState<TourPreview[]>([]);
  const t = useTranslations("tours");
  const locale = useLocale();

  useEffect(() => {
    const fetchTours = async () => {
      const snapshot = await getDocs(collection(db, "tours"));

      const toursData: TourPreview[] = await Promise.all(
        snapshot.docs.map(async (tourDoc) => {
          const data = tourDoc.data();

          const titlesSnap = await getDocs(
            collection(db, "tours", tourDoc.id, "titles")
          );
          const descriptionsSnap = await getDocs(
            collection(db, "tours", tourDoc.id, "descriptions")
          );

          const titles = titlesSnap.docs.map(
            (d) => d.data() as { lang: string; title: string }
          );

          const descriptions = descriptionsSnap.docs.map(
            (d) => d.data() as { lang: string; description: string }
          );

          const selectedTitle = titles.find((t) => t.lang === locale) ||
            titles.find((t) => t.lang === "en") ||
            titles[0] || { title: "", lang: "en" };

          const selectedDescription = descriptions.find(
            (d) => d.lang === locale
          ) ||
            descriptions.find((d) => d.lang === "en") ||
            descriptions[0] || { description: "", lang: "en" };

          return {
            id: tourDoc.id,
            images: data.images || [],
            titles: [selectedTitle],
            descriptions: [selectedDescription],
            price: data.price || "",
            duration: data.duration || "",
            style: data.style || "",
          };
        })
      );

      setTours(toursData);
    };

    fetchTours();
  }, [locale]);

  
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#8DD3BB] bg-opacity-10 rounded-full px-4 py-2 mb-4">
            <span className="text-white font-semibold text-sm">
              {t("badge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-40 overflow-hidden bg-gray-100">
                <img
                  src={tour.images[0] || "/placeholder.svg"}
                  alt={tour.titles[0].title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="inline-block bg-[#8DD3BB] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {tour.duration}
                </div>

                <h3 className="text-lg font-bold text-black mb-2">
                  {tour.titles[0].title}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                  {tour.descriptions[0].description}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    {t("style")}
                  </p>
                  <p className="text-gray-700 text-sm">{tour.style}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-semibold mb-1">
                      {t("duration")}
                    </p>
                    <p className="text-lg font-bold text-[#8DD3BB]">
                      {tour.duration}
                    </p>
                    <p className="text-xs text-gray-500">{t("days")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-semibold mb-1">
                      {t("status")}
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      {t("available")}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 font-semibold mb-1">
                      {t("price")}
                    </p>
                    <p className="font-bold text-[#8DD3BB]">US${tour.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button className="bg-[#8DD3BB] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors">
                    {t("book_now")}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
