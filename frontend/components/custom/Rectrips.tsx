"use client";
import { appwriteConfig, database } from "@/app/(public)/appwrite";
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

const RecTrips = () => {
    const [trips, setTrips] = useState<TripDocument[]>([]);
    const router = useRouter();
    const locale = useLocale();

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
        <div>
            <section className="flex container mx-auto flex-col my-10 gap-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <p className="text-xl font-semibold">Plan your perfect trip</p>
                        <span className="text-gray-500 text-sm">
                            Search Flights & Places Hire to our most popular destinations
                        </span>
                    </div>
                    <Button onClick={() => router.push("/trips")} className="bg-white cursor-pointer hover:bg-[#8DD3BB] text-[#112211] border border-[#8DD3BB]">
                        See more places
                    </Button>
                </div>
                <div className="w-full ">
                    <Carousel opts={{ align: "start" }}>
                        <CarouselContent>
                            {trips.map((trip, i) => (
                                <CarouselItem
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
