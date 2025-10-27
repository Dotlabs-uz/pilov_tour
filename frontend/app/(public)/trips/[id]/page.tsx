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
import { FaHeart, FaShareAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Subscribe from "@/components/custom/Subcribe";
import { useRouter, useSearchParams } from "next/navigation";
import Review from "@/components/custom/Review";
import EndComponent from "@/components/custom/EndComponent";
import { useEffect, useState } from "react";
import { appwriteConfig, database } from "../../appwrite";

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

const TourPage = () => {
  const [trip, setTrip] = useState<TripDocument[]>();
  const searchParams = useSearchParams();

  const tripId = searchParams.get("id");
  console.log(tripId);

  const handleBook = () => {};
  const router = useRouter();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.tourCollectionId
        );

        setTrip(response.documents as unknown as TripDocument[]);
      } catch (e) {
        console.log(e, "Something went wrong");
      }
    };
    fetchTrip();
  }, []);

  console.log(trip);

  return (
    <>
      <div className="flex flex-col gap-2">
        <HeaderforOther />
        <div className="max-w-[1250px] mx-auto ">
          <div className="flex w-[1250px] mt-10 flex-col">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Turkey</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">Istanbul</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      CVK Park Bosphorus Hotel Istanbul
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          <div className="flex gap-5 flex-col">
            <div className="flex justify-between">
              <div className="flex gap-5 items-center">
                <p className="text-2xl font-bold">
                  CVK Park Bosphorus Hotel Istanbul
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <CiStar className="text-yellow-500" size={15} />
                    <CiStar className="text-yellow-500" size={15} />
                    <CiStar className="text-yellow-500" size={15} />
                    <CiStar className="text-yellow-500" size={15} />
                    <CiStar className="text-yellow-500" size={15} />
                  </div>
                  <span>5 Star Hotel</span>
                </div>
              </div>
              <div>
                <p className="text-2xl text-red-500 font-bold">240$/night</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="flex items-center gap-2 text-lg font-light">
                  <FaLocationDot />
                  Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                </p>
                <div className="flex items-center"></div>
              </div>
              <div className="flex items-center gap-2">
                <Button className="bg-white text-[#8DD3BB] w-[48px] hover:shadow-xl hover:bg-gray-200 cursor-pointer h-[48px] text-center border-1 border-[#8DD3BB] ">
                  <FaHeart />
                </Button>
                <Button className="bg-white text-[#8DD3BB] hover:shadow-xl w-[48px] hover:bg-gray-200 cursor-pointer h-[48px] text-center border-1 border-[#8DD3BB] ">
                  <FaShareAlt />
                </Button>
                <Button
                  onClick={() => handleBook}
                  className="w-[150px] h-[48px] rounded-md bg-[#8DD3BB] text-[#112211] font-semibold texr-lg hover:bg-[#407d68] hover:text-white cursor-pointer "
                >
                  Book now
                </Button>
              </div>
            </div>
          </div>
          <div className="flex mt-5 items-center border-b-2 pb-4 border-black">
            <Image
              src={"/tourImage1.jpg"}
              width={612}
              height={550}
              alt="TourImage"
              className="rounded-lg"
            />
            <div className="grid grid-cols-2 gap-2 p-2">
              <Image
                src={"/tourImage2.jpg"}
                width={302}
                height={271}
                alt="TourImage"
                className="rounded-lg"
              />
              <Image
                src={"/tourImage3.jpg"}
                width={302}
                height={271}
                alt="TourImage"
                className="rounded-lg"
              />
              <Image
                src={"/tourImage4.jpg"}
                width={302}
                height={271}
                alt="TourImage"
                className="rounded-lg"
              />
              <Image
                src={"/tourImage5.jpg"}
                width={302}
                height={271}
                alt="TourImage"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex mt-4 flex-col gap-5 pb-5 border-b-2 border-black">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">Overview</p>
              <span>
                Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park
                Bosphorus Hotel Istanbul has risen from the ashes of the
                historic Park Hotel, which also served as Foreign Affairs Palace
                120 years ago and is hosting its guests by assuming this
                hospitality mission. With its 452 luxurious rooms and suites,
                8500 m2 SPA and fitness area, 18 meeting rooms including 4
                dividable ones and 3 terraces with Bosphorus view, Istanbuls
                largest terrace with Bosphorus view (4500 m2) and latest
                technology infrastructure, CVK Park Bosphorus Hotel Istanbul is
                destined to be the popular attraction point of the city. Room
                and suite categories at various sizes with city and Bosphorus
                view, as well as 68 separate luxury suites, are offered to its
                special guests as a wide variety of selection.
              </span>
            </div>
            <div className="flex items-center gap-15">
              <div className="w-[166px] h-[145px] rounded-lg flex flex-col justify-between items-start p-5 text-[#112211] bg-[#8DD3BB] ">
                <p className="text-2xl font-bold">4.2</p>
                <div className="flex flex-col gap-2 items-start">
                  <span className="text-xl font-semibold">Very good</span>
                  <span>371 reviews</span>
                </div>
              </div>
              <div className="w-[166px] h-[145px] rounded-lg flex flex-col justify-between items-start p-5 text-[#112211] bg-[#8DD3BB] ">
                <p className="text-2xl font-bold">4.2</p>
                <div className="flex flex-col gap-2 items-start">
                  <span className="text-xl font-semibold">Very good</span>
                  <span>371 reviews</span>
                </div>
              </div>
              <div className="w-[166px] h-[145px] rounded-lg flex flex-col justify-between items-start p-5 text-[#112211] bg-[#8DD3BB] ">
                <p className="text-2xl font-bold">4.2</p>
                <div className="flex flex-col gap-2 items-start">
                  <span className="text-xl font-semibold">Very good</span>
                  <span>371 reviews</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex border-b-1 border-black pb-5 flex-col">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-bold">
                  Day 1
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">Gur Emir Mausoleum</p>
                      <span className="font-semibold">
                        Visit of the mausoleum of Amir Timour
                      </span>
                      <span className="flex font-light gap-1">
                        1 hour · <p>Admission ticket not included</p>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">Gur Emir Mausoleum</p>
                      <span className="font-semibold">
                        Visit of the mausoleum of Amir Timour
                      </span>
                      <span className="flex font-light gap-1">
                        1 hour · <p>Admission ticket not included</p>
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-bold">
                  Day 2
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">Gur Emir Mausoleum</p>
                      <span className="font-semibold">
                        Visit of the mausoleum of Amir Timour
                      </span>
                      <span className="flex font-light gap-1">
                        1 hour · <p>Admission ticket not included</p>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">Gur Emir Mausoleum</p>
                      <span className="font-semibold">
                        Visit of the mausoleum of Amir Timour
                      </span>
                      <span className="flex font-light gap-1">
                        1 hour · <p>Admission ticket not included</p>
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-5 flex flex-col gap-5 border-b-1 border-black pb-10 ">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">Location/Map</p>
              <Button
                onClick={() =>
                  router.push("https://maps.app.goo.gl/Abvg9BUrEcjpfNHy6")
                }
                className="w-[189px] h-[48px] rounded-md text-black bg-[#8DD3BB] hover:bg-green-700 hover:text-white cursor-pointer"
              >
                View on google maps
              </Button>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11503.065132646021!2d66.96417578022246!3d39.645564495810966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d18cc761ff98f%3A0x8a218422bc21edfa!2z0JPRg9GALdC4INCt0LzQuNGA!5e1!3m2!1sru!2sru!4v1758660642575!5m2!1sru!2sru"
                width="600"
                height="450"
                className="border-0 w-[1250px] rounded-lg"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="flex flex-col border-b-1 border-black pb-7 gap-5 mt-5">
            <p className="text-xl font-bold">Amenities</p>
            <div className="flex gap-[250px]">
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold flex items-center">
                  Outdoor pool
                </p>
                <p className="text-md font-semibold flex items-center">
                  Indoor pool
                </p>
                <p className="text-md font-semibold flex items-center">
                  Spa and wellness center
                </p>
                <p className="text-md font-semibold flex items-center">
                  Restaraunt
                </p>
                <p className="text-md font-semibold flex items-center">
                  Room service
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold flex items-center">
                  Fitness center
                </p>
                <p className="text-md font-semibold flex items-center">
                  Bar/Lounge
                </p>
                <p className="text-md font-semibold flex items-center">
                  Free Wi-Fi
                </p>
                <p className="text-md font-semibold flex items-center">
                  Tea/coffe machine
                </p>
                <p className="text-md font-semibold flex items-center">
                  +24 more
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center mt-5">
            <img
              src="/galery1.jpg"
              alt="Hotel Pictures"
              className="w-[302px] h-[271px] rounded-l-xl"
            />
            <img
              src="/galery2.jpg"
              alt="Hotel Pictures"
              className="w-[302px] h-[271px] rounded-sm"
            />
            <img
              src="/galery3.jpg"
              alt="Hotel Pictures"
              className="w-[302px] h-[271px] rounded-sm"
            />
            <img
              src="/galery4.jpg"
              alt="Hotel Pictures"
              className="w-[302px] h-[271px] rounded-r-xl"
            />
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">Reviews</p>
              <Button className="w-[152px] h-[48px] rounded-md text-black bg-[#8DD3BB] hover:bg-green-700 hover:text-white cursor-pointer">
                Give your review
              </Button>
            </div>
            <div className="flex mt-5 items-center border-b-1 border-gray-500 pb-5 gap-5">
              <p className="text-4xl font-bold">4.2</p>
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-bold">Very good</p>
                <span className="text-md font-light">371 verified reviews</span>
              </div>
            </div>
            <div className="flex border-b-1 border-black pb-17 flex-col gap-2">
              <Review />
              <Review />
              <Review />
              <Review />
              <Review />
              <Pagination className="mt-5">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">40</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
            <div className="flex items-center justify-between mt-10">
              <EndComponent />
              <EndComponent />
              <EndComponent />
            </div>
          </div>
        </div>

        <Subscribe />
      </div>
    </>
  );
};

export default TourPage;
