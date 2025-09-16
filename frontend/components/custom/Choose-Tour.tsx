"use client";

import { useState } from "react";
import { IoSwapHorizontalSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DateRange from "./DateRange";
import FieldShell from "@/components/custom/FieldShell";

const ChooseTour = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const swapCities = () => {
    setFrom((prev) => {
      const oldFrom = prev;
      setTo(oldFrom);
      return to;
    });
  };

  
  return (
    <>
      <div className="flex flex-col bg-white shadow-lg rounded-2xl w-[1232px] p-6">
        <div className="flex gap-6 border-b pb-3 mb-5">
          <p className="text-2xl font-semibold">Choose Tour</p>
        </div>

        <>
          <div className="flex items-center justify-between">
            <FieldShell
              label="From - To"
              rightIcon={<IoSwapHorizontalSharp className="text-gray-400" />}
            >
              <Input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From"
                className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 font-medium placeholder:text-gray-400"
              />
              <span className="text-gray-300">—</span>
              <Input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To"
                className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 font-medium placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={swapCities}
                className="ml-1 rounded-md p-1 hover:bg-gray-100"
                aria-label="Swap"
                title="Swap"
              >
                <IoSwapHorizontalSharp />
              </button>
            </FieldShell>

            <FieldShell label="Depart - Return">
              <DateRange />
            </FieldShell>

            <FieldShell label="Passenger - Class">
              <Input
                type="number"
                placeholder="1 Passenger"
                className="w-[378px] bg-transparent border-none p-2 focus:outline-none focus:ring-0 font-medium"
              />
            </FieldShell>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-sm text-gray-500 hover:underline"
              onClick={() => alert("Promo code popup :)")}
            >
              + Add Promo Code
            </button>
            <Button className="bg-green-600 hover:bg-green-700 cursor-pointer px-6 py-3">
              Show Flights
            </Button>
          </div>
        </>
      </div>
    </>
  );
};

export default ChooseTour;
