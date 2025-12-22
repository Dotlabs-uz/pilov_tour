"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { db } from "@/app/(public)/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Star,
  Check,
  X,
  Utensils,
  Home,
  Sparkles,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { LocalizedString } from "@/lib/types";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

type Lang = keyof LocalizedString;

type LocalizedValue = string | LocalizedString | null | undefined;

function t(value: LocalizedValue, locale: Lang): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  return (
    value[locale] ||
    value.en ||
    value.ru ||
    value.uz ||
    value.uk ||
    value.it ||
    value.sp ||
    value.ge ||
    Object.values(value).find((v) => typeof v === "string" && v.trim()) ||
    ""
  );
}

interface Tour {
  id: string;
  images: string[];
  title: LocalizedString;
  description: LocalizedString;
  price: string;
  duration: {
    days: number;
    nights: number;
  };
  style: string;
  maxGroupCount?: number;
  dates: TourDate[];
  itinerary: ItineraryItem[];
  inclusions: Inclusions;
}

interface TourDate {
  startDate: Timestamp;
  endDate: Timestamp;
  status: string;
  price: string;
}
interface ItineraryItem {
  title: LocalizedString;
  description: LocalizedString;
}
interface Inclusions {
  included: LocalizedString[];
  notIncluded: LocalizedString[];
}
export default function TourPage() {
  const params = useParams();
  const locale = useLocale() as Lang;
  const tourId = typeof params.id === "string" ? params.id : undefined;

  const [tour, setTour] = useState<Tour | null>(null);

  useEffect(() => {
    if (!tourId) return;

    const fetchTour = async () => {
      const tourRef = doc(db, "tours", tourId);
      const tourSnap = await getDoc(tourRef);

      if (!tourSnap.exists()) return;

      const data = tourSnap.data();

      setTour({
        id: tourSnap.id,
        images: data.images || [],
        price: data.price || "",
        duration: data.duration || { days: 0, nights: 0 },
        style: data.style || "",
        maxGroupCount: data.maxGroupCount || 0,
        title: data.title || {},
        description: data.description || {},
        dates: data.dates || [],
        itinerary: data.itinerary || [],
        inclusions: data.inclusions || {
          included: [],
          notIncluded: [],
        },
      });
    };

    fetchTour();
  }, [tourId, locale]);

  if (!tour) return <div className="p-10 text-center">Loading...</div>;

  const images = tour.images || [];
  const title = t(tour.title, locale);
  const description = t(tour.description, locale);
  const groupCount = tour.maxGroupCount || 0;

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={images[0] || "/tourImage1.jpg"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {title}
              </h1>

              <p className="font-body text-xl text-white/80 max-w-2xl mb-6">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <span className="flex items-center gap-2">
                  <Calendar size={18} className="text-coral" />
                  {tour.duration.days} days
                </span>
                <span className="flex items-center gap-2">
                  <Users size={18} className="text-turquoise" />
                  {groupCount ? `до ${groupCount} people` : "до 12 people"}
                </span>
                <span className="flex items-center gap-2">
                  <Star size={18} className="fill-gold text-gold" />
                  4.9 (127 reviews)
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-32 right-6 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-coral transition-colors"
          >
            <Heart size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-coral transition-colors"
          >
            <Share2 size={20} />
          </motion.button>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  What's this trip about?
                </h2>
                <p className="font-body text-muted-foreground text-lg leading-relaxed">
                  {description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Highlights ✨
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="flex items-start gap-3 bg-white rounded-2xl p-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-coral" />
                    </div>
                    <span className="font-body text-foreground">
                      Premium accommodation: Hand-picked boutique and luxury
                      hotels.
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3 bg-white rounded-2xl p-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-coral" />
                    </div>
                    <span className="font-body text-foreground">
                      Premium experiences: Local guides & unique cultural
                      activities.
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="flex items-start gap-3 bg-white rounded-2xl p-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-coral" />
                    </div>
                    <span className="font-body text-foreground">
                      Premium knowledge: In-depth historical & cultural insight.
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Day by Day 📅
                </h2>
                <div className="space-y-4">
                  {tour.itinerary.map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="bg-white rounded-2xl p-5 flex gap-4"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-coral to-gold flex items-center justify-center text-white font-display font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-foreground mb-1">
                          {t(day.title, locale)}
                        </h3>
                        <p className="font-body text-muted-foreground text-sm mb-3">
                          {t(day.description, locale)}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Utensils size={12} className="text-gold" />
                            Meals provided
                          </span>
                          <span className="flex items-center gap-1">
                            <Home size={12} className="text-turquoise" />
                            Accommodation
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Gallery 📸
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {images.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-2xl overflow-hidden ${
                        index === 0
                          ? "col-span-2 row-span-2 aspect-[4/3]"
                          : "aspect-square"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6"
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    What's included ✓
                  </h3>
                  <ul className="space-y-2">
                    {tour.inclusions.included.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm font-body"
                      >
                        <Check
                          size={16}
                          className="text-turquoise flex-shrink-0 mt-0.5"
                        />
                        {t(item, locale)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-3xl p-6"
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Not included ✗
                  </h3>
                  <ul className="space-y-2">
                    {tour.inclusions.notIncluded.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm font-body text-muted-foreground"
                      >
                        <X size={16} className="flex-shrink-0 mt-0.5" />
                        {t(item, locale)}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">Dates & Prices</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#8DD3BB] text-[#112211]">
                        <th className="p-3">Start</th>
                        <th className="p-3">End</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tour.dates.map((date, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">
                            {date.startDate.toDate().toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            {date.endDate.toDate().toLocaleDateString()}
                          </td>
                          <td
                            className={`p-3 ${
                              date.status === "Few spots"
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                          >
                            {date.status}
                          </td>
                          <td className="p-3 text-right font-semibold">
                            ${date.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-[120px] bg-white rounded-3xl p-6 shadow-card"
              >
                <div className="mb-6">
                  <span className="text-muted-foreground font-body text-sm">
                    From
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-foreground">
                      ${tour.price}
                    </span>
                    <span className="text-muted-foreground font-body">
                      / person
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                      <Calendar size={16} />
                      Duration
                    </span>
                    <span className="font-body font-semibold">
                      {tour.duration.days} days / {tour.duration.nights} nights
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                      <Users size={16} />
                      Group
                    </span>
                    <span className="font-body font-semibold">
                      {groupCount
                        ? `up to ${groupCount} people`
                        : "up to 12 people"}
                    </span>
                  </div>
                </div>

                <Button variant="gradient" size="xl" className="w-full mb-3">
                  <Sparkles size={18} />
                  Book Now
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Ask a question
                </Button>

                <p className="text-center text-muted-foreground text-xs font-body mt-4">
                  Free cancellation up to 30 days before
                </p>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
