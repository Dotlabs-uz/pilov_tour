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
import { Star } from "lucide-react";

const TourPage = () => {
  const handleBook = () => {};

  return (
    <>
      <div className="flex flex-col gap-2">
        <HeaderforOther />
        <div className="flex mt-10 flex-col">
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
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center">
              <p>CVK Park Bosphorus Hotel Istanbul</p>
              <Star className="bg-yellow-500" size={15} />
              <Star className="bg-yellow-500" size={15} />
              <Star className="bg-yellow-500" size={15} />
              <Star className="bg-yellow-500" size={15} />
              <Star className="bg-yellow-500" size={15} />
              <span>5 Star Hotel</span>
            </div>
            <div>
              <p>240$/night</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p>Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437</p>
              <div className="flex items-center"></div>
            </div>
            <div className="flex items-center gap-2">
              <Button></Button>
              <Button></Button>
              <Button
                onClick={() => handleBook}
                className="w-[150px] h-[48px] rounded-md bg-[#8DD3BB] text-[#112211] font-semibold texr-lg hover:bg-[#407d68] hover:text-white cursor-pointer "
              >
                Book now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourPage;
