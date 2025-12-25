"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { AiOutlineGlobal } from "react-icons/ai";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { langs } from "@/lib/langs";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/(public)/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DatabaseUser {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt?: any;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const t = useTranslations("Navbar");
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleChange(lang: string): void {
    document.cookie = `locale=${lang}; path=/`;
    router.refresh();
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));

        const categoryDb: Category[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, "id">),
        }));

        console.log(categoryDb);
        setCategories(categoryDb);
      } catch (e) {
        console.log(e, "Something w+ent wrong");
      }
    };

    fetchCategories();
  }, []);

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

  const navLinks = [
    { name: t("explore"), href: "/trips" },
    { name: t("stories"), href: "/articles" },
    { name: t("about"), href: "/about" },
  ];

  const navBackground = "bg-white shadow-soft";

  const textColor = "text-foreground";

  const logoColor = "text-gradient";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          navBackground
        )}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
                  logoColor
                )}
              >
                pilavtour
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-5 py-2 font-body text-sm font-medium rounded-full transition-all duration-300",
                    textColor,
                      pathname === link.href ? "bg-gray-100" : "hover:bg-gray-50"
                  )}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {/* Desktop only: User/login */}
              <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Avatar className="rounded-xl">
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
                    className="w-[90px] h-[40px] hover:bg-gray-200 bg-gray-100 text-black rounded-lg cursor-pointer"
                >
                  login
                </Button>
              )}
              </div>

              {/* Language selector - visible on all screens */}
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <AiOutlineGlobal size={24} className="text-foreground" />
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

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-full transition-colors",
                  textColor,
                  "hover:bg-gray-100"
                )}
                aria-label={t("toggle_menu")}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-navy/60 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white rounded-l-3xl shadow-strong overflow-hidden"
            >
              <div className="p-8 pt-24 h-full flex flex-col">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1 + 0.1,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block py-4 px-4 font-display text-2xl font-bold rounded-2xl transition-all",
                          pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-secondary"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto pb-8 flex flex-col gap-4"
                >
                  {/* Language Selector in Mobile Menu */}
                  <div className="flex items-center gap-2">
                    <AiOutlineGlobal size={20} className="text-foreground" />
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer text-foreground font-body text-sm">
                        Language
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
                  </div>

                  {user ? (
                    <div
                      onClick={() => router.push("/profile")}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <Avatar className="rounded-xl">
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
                      className="w-[90px] h-[40px] hover:bg-gray-200 bg-gray-100 text-black rounded-lg cursor-pointer"
                    >
                      login
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
