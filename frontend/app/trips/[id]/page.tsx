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

const TourPage = () => {
  const handleBook = () => {};

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
          <div className="flex mt-4 flex-col gap-5">
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
            <div className="flex items-center gap-2">
              <div className="w-[166px] h-[145px] rounded-lg bg-[#8DD3BB] "></div>
              <div className="w-[166px] h-[145px] rounded-lg bg-[#8DD3BB] "></div>
              <div className="w-[166px] h-[145px] rounded-lg bg-[#8DD3BB] "></div>
              <div className="w-[166px] h-[145px] rounded-lg bg-[#8DD3BB] "></div>
              <div className="w-[166px] h-[145px] rounded-lg bg-[#8DD3BB] "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourPage;
