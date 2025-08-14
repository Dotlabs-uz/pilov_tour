"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { account } from "./appwrite";
import { useRouter } from "next/navigation";
import type { Models } from "appwrite";
import LandingPage from "@/containers/LandingPage";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.error("Not logged in:", error);
        router.push("/login"); // Если не авторизован — на логин
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      {user ? (
        <>
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
      {/* <LandingPage/> */}
    </div>
  );
}
