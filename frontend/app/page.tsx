"use client";

import { useEffect, useState } from "react";
import { account, appwriteConfig, database } from "./appwrite";
import { useRouter } from "next/navigation";
import type { Models } from "appwrite";
import { ID, Query } from "appwrite";
import LandingPage from "@/containers/LandingPage";
import RecTrips from "@/containers/RecTrips";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();

        // 🔥 проверка — есть ли уже юзер в базе
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
              avatar: currentUser.prefs?.oauth2?.avatar || "", // 🖼️ сохраняем фото
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

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="mx-auto flex max-w-[1450px] mt-2 flex-col pr-2 pl-2">
      <LandingPage />
      <RecTrips />
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        {user ? (
          <>
            <Image
              src={user.prefs?.avatarUrl   || "/avatar-default.svg"}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="rounded-full bg-gray-200 object-cover"
            />

            <p className="text-lg">Welcome, {user.name || user.email}!</p>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 text-white rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
