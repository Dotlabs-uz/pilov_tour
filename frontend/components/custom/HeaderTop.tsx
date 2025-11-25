"use client";

import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { AiOutlineGlobal } from "react-icons/ai";
import { langs } from "@/lib/langs";

export default function HeaderTop() {
    const router = useRouter();
    function handleChange(lang: string): void {
        document.cookie = `locale=${lang}; path=/`;
        router.refresh();
    }

    return (
      <header className="w-full mx-auto bg-[#8DD3BB] text-white text-sm mt-14">
        <div className="max-w-[1200px] mx-auto h-10 flex items-center justify-between">
          <div className="flex items-center text-lg gap-6">
            <button className="hover:text-gray-200 transition-colors cursor-pointer">
              About us
            </button>
            <button className="hover:text-gray-200 transition-colors cursor-pointer">
              Contact us
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <AiOutlineGlobal size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="pt-2">
                {langs.map(({ lang }, i) => (
                  <DropdownMenuItem
                    key={i}
                    className="cursor-pointer"
                    onClick={() => handleChange(lang.toLowerCase())}
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    );
}
