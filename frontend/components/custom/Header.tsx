"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Image from "next/image";
import { CiPlane } from "react-icons/ci";
import { IoBed } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ID, Models, Query } from "appwrite";
import { account, appwriteConfig, database } from "@/app/(public)/appwrite";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const Header = () => {
  const t = useTranslations("Header");
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  function handleChange(lang: string): void {
    document.cookie = `locale=${lang}; path=/`;
    router.refresh();
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();

        const existing = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal("email", currentUser.email)]
        );

        if (existing.documents.length === 0) {
          await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
              email: currentUser.email,
              name: currentUser.name || "",
              avatar: currentUser.prefs?.oauth2?.avatar || "",
            }
          );
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [router]);

  return (
    <>
      <header className="flex justify-between items-center px-4 lg:px-8 py-2 text-white">
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleChange("ru")}
              >
                RU
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleChange("en")}
              >
                EN
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleChange("uz")}
              >
                UZ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* <Image width={110} height={36} src="/logo-header.png" alt="Logo" /> */}
        <p className="text-2xl flex font-bold text-[#8DD3BB]">
          Pilov{" "}
          <span className="text-white">
            Tour <u>Agency</u>
          </span>
        </p>

        {}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <Image
                src={user.avatar || "/avatar-default.svg"}
                alt={user.name || "User"}
                width={45}
                height={45}
                className="rounded-full bg-gray-200 object-cover"
              />
              <p className="text-lg">{user.name || user.email}</p>
            </>
          ) : (
            <>
              <Link href="/login">{t("login")}</Link>
              <Button
                onClick={() => router.push("/signup")}
                className="w-[104px] h-[48px] hover:bg-gray-400 bg-white text-black rounded-lg cursor-pointer"
              >
                {t("signup")}
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
