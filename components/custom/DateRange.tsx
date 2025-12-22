"use client";
import { Input } from "@/components/ui/input";

export default function DateRange() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Input type="date" className=" w-[120px] text-black" />
      </div>

      <span className="text-gray-300">—</span>

      <div className="relative">
        <Input type="date" className=" w-[120px]   text-black" />
      </div>
    </div>
  );
}
