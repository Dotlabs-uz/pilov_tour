"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { db } from "@/app/(public)/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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

// ---------- Типы ----------
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
  duration: Duration | string | any;
  style: string;
}

// ---------- Компонент ----------
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

      const titleObj = data.title || {};
      const descObj = data.description || {};

      const title =
        titleObj[locale] || titleObj["en"] || Object.values(titleObj)[0] || "";

      const description =
        descObj[locale] || descObj["en"] || Object.values(descObj)[0] || "";

      // duration → всегда объект
      const duration = data.duration || { days: "", nights: "" };

      setTour({
        id: tourSnap.id,
        images: data.images || [],
        price: data.price || "",
        duration,
        style: data.style || "",
        title: titleObj,
        description: descObj,
      });
    };

    fetchTour();
  }, [tourId, locale]);

  if (!tour) return <div className="p-10 text-center">Loading...</div>;

  // ---------- Выбор локализированного текста ----------
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

      <div className="max-w-[1250px] mt-10 w-full mx-auto px-4 md:px-6 lg:px-0">
        {/* Breadcrumb */}
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

        {/* Title */}
        <div className="mt-6 mb-6 border-b pb-6 border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#112211]">
                {title}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <FaLocationDot /> Uzbekistan
                </p>
                <div className="flex items-center gap-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <CiStar key={i} size={16} />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">
                    4.8 · 230 reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button className="bg-white text-[#8DD3BB] border border-[#8DD3BB] w-11 h-11 rounded-md">
                <FaHeart />
              </Button>
              <Button className="bg-white text-[#8DD3BB] border border-[#8DD3BB] w-11 h-11 rounded-md">
                <FaShareAlt />
              </Button>
              <Button className="bg-[#8DD3BB] text-[#112211] w-[150px] h-11 rounded-md font-semibold">
                Забронировать
              </Button>
            </div>
          </div>
        </div>

        {/* Images */}
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

            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-3">Обзор</h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </section>

            {/* Reviews */}
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
            </section>
          </div>

          {/* Sidebar */}
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
