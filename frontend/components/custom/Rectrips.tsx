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
import { HotelsFlights } from "@/utils/Flights&Hotels";
import Card from "@/components/custom/Card";
import { useLocale } from "next-intl";
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

const RecTrips = () => {
  const [tours, setTours] = useState<TourPreview[]>([]);
  const router = useRouter();
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
    <div>
      <section className="flex container mx-auto flex-col my-10 gap-6">
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
                  <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition flex flex-col bg-white">
                    {tour.images?.[0] && (
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
                        onClick={() =>
                          router.push(`/trips/${tour.id}?id=${tour.id}`)
                        }
                        className="mt-2 cursor-pointer bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa]"
                      >
                        Explore
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* <div className="flex flex-col lg:flex-row mt-10 items-center gap-20 justify-between">
          {HotelsFlights.map((item, i) => (
            <Card
              key={i}
              name={item.name}
              description={item.description}
              image={item.imageUrl}
              button={item.button}
            />
          ))}
        </div> */}
      </section>
    </div>
  );
};

export default RecTrips;
