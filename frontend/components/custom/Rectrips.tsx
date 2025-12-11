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
import { TourCard, TourPreview } from "./UpcomingTours";

const RecTrips = () => {
    const [tours, setTours] = useState<TourCard[]>([]);
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("recTrips");

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
                        <p className="text-xl font-semibold">{t("section_title")}</p>
                        <span className="text-gray-500 text-sm">{t("section_subtitle")}</span>
                    </div>
                    <Button
                        onClick={() => router.push("/trips")}
                        className="bg-white cursor-pointer hover:bg-[#8DD3BB] text-[#112211] border border-[#8DD3BB]"
                    >
                        {t("see_more")}
                    </Button>
                </div>
                <div className="w-full ">
                    <Carousel opts={{ align: "start" }}>
                        <CarouselContent>
                            {tours.map((tour) => (
                                <CarouselItem
                                    key={tour.id}
                                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition flex flex-col bg-white">
                                        {tour.images?.[0] && (
                                            <img
                                                src={tour.images[0]}
                                                alt={tour.title}
                                                className="h-48 w-full object-cover"
                                            />
                                        )}
                                        <div className="p-4 flex flex-col gap-2">
                                            <h3 className="text-lg font-semibold text-[#112211] truncate">
                                                {tour.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-3">
                                                {tour.description}
                                            </p>
                                            <Button
                                                onClick={() =>
                                                    router.push(`/trips/${tour.id}?id=${tour.id}`)
                                                }
                                                className="mt-2 cursor-pointer bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa]"
                                            >
                                                {t("explore")}
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
            </section>
        </div>
    );
};

export default RecTrips;

