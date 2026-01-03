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
import { useLocale, useTranslations } from "next-intl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(public)/firebase";
import { TourPreview } from "@/app/(public)/trips/page";

export interface TourPreviewCard {
  id: string;
  images: string[];
  title: string;
  description: string;
  price: string;
  duration: {
    days: string | number;
    nights: string | number;
  };
  style: string;
}

const RecTrips = () => {
  const [tours, setTours] = useState<TourPreviewCard[]>([]);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("recTrips");

  useEffect(() => {
    const fetchTours = async () => {
      const snapshot = await getDocs(collection(db, "tours"));

      console.log(snapshot);

      const toursData: TourPreviewCard[] = snapshot.docs.map((tourDoc) => {
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
          duration: data.duration || { days: "", nights: "" },
          style: data.style || "",
        };
      });
      setTours(toursData);
    };

    fetchTours();
  }, [locale]);

  return (
    <div>
      <section className="flex container max-w-[1200px] mx-auto flex-col my-10 gap-6 px-4 lg:px-0">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Plan your perfect trip</p>
            <span className="text-gray-500 text-sm">
              Search Flights & Places Hire to our most popular destinations
            </span>
          </div>
          <Button
            onClick={() => router.push("/trips")}
            className="bg-white cursor-pointer hover:bg-[#8DD3BB] text-[#112211] border border-[#8DD3BB]"
          >
            See more places
          </Button>
        </div>
        <div className="w-full ">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {tours.map((tour, i) => (
                <CarouselItem
                  key={tour.id || i}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div
                    onClick={() => router.push(`/trips/${tour.id}`)}
                    className="rounded-2xl cursor-pointer overflow-hidden shadow hover:shadow-lg transition flex flex-col bg-white"
                  >
                    <div className="relative h-64 w-full">
                      <img
                        src={tour.images?.[0]}
                        alt={tour.title}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <h3 className="text-white truncate text-2xl font-bold text-center px-4 drop-shadow-lg">
                          {tour.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-1">
                      <p className="text-sm font-medium text-gray-500">
                        {tour.duration?.days} days
                      </p>

                      <p className="text-lg truncate font-semibold text-[#112211]">
                        {tour.title}
                      </p>

                      <p className="text-sm items-end mt-2">
                        <span className="text-black font-bold text-lg">
                          USD ${tour.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default RecTrips;
