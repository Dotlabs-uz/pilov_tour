"use client";

import { CiPlane } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoBed } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AiOutlineGlobal } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { langs } from "@/lib/langs";

const HeaderforOther = () => {
  const router = useRouter();
  const t = useTranslations("Header");

  function handleChange(lang: string): void {
    document.cookie = `locale=${lang}; path=/`;
    router.refresh();
  }
  return (
    <>
      <header className="flex pt-4 justify-between items-center px-4 lg:px-8 text-black">
        <div className="hidden lg:flex items-center gap-4">
          <p className="flex items-center cursor-pointer gap-2">
            <CiPlane size={24} /> {t("btn1")}
          </p>
          <p className="flex cursor-pointer items-center gap-2">
            <IoBed size={24} /> {t("btn2")}
          </p>
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

        <p className="text-2xl flex font-bold text-[#8DD3BB]">
          Pilov{" "}
          <span className="text-black">
            Tour <u>Agency</u>
          </span>
        </p>

        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            <Heart />
            <p>Favorites</p>
          </div>
          <p>|</p>
          <div className="flex items-center">
            <Avatar className="bg-white p-1">
              <AvatarImage src={"/avatar-default.svg"} />
            </Avatar>
            <p>John Doe</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderforOther;
