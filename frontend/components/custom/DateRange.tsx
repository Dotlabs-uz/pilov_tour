import { Input } from "@/components/ui/input";
import { CiCalendar } from "react-icons/ci";

export default function DateRange() {
  return (
    <div className="flex items-center gap-2">
      {/* Depart */}
      <div className="relative">
        <Input type="date" className=" w-[120px] text-black" />
        {/* <CiCalendar className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
      </div>

      <span className="text-gray-300">—</span>

      {/* Return */}
      <div className="relative">
        <Input type="date" className=" w-[120px]   text-black" />
        {/* <CiCalendar className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
      </div>
    </div>
  );
}
