"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { CiPlane } from "react-icons/ci";
import { IoBed, IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { langs } from "@/lib/langs";
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

const Header = () => {
  const t = useTranslations("Header");
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  function handleChange(lang: string): void {
    document.cookie = `locale=${lang}; path=/`;
    router.refresh();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchOrCreateUser(firebaseUser);
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
    <>
      <header className="flex pt-4 justify-between items-center px-4 lg:px-8 text-white">
        <div className="flex lg:hidden items-center justify-between">
          <p
            onClick={() => router.push("/")}
            className="text-2xl cursor-pointer flex font-bold text-[#8DD3BB]"
          >
            Pilav
            <span className="text-white">
              Tour <u>Agency</u>
            </span>
          </p>

          <button>
            <IoMenu />
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <p
            onClick={() => router.push("/trips")}
            className="flex items-center cursor-pointer gap-2"
          >
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
                <AvatarImage
                  src={
                    dbUser?.avatar || user?.photoURL || "/avatar-default.svg"
                  }
                />
                <AvatarFallback>
                  {dbUser?.name || user?.displayName || "Anonymus User"}
                </AvatarFallback>
              </Avatar>
              <p className="text-lg">
                {dbUser?.name || user?.displayName || "Anonymus User"}
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
      </header>
    </>
  );
};

export default Header;
