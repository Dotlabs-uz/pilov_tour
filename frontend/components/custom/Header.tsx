"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { CiPlane } from "react-icons/ci";
import { IoBed, IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ID, Models, Query } from "appwrite";
import { account, appwriteConfig, database } from "@/app/(public)/appwrite";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { langs } from "@/lib/langs";

export interface CustomUser extends Models.User<Models.Preferences> {
  avatar?: string;
}

export interface DatabaseUser {
  $id: string;
  name: string;
  email: string;
  avatar?: string;
  [key: string]: any;
}

const Header = () => {
  const t = useTranslations("Header");
  const router = useRouter();
  const [user, setUser] = useState<CustomUser | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);

  function handleChange(lang: string): void {
    document.cookie = `locale=${lang}; path=/`;
    router.refresh();
  }

  // const getProfileAvatar = async (accessToken: string) => {
  //   try {
  //     const response = fetch(
  //       "https://people.googleapis.com/v1/people/me?personFields=photos",
  //       { headers: { Authorization: `Bearer ${accessToken}` } }
  //     );
  //     if (!response.ok)
  //       throw new Error("Failed to fetch Google profile picture");

  //     const { photos } = await response.json();
  //     return photos?.[0]?.url || null;
  //   } catch (e) {
  //     console.log(e, "Somithing went wrong");
  //   }
  // };

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
              avatar: currentUser.prefs?.oauth2?.avatar || "",
            }
          )) as unknown as DatabaseUser;

          userFromDb = newUser;
        } else {
          userFromDb = existing.documents[0] as unknown as DatabaseUser;2
        }

        setDbUser(userFromDb);

        const combinedUser: CustomUser = {
          ...currentUser,
          avatar: userFromDb.avatar,
        };

        setUser(combinedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
        setDbUser(null);
      }
    };

    fetchUser();
  }, [router]);

  return (
    <>
      <header className="flex pt-4 justify-between items-center px-4 lg:px-8 text-white">
        <div className="flex lg:hidden items-center justify-between">
          <p
            onClick={() => router.push("/")}
            className="text-2xl cursor-pointer flex font-bold text-[#8DD3BB]"
          >
            Pilav{" "}
            <span className="text-white">
              Tour <u>Agency</u>
            </span>
          </p>

          <button>
            <IoMenu />
          </button>
        </div>
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
          <span className="text-white">
            Tour <u>Agency</u>
          </span>
        </p>

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
      </header>
    </>
  );
};

export default Header;
