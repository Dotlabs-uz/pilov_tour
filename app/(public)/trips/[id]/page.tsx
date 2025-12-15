"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { db } from "@/app/(public)/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

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
import { StickyHeader } from "@/components/custom/StickyHeader";

type Lang = "en" | "ru" | "uz";

interface MultiLangString {
  en?: string;
  ru?: string;
  uz?: string;
}

interface Duration {
  days?: string | number;
  nights?: string | number;
}

interface Tour {
  id: string;
  images: string[];
  title: MultiLangString;
  description: MultiLangString;
  price: string;
  duration: {
    days: number;
    nights: number;
  };
  style: string;
  dates: TourDate[];
  itinerary: ItineraryItem[];
  inclusions: Inclusions;
}

interface TourDate {
  startDate: Timestamp;
  endDate: Timestamp;
  status: string;
  price: string;
}
interface ItineraryItem {
  title: string;
  description: string;
}
interface Inclusions {
  included: string[];
  notIncluded: string[];
}
export default function TourPage() {
  const params = useParams();
  const locale = useLocale() as Lang;
  const tourId = typeof params.id === "string" ? params.id : undefined;

  const [tour, setTour] = useState<Tour | null>(null);

  useEffect(() => {
    if (!tourId) return;

    const fetchTour = async () => {
      const tourRef = doc(db, "tours", tourId);
      const tourSnap = await getDoc(tourRef);

      if (!tourSnap.exists()) return;

      const data = tourSnap.data();

      setTour({
        id: tourSnap.id,
        images: data.images || [],
        price: data.price || "",
        duration: data.duration || { days: 0, nights: 0 },
        style: data.style || "",
        title: data.title || {},
        description: data.description || {},
        dates: data.dates || [],
        itinerary: data.itinerary || [],
        inclusions: data.inclusions || { included: [], notIncluded: [] },
      });
    };

    fetchTour();
  }, [tourId, locale]);

  console.log(tour);
  if (!tour) return <div className="p-10 text-center">Loading...</div>;

  const title =
    tour.title[locale] || tour.title.en || Object.values(tour.title)[0] || "";

  const description =
    tour.description[locale] ||
    tour.description.en ||
    Object.values(tour.description)[0] ||
    "";

  const images = tour.images || [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <StickyHeader />

      <div className="max-w-[1250px] mt-20 w-full mx-auto px-4 md:px-6 lg:px-0">
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
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-3 mb-6 border-b pb-6 border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#112211]">
                {title}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <FaLocationDot /> Uzbekistan
                </p>
                {/* <div className="flex items-center gap-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <CiStar key={i} size={16} />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">
                    4.8 · 230 reviews
                  </span>
                </div> */}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button className="bg-white text-[#8DD3BB] border border-[#8DD3BB] w-11 h-11 rounded-md">
                <FaShareAlt />
              </Button>
              <Button className="bg-[#8DD3BB] text-[#112211] w-[150px] h-11 rounded-md font-semibold">
                Забронировать
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {images.length > 1 ? (
                <div>
                  <div className="relative w-full h-[440px] md:h-[520px] lg:h-[420px]">
                    <Image
                      src={images[0]}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="px-4 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.slice(1, 5).map((img, i) => (
                      <div
                        key={i}
                        className="relative h-24 sm:h-28 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt="thumb"
                          fill
                          className="object-cover hover:scale-105 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-[440px] md:h-[520px] lg:h-[420px]">
                  <Image
                    src={images[0] || "/tourImage1.jpg"}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
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

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>
              <Accordion type="single" collapsible>
                {tour.itinerary.map((item, i) => (
                  <AccordionItem key={i} value={`it-${i}`}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">
                Inclusions and activities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Included</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {tour.inclusions.included.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Not included</h4>
                  <ul className="list-disc ml-6 text-gray-700">
                    {tour.inclusions.notIncluded.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

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
                  <tbody>
                    {tour.dates.map((date, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3">
                          {date.startDate.toDate().toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          {date.endDate.toDate().toLocaleDateString()}
                        </td>
                        <td
                          className={`p-3 ${
                            date.status === "Few spots"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {date.status}
                        </td>
                        <td className="p-3 text-right font-semibold">
                          ${date.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            {/*             
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Отзывы</h3>
                <Button className="bg-[#8DD3BB] text-[#112211] rounded-md px-4 py-2">
                  Оставить отзыв
                </Button>
              </div>

              <div className="flex flex-col gap-4">
                <Review />
                <Review />
              </div>
            </section> */}
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white border rounded-2xl shadow-md p-6">
                <p className="text-sm text-gray-500">Цена за человека</p>
                <h4 className="text-2xl font-bold text-[#112211]">
                  ${tour.price}
                </h4>

                <div className="flex flex-col gap-3 text-gray-700 text-sm mt-4">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-[#8DD3BB]" />
                    <div>
                      <p className="font-medium">Длительность</p>
                      <p>
                        {tour.duration.days} days / {tour.duration.nights}{" "}
                        nights
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaTag className="text-[#8DD3BB]" />
                    <div>
                      <p className="font-medium">Класс тура</p>
                      <p>{tour.style}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaUserFriends className="text-[#8DD3BB]" />
                    <div>
                      <p className="font-medium">Группа</p>
                      <p>до 12 человек</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 mt-4 bg-[#8DD3BB] text-[#112211] font-semibold rounded-lg">
                  Забронировать
                </Button>
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
