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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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

      setCurrentImageIndex(0);
    };

    fetchTour();
  }, [tourId, locale]);

  if (!tour) return <div className="p-10 text-center">Loading...</div>;

  const images = tour.images || [];
  const title = t(tour.title, locale);
  const description = t(tour.description, locale);
  const groupCount = tour.maxGroupCount || 0;
  
  const truncatedDescription = description.length > 200 
    ? description.substring(0, 200) + "..."
    : description;
  const shouldShowReadMore = description.length > 200;

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="pt-20 md:pt-24 lg:px-8 pb-4 md:pb-6 lg:pb-8">
        <div className="container mx-auto md:w-full">
          {/* Title above the image block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {title}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image on the left - first on mobile */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="relative h-[300px] md:h-[50vh] md:min-h-[400px] rounded-2xl overflow-hidden">
                <motion.img
                  key={currentImageIndex}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={images[currentImageIndex] || "/tourImage1.jpg"}
                  alt={title}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent rounded-2xl" />

                <div className="absolute top-8 right-8 flex gap-2">
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
              </div>

              {/* All images below the main image - swiper with 3 per row, hidden on mobile */}
              {images.length > 1 && (
                <div className="hidden md:block mt-4">
                  <Carousel
                    opts={{
                      align: "start",
                      slidesToScroll: 3,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {images.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-2 md:pl-4 basis-1/3"
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`relative h-28 md:h-32 rounded-2xl overflow-hidden cursor-pointer transition-all ${
                              currentImageIndex === index
                                ? "border-4 border-coral scale-105"
                                : "hover:scale-105 opacity-80 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${title} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 bg-white hover:bg-white/90 text-foreground border-0 shadow-lg" />
                    <CarouselNext className="right-0 bg-white hover:bg-white/90 text-foreground border-0 shadow-lg" />
                  </Carousel>
                </div>
              )}
            </div>

            {/* Booking sidebar on the right - second on mobile */}
            <aside className="lg:col-span-1 order-2 lg:order-2">
              {/* Description on mobile - shown after image */}
              <div className="lg:hidden bg-white rounded-3xl p-6 shadow-card">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  What's this trip about?
                </h2>
                <p className="font-body text-muted-foreground text-base leading-relaxed">
                  {isDescriptionExpanded ? description : truncatedDescription}
                </p>
                {shouldShowReadMore && (
                  <Button
                    variant="ghost"
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-4 text-coral hover:text-coral/80 p-0 h-auto"
                  >
                    {isDescriptionExpanded ? "Read less" : "Read more"}
                  </Button>
                )}
              </div>

              {/* Booking sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-[80px] bg-white rounded-3xl p-6 shadow-card mt-0"
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

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Description on desktop - full version */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block"
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
                    className={`relative rounded-2xl overflow-hidden ${index === 0
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
                          className={`p-3 ${date.status === "Few spots"
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
        </div>
      </section>
    </main>
  );
}
