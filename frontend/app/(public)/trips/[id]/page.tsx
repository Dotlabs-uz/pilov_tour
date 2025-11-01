"use client";

import HeaderforOther from "@/components/custom/Header-otherPages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FaLocationDot, FaClock, FaTag, FaHeart } from "react-icons/fa6";
import { FaShareAlt, FaUserFriends } from "react-icons/fa";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Review from "@/components/custom/Review";
import EndComponent from "@/components/custom/EndComponent";
import Subscribe from "@/components/custom/Subcribe";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { appwriteConfig, database } from "../../appwrite";
import { Query } from "appwrite";
import { useLocale } from "next-intl";

interface Trip {
  $id: string;
  titles: Array<{ title: string; lang: string }>;
  descriptions: Array<{ description: string; lang: string }>;
  images: string[];
  price: string;
  style: string;
  duration: string;
}

export default function TourPage() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const searchParams = useSearchParams();
  const tripId = searchParams.get("id");
  const locale = useLocale();

  useEffect(() => {
    if (!tripId) return;

    const fetchTrip = async () => {
      try {
        const res = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.tourCollectionId,
          [Query.equal("$id", tripId)]
        );
        if (res.documents.length > 0) {
          setTrip(res.documents[0] as unknown as Trip);
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };
    fetchTrip();
  }, [tripId]);

  console.log(trip);

  if (!trip) return <div className="text-center py-20">Trip not found</div>;

  const title =
    trip.titles?.find((t) => t.lang === locale)?.title || "Без названия";
  const description =
    trip.descriptions?.find((d) => d.lang === locale)?.description ||
    "Без описания";
  const image = trip.images?.[0] || "/tourImage1.jpg";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderforOther />

      <div className="max-w-[1250px] w-full mx-auto px-4 md:px-6 lg:px-0 mt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/tours">Туры</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 mb-6 border-b pb-6 border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#112211]">
                {title}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <FaLocationDot /> Узбекистан
                </p>
                <div className="flex items-center gap-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <CiStar key={i} size={16} />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">
                    4.8 · 230 отзывов
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button className="bg-white text-[#8DD3BB] hover:bg-gray-100 border border-[#8DD3BB] w-11 h-11 flex items-center justify-center rounded-md">
                <FaHeart />
              </Button>
              <Button className="bg-white text-[#8DD3BB] hover:bg-gray-100 border border-[#8DD3BB] w-11 h-11 flex items-center justify-center rounded-md">
                <FaShareAlt />
              </Button>
              <Button className="bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa] w-[150px] h-11 rounded-md font-semibold">
                Забронировать
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative w-full h-[440px] md:h-[520px] lg:h-[420px]">
                <Image src={image} alt={title} fill className="object-cover" />
              </div>
            </div>

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-3">Обзор</h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Why you’ll love this trip
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold">Premium accommodation</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Hand-picked boutique and luxury hotels.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold">Premium experiences</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Local guides & unique cultural activities.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold">Premium knowledge</p>
                  <p className="text-sm text-gray-600 mt-2">
                    In-depth historical & cultural insight.
                  </p>
                </div>
              </div>
            </section>

            {/* Itinerary */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>
              <Accordion type="single" collapsible>
                <AccordionItem value="it-day-1">
                  <AccordionTrigger>
                    Day 1 – Arrival in Tashkent
                  </AccordionTrigger>
                  <AccordionContent>
                    Meet your guide on arrival, transfer to the hotel and short
                    city orientation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="it-day-2">
                  <AccordionTrigger>Day 2 – Samarkand</AccordionTrigger>
                  <AccordionContent>
                    Full day exploring Registan Square, Gur-Emir Mausoleum and
                    Shah-i-Zinda.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="it-day-3">
                  <AccordionTrigger>Day 3 – Bukhara</AccordionTrigger>
                  <AccordionContent>
                    Visit Lyabi-Hauz, the Ark Fortress and stroll ancient
                    markets.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Inclusions */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">
                Inclusions and activities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Included</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>Accommodation in premium hotels</li>
                    <li>Daily breakfast and some dinners</li>
                    <li>Professional English-speaking guide</li>
                    <li>All internal transfers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Not included</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>International flights</li>
                    <li>Visa fees</li>
                    <li>Optional excursions</li>
                    <li>Travel insurance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Dates & Prices */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Dates & Prices</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#8DD3BB] text-[#112211]">
                      <th className="p-3">Start</th>
                      <th className="p-3">End</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-t">
                      <td className="p-3">Jan 10, 2025</td>
                      <td className="p-3">Jan 17, 2025</td>
                      <td className="p-3 text-green-600">Available</td>
                      <td className="p-3 text-right font-semibold">$2,395</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Feb 05, 2025</td>
                      <td className="p-3">Feb 12, 2025</td>
                      <td className="p-3 text-red-600">Few spots</td>
                      <td className="p-3 text-right font-semibold">$2,495</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Отзывы</h3>
                <Button className="bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa] rounded-md px-4 py-2">
                  Оставить отзыв
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <Review />
                <Review />
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-500">Цена за человека</p>
                  <h4 className="text-2xl font-bold text-[#112211]">
                    ${trip.price || "N/A"}
                  </h4>
                </div>

                <div className="flex flex-col gap-3 text-gray-700 text-sm">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-[#8DD3BB]" />
                    <div>
                      <p className="text-sm font-medium">Длительность</p>
                      <p className="text-sm">{trip.duration || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaTag className="text-[#8DD3BB]" />
                    <div>
                      <p className="text-sm font-medium">Класс тура</p>
                      <p className="text-sm">{trip.style || "—"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaUserFriends className="text-[#8DD3BB]" />
                    <div>
                      <p className="text-sm font-medium">Группа</p>
                      <p className="text-sm">до 12 человек</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa] rounded-lg font-semibold mt-2">
                  Забронировать
                </Button>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    Includes: accommodation, breakfasts, guides, transfers.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Free cancellation up to 30 days before departure (T&Cs
                    apply).
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <EndComponent />
          <EndComponent />
          <EndComponent />
        </div>

        <div className="mt-10">
          <Subscribe />
        </div>
      </div>
    </div>
  );
}
