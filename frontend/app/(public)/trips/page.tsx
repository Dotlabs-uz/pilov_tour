"use client";

import HeaderforOther from "@/components/custom/Header-otherPages";
import Subscribe from "@/components/custom/Subcribe";
import TourFilter from "@/components/custom/TourFilter";
import { useEffect, useState } from "react";
import { appwriteConfig, database } from "../appwrite";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

interface TripDocument {
  $id: string;
  titles: Array<{
    title: string;
    lang: string;
    $id: string;
  }>;
  images: string[];
  descriptions: Array<{
    description: string;
    lang: string;
    $id: string;
  }>;
}

const Tours = () => {
  const [trips, setTrips] = useState<TripDocument[]>([]);
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.tourCollectionId
        );
        setTrips(response.documents as unknown as TripDocument[]);
      } catch (e) {
        console.error("Something went wrong", e);
      }
    };
    fetchTrips();
  }, []);

  console.log(trips);

  const getTitleByLocale = (trip: TripDocument) => {
    const localized = trip.titles.find((t) => t.lang === locale);
    return localized?.title ?? trip.titles?.[0]?.title ?? "Untitled Trip";
  };

  const getDescriptionByLocale = (trip: TripDocument) => {
    const localized = trip.descriptions.find((d) => d.lang === locale);
    return (
      localized?.description ??
      trip.descriptions?.[0]?.description ??
      "No description available."
    );
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen">
      <HeaderforOther />

      <section className="flex justify-center mt-8">
        <TourFilter />
      </section>

      <main className="flex justify-between max-w-7xl mx-auto w-full px-4 mt-12">
        <section className="grid grid-cols-4 gap-5">
          {trips.map((trip, i) => (
            <div
              key={trip.$id || i}
              className="basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition flex flex-col bg-white">
                {trip.images?.[0] && (
                  <img
                    src={trip.images[0]}
                    alt={getTitleByLocale(trip)}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-[#112211]">
                    {getTitleByLocale(trip)}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {getDescriptionByLocale(trip)}
                  </p>
                  <Button
                    onClick={() =>
                      router.push(`/trips/${trip.$id}?id=${trip.$id}`)
                    }
                    className="mt-2 cursor-pointer bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa]"
                  >
                    Explore
                  </Button>
                </div>
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
