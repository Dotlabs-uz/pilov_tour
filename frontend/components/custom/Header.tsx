"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { CiPlane } from "react-icons/ci";
import { IoBed } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ID, Models, Query } from "appwrite";
import { account, appwriteConfig, database } from "@/app/appwrite";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

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
            <CiPlane size={24} /> Find Flight
          </p>
          <p className="flex cursor-pointer items-center gap-2">
            <IoBed size={24} /> Find Stays
          </p>
        </div>

        <Image width={110} height={36} src="/logo-header.png" alt="Logo" />

        {}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <Image
                src={user.prefs?.avatarUrl || "/avatar-default.svg"}
                alt={user.name || "User"}
                width={45}
                height={45}
                className="rounded-full bg-gray-200 object-cover"
              />
              <p className="text-lg">{user.name || user.email}</p>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Button
                onClick={() => router.push("/signup")}
                className="w-[104px] h-[48px] hover:bg-gray-400 bg-white text-black rounded-lg cursor-pointer"
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
