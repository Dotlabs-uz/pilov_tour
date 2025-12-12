"use client";

import { useEffect, useState } from "react";
import { RiArrowDownSLine, RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { AiOutlineGlobal } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { langs } from "@/lib/langs";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/(public)/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

interface DatabaseUser {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt?: any;
}

export function StickyHeader() {
  const t = useTranslations("header");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const menuItems = [
    {
      label: t("destinations"),
      submenu: [
        { label: t("destinations_silkroad"), href: "#" },
        { label: t("destinations_uzbekistan"), href: "#" },
        { label: t("destinations_kazakhstan"), href: "#" },
        { label: t("destinations_tajikistan"), href: "#" },
      ],
    },
    { label: t("articles") },
    { label: t("testimonials"), href: "#" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#8DD3BB] shadow-md px-4 lg:px-0">
        <div className="container max-w-[1240px] mx-auto">
          <div className="flex items-center h-16 justify-between gap-5">
            <div className="flex items-center gap-10">
              <p
                onClick={() => router.push("/")}
                className="text-2xl cursor-pointer flex font-bold"
              >
                Pilav
                <span className="text-white">
                  Tour <u>Agency</u>
                </span>
              </p>

              <nav className="hidden md:flex items-center gap-1">
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() =>
                      item.submenu && setOpenDropdown(item.label)
                    }
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="text-white text-sm font-semibold px-3 py-2 flex items-center gap-1 hover:bg-[#137d58] rounded transition-colors">
                      {item.label}
                      {item.submenu && (
                        <RiArrowDownSLine
                          size={16}
                          className={`transition-transform ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {item.submenu && (
                      <div className="absolute left-0 mt-0 w-48 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                        {item.submenu.map((subitem) => (
                          <a
                            key={item.label + "-" + subitem.label}
                            href={subitem.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                          >
                            {subitem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <AiOutlineGlobal size={24} className="text-white" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white text-black shadow-lg rounded-md px-2 py-2">
                  {langs.map(({ lang }, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="cursor-pointer hover:bg-gray-100 rounded-md px-2 py-2"
                      onClick={() => handleChange(lang.toLowerCase())}
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {user ? (
                <div
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Avatar className="bg-white p-1">
                    <AvatarImage
                      src={
                        dbUser?.avatar ||
                        user?.photoURL ||
                        "/avatar-default.svg"
                      }
                    />
                    <AvatarFallback>
                      {user?.displayName || dbUser?.name}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <Button
                  onClick={() => router.push("/login")}
                  className="w-[90px] h-[40px] hover:bg-gray-400 bg-white text-black rounded-lg cursor-pointer"
                >
                  Login
                </Button>
              )}

              {/* mobile buttons */}
              <div className="md:hidden flex gap-3 text-white">
                <button onClick={() => router.push("/search")}>
                  <CiSearch size={24} />
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? (
                    <RiCloseLine size={24} />
                  ) : (
                    <RiMenu3Line size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="py-2">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                      className="w-full text-left text-white text-sm font-semibold px-4 py-2 hover:bg-[#8DD3BB] flex items-center justify-between transition-colors"
                    >
                      {item.label}
                      {item.submenu && (
                        <RiArrowDownSLine
                          size={16}
                          className={`transition-transform ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {item.submenu && openDropdown === item.label && (
                      <div className="bg-[#8DD3BB] pl-4">
                        {item.submenu.map((subitem) => (
                          <a
                            key={item.label + "-" + subitem.label}
                            href={subitem.href}
                            className="block px-4 py-2 text-sm text-blue-100 hover:text-white"
                          >
                            {subitem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
