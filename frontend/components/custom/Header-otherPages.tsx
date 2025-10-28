"use client";

import { CiPlane } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoBed } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AiOutlineGlobal } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { langs } from "@/lib/langs";
import { CustomUser, DatabaseUser } from "./Header";
import { account, appwriteConfig, database } from "@/app/(public)/appwrite";
import { ID, Query } from "appwrite";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeaderforOther = () => {
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [user, setUser] = useState<CustomUser | null>(null);
  const router = useRouter();
  const t = useTranslations("Header");

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

        let userFromDb: DatabaseUser;

        if (existing.documents.length === 0) {
          const newUser = (await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
              email: currentUser.email,
              name: currentUser.name || "",
              avatar: currentUser.prefs?.oauth2.avatar || "",
            }
          )) as unknown as DatabaseUser;

          userFromDb = newUser;
        } else {
          userFromDb = existing.documents[0] as unknown as DatabaseUser;
        }

        setDbUser(userFromDb);

        const combinedUser: CustomUser = {
          ...currentUser,
          avatar: userFromDb.avatar,
        };

        setUser(combinedUser);
      } catch (e) {
        console.log(e, "Something went wrong while fetching user");
        setUser(null);
        setDbUser(null);
      }
    };
    fetchUser();
  }, [router]);

  return (
    <div className="shadow-lg pb-5">
      <header className="flex pt-4 max-w-[1650px] mx-auto justify-between items-center px-4 lg:px-8 text-black">
        <div className="hidden lg:flex items-center gap-4">
          <p className="flex items-center cursor-pointer gap-2">
            <CiPlane size={24} /> {t("btn1")}
          </p>
          <p
            onClick={() => router.push("/trips")}
            className="flex cursor-pointer items-center gap-2"
          >
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

        <p
          onClick={() => router.push("/")}
          className="text-2xl cursor-pointer flex font-bold text-[#8DD3BB]"
        >
          Pilav{" "}
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
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div
                onClick={() => router.push("/profile")}
                className="cursor-pointer flex items-center gap-2"
              >
                <Avatar className="bg-white p-1">
                  <AvatarImage src={user.avatar || "/avatar-default.svg"} />
                  <AvatarFallback>
                    {user.name?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      "CN"}
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg">{user.name || user.email}</p>
              </div>
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
        </div>
      </header>
    </div>
  );
};

export default HeaderforOther;
