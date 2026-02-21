"use client";

import Subscribe from "@/components/custom/Subcribe";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Navbar } from "@/components/custom/Navbar";
import {
  TourCard,
  type TourCard as FeaturedTourCardType,
} from "@/components/custom/FeaturedTours";
import { LocalizedString } from "@/lib/types";

export type LangCodes = "en" | "ru" | "ge" | "it" | "sp" | "uk" | "uz";

export type MultiLangString = {
  [key in LangCodes]?: string;
};

export interface TourPreview {
  id: string;
  images: string[];
  title: MultiLangString;
  description: MultiLangString;
  price: string;
  duration: {
    days: number | string;
    nights: number | string;
  };
  style: string;
  category?: string;
  tag?: string;
  tagColor?: string;
  rating?: number;
  tagline?: string;
  groupSize?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

const Tours = () => {
  const [tours, setTours] = useState<FeaturedTourCardType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const locale = useLocale();
  const t = useTranslations("pages");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    const fetchTours = async () => {
      const snapshot = await getDocs(collection(db, "tours"));

      const toursData: FeaturedTourCardType[] = snapshot.docs
        .map((tourDoc) => {
          const data = tourDoc.data() as TourPreview;

          const titleObj = data.title || {};
          const descObj = data.description || {};
          const nameObj = (data as any).name || {};

          const title =
            titleObj[locale as keyof typeof titleObj] ||
            titleObj["en"] ||
            Object.values(titleObj)[0] ||
            "";

          const name =
            typeof nameObj === "string"
              ? nameObj
              : nameObj && typeof nameObj === "object"
                ? (nameObj as LocalizedString)[
                    locale as keyof LocalizedString
                  ] ||
                  (nameObj as LocalizedString)["en"] ||
                  Object.values(nameObj)[0] ||
                  ""
                : title; // Fallback to title if name doesn't exist

          const description =
            descObj[locale as keyof typeof descObj] ||
            descObj["en"] ||
            Object.values(descObj)[0] ||
            "";

          // Handle location (could be LocalizedString or string)
          const locationObj = (data as any).location || "";
          let locationStr: string = "";
          if (typeof locationObj === "string") {
            locationStr = locationObj;
          } else if (locationObj && typeof locationObj === "object") {
            locationStr =
              (locationObj as LocalizedString)[
                locale as keyof LocalizedString
              ] ||
              (locationObj as LocalizedString)["en"] ||
              (Object.values(locationObj)[0] as string) ||
              "";
          }

          return {
            id: tourDoc.id,
            images: data.images || [],
            title,
            name,
            description,
            price: data.price || "",
            duration: {
              days: data.duration?.days?.toString() || "",
              nights: data.duration?.nights?.toString() || "",
            },
            location: locationStr
              ? locationStr.split(",").map((loc: string) => loc.trim())
              : [],
            style: data.style || "",
            maxGroupCount: (data as any).maxGroupCount || 0,
            category: data.category || (data as any).category || "",
          } as any;
        })
        .filter(Boolean) as FeaturedTourCardType[];

      const filteredTours = toursData.filter((tour) => {
        const matchesCategory =
          !activeCategory ||
          activeCategory === "All" ||
          (tour as any).category === activeCategory;
        const matchesSearch =
          tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      setTours(filteredTours);
    };

    fetchTours();
  }, [locale, activeCategory, searchQuery]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));

      const categoriesDb: Category[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: (doc.data() as any).name || (doc.data() as any).destination,
        image: (doc.data() as any).image,
      }));

      setCategories([{ id: "all", name: "All", image: "" }, ...categoriesDb]);
    };

    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/hero-registan.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-20 w-40 h-40 rounded-full bg-coral/30 blur-3xl"
        />
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-gold font-body text-sm font-semibold tracking-wide uppercase mb-4"
            >
              <Zap size={16} />
              {t("trips_badge")}
            </motion.span>
            <h1 className="text-hero text-white mb-4">
              {t("trips_title")}
              <br />
              <span className="text-coral">{t("trips_subtitle")}</span>
            </h1>
            <p className="text-xl text-white/70 font-body">
              {t("trips_tagline")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-xl border-b border-border py-4 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`${tCommon("search")}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full border-2"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === "all") {
                      router.push("/trips");
                    } else {
                      router.push(`/trips?category=${cat.name}`);
                    }
                  }}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all",
                    (cat.id === "all" && !activeCategory) ||
                      activeCategory === cat.name
                      ? "bg-coral text-white shadow-glow"
                      : "bg-secondary text-foreground hover:bg-secondary/80",
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <p className="text-muted-foreground font-body mb-8">
            {t("trips_found", { count: tours.length })}
          </p>

          {tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {tours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body text-lg mb-4">
                {t("trips_no_results")}
              </p>
              <Button variant="outline" onClick={() => router.push("/trips")}>
                {tCommon("try_again")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Tours;
