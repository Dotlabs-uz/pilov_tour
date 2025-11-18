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
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "@/app/(public)/firebase";

interface DatabaseUser {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt?: any;
}

const HeaderforOther = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const t = useTranslations("Header");

  function handleChange(lang: string): void {
    document.cookie = `locale=${lang}; path=/`;
    router.refresh();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchOrCreateUser(firebaseUser);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchOrCreateUser = async (firebaseUser: FirebaseUser) => {
    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        const newUser: DatabaseUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          phone: firebaseUser.phoneNumber || "",
          avatar: firebaseUser.photoURL || "/avatar-default.svg",
          createdAt: serverTimestamp(),
        };
        await setDoc(userRef, newUser);
        setDbUser(newUser);
      } else {
        setDbUser(docSnap.data() as DatabaseUser);
      }
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  };

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
          Pilav
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
            {user || dbUser ? (
              <div
                onClick={() => router.push("/profile")}
                className="cursor-pointer flex items-center gap-2"
              >
                <Avatar className="bg-white p-1">
                  <AvatarImage
                    src={
                      dbUser?.avatar || user?.photoURL || "/avatar-default.svg"
                    }
                  />
                  <AvatarFallback>
                    {user?.displayName || dbUser?.name || "Anonymus User"}
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg">
                  {user?.displayName || dbUser?.name || "Anonymus User"}
                </p>
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
