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
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import {
  FaHeart,
  FaShareAlt,
  FaClock,
  FaUserFriends,
  FaTag,
} from "react-icons/fa";
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
import { useRouter, useSearchParams } from "next/navigation";
import { appwriteConfig, database } from "../../appwrite";
import { Query } from "appwrite";

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

export default function TourPage() {
  const [trip, setTrip] = useState<TripDocument[]>();
  const searchParams = useSearchParams();

  const tripId = searchParams.get("id");
  console.log(tripId);

  const handleBook = () => {};
  const router = useRouter();

  useEffect(() => {
    if (!tripId) {
      console.error("No trip ID provided");
      return;
    }

    const fetchTrip = async () => {
      try {
        const response = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.tourCollectionId,
          [Query.equal("$id", tripId)]
        );
        setTrip(response.documents as unknown as TripDocument[]);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
      }
    };

    fetchTrip();
  }, []);

  console.log(trip);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <HeaderforOther />

        {/* container */}
        <div className="max-w-[1250px] w-full mx-auto px-4 md:px-6 lg:px-0 mt-6">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/tours">Uzbekistan</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Premium Uzbekistan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title & actions */}
          <div className="mt-6 mb-6 border-b pb-6 border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-[#112211]">
                  Premium Uzbekistan
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaLocationDot /> Tashkent, Uzbekistan
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
                <Button className="bg-white text-[#8DD3BB] hover:bg-gray-100 border border-[#8DD3BB] w-11 h-11 flex items-center justify-center rounded-md">
                  <FaHeart />
                </Button>
                <Button className="bg-white text-[#8DD3BB] hover:bg-gray-100 border border-[#8DD3BB] w-11 h-11 flex items-center justify-center rounded-md">
                  <FaShareAlt />
                </Button>
                <Button className="bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa] w-[150px] h-11 rounded-md font-semibold">
                  Book now
                </Button>
              </div>
            </div>
          </div>

          {/* Main grid: left content + right sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT MAIN COLUMN */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Image gallery: big image + thumbnails */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="w-full">
                  {/* big image (fixed aspect) */}
                  <div className="relative w-full h-[440px] md:h-[520px] lg:h-[420px]">
                    <Image
                      src="/tourImage1.jpg"
                      alt="Main tour image"
                      fill
                      style={{ objectFit: "cover" }}
                      className="block"
                    />
                  </div>

                  {/* thumbnails row */}
                  <div className="px-4 py-4 grid grid-cols-4 gap-3">
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <Image
                        src="/tourImage2.jpg"
                        alt="thumb1"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <Image
                        src="/tourImage3.jpg"
                        alt="thumb2"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <Image
                        src="/tourImage4.jpg"
                        alt="thumb3"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="relative h-28 rounded-lg overflow-hidden">
                      <Image
                        src="/tourImage5.jpg"
                        alt="thumb4"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                <p className="text-gray-700 leading-relaxed">
                  Explore the rich culture and timeless beauty of Uzbekistan,
                  from the blue domes of Samarkand to the historic streets of
                  Bukhara. Experience authentic cuisine, local hospitality, and
                  luxury stays across ancient Silk Road cities.
                </p>
              </section>

              {/* Why you'll love */}
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
                      Meet your guide on arrival, transfer to the hotel and
                      short city orientation.
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

              {/* Reviews */}
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold">Reviews</h3>
                  <Button className="bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa] rounded-md px-4 py-2">
                    Give your review
                  </Button>
                </div>

                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                  <p className="text-4xl font-bold text-[#112211]">4.8</p>
                  <div>
                    <p className="text-lg font-semibold">Excellent</p>
                    <p className="text-sm text-gray-600">
                      230 verified reviews
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Review />
                  <Review />
                  <Review />
                </div>
              </section>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Price per person</p>
                    <h4 className="text-2xl font-bold text-[#112211]">
                      USD $2,395
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Twin share / Private rooms available
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 text-gray-700 text-sm">
                    <div className="flex items-center gap-3">
                      <FaClock className="text-[#8DD3BB]" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm">8 days</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaTag className="text-[#8DD3BB]" />
                      <div>
                        <p className="text-sm font-medium">Trip style</p>
                        <p className="text-sm">Premium</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaUserFriends className="text-[#8DD3BB]" />
                      <div>
                        <p className="text-sm font-medium">Group size</p>
                        <p className="text-sm">Up to 12 people</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <Button className="w-full h-12 bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa] rounded-lg font-semibold">
                      Book now
                    </Button>
                  </div>

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

          {/* Footer blocks */}
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
    </>
  );
}
