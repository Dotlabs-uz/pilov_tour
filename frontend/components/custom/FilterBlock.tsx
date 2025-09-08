// components/custom/FilterBlock.tsx
"use client";

import { useState } from "react";
import { CiPlane } from "react-icons/ci";
import { IoBed, IoSwapHorizontalSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DateRange from "./DateRange";
import FieldShell from "@/components/custom/FieldShell";

const FilterBlock = () => {
  const [tab, setTab] = useState<"flights" | "stays">("flights");

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
    <div className="flex flex-col bg-white shadow-lg rounded-2xl w-[1232px] p-6">
      {/* Tabs */}
      <div className="flex gap-6 border-b pb-3 mb-5">
        <button
          onClick={() => setTab("flights")}
          className={`flex items-center gap-2 pb-2 ${
            tab === "flights"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500 hover:text-black"
          }`}
        >
          <CiPlane size={20} /> Flights
        </button>
        <button
          onClick={() => setTab("stays")}
          className={`flex items-center gap-2 pb-2 ${
            tab === "stays"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500 hover:text-black"
          }`}
        >
          <IoBed size={20} /> Stays
        </button>
      </div>

      {tab === "flights" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* From - To */}
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

            {/* Trip */}
            <FieldShell label="Trip">
              <Select>
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Trip" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="return">Return</SelectItem>
                  <SelectItem value="oneway">One-way</SelectItem>
                  <SelectItem value="multicity">Multi-city</SelectItem>
                </SelectContent>
              </Select>
            </FieldShell>

            {/* Depart - Return */}
            <FieldShell label="Depart - Return">
              <DateRange />
            </FieldShell>

            <FieldShell label="Passenger - Class">
              <Input
                type="number"
                min={1}
                className="w-20 bg-transparent border-none p-2 focus:outline-none focus:ring-0 font-medium"
              />
              <span className="text-gray-300">,</span>
              <Select>
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First</SelectItem>
                </SelectContent>
              </Select>
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
            <Button className="bg-green-600 cursor-pointer hover:bg-green-700 px-6 py-3">
              Show Flights
            </Button>
          </div>
        </>
      )}

      {tab === "stays" && (
        <div className="text-gray-500">Stays coming soon…</div>
      )}
    </div>
  );
};

export default FilterBlock;
