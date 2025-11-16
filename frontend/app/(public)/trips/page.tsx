"use client";

import HeaderforOther from "@/components/custom/Header-otherPages";
import Subscribe from "@/components/custom/Subcribe";
import TourFilter from "@/components/custom/TourFilter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface TourPreview {
  id: string;
  images: string[];
  titles: { lang: string; title: string }[];
  descriptions: { lang: string; description: string }[];
  price: string;
  duration: string;
  style: string;
}

const Tours = () => {
  const [tours, setTours] = useState<TourPreview[]>([]);
  const locale = useLocale();
  const router = useRouter();

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
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen">
      <HeaderforOther />

      <section className="flex justify-center mt-8">
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
                  alt={tour.titles[0].title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-[#112211]">
                  {tour.titles[0].title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {tour.descriptions[0].description}
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
