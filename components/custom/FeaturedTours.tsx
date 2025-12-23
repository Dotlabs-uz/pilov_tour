"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  ArrowRight,
  Heart,
  Zap,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourData, LocalizedString } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(public)/firebase";

export type TourCard = {
  id: string;
  images: string[];
  title: string;
  description: string;
  price: string;
  location: string[];
  duration: {
    days: string;
    nights: string;
  };
  style: string;
  maxGroupCount: number;
};

export function FeaturedTours() {
  const [tours, setTours] = useState<TourCard[]>([]);
  const locale = useLocale();

  useEffect(() => {
    const fetchTours = async () => {
      const snapshot = await getDocs(collection(db, "tours"));

      const toursData: TourCard[] = snapshot.docs.map((tourDoc) => {
        const data = tourDoc.data() as TourData;

        const title =
          data.title[locale as keyof LocalizedString] || data.title.en || "";

        const description =
          data.description[locale as keyof LocalizedString] ||
          data.description.en ||
          "";

        const location =
          data.location[locale as keyof LocalizedString] ||
          data.location.en ||
          "";

        return {
          id: tourDoc.id,
          images: data.images || [],
          title,
          description,
          price: data.price || "",
          duration: {
            days: data.duration.days?.toString() || "",
            nights: data.duration.nights?.toString() || "",
          },
          location: location.split(",").map((loc) => loc.trim()),
          style: data.style || "",
          maxGroupCount: data.maxGroupCount || 0,
        };
      });
      setTours(toursData);
    };

    fetchTours();
  }, [locale]);
  const t = useTranslations("FeaturedTours");

  console.log({ tours });

  return (
    <section className="py-20 md:py-28 bg-cream overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-coral font-body text-sm font-semibold tracking-wide uppercase mb-4"
            >
              <Zap size={16} />
              {t("ready_to_go")}
            </motion.span>
            <h2 className="text-section text-foreground">
              {t("pick_your")}
              <br />
              <span className="text-gradient">{t("adventure")}</span>
            </h2>
          </div>
          <p className="text-muted-foreground font-body text-lg max-w-md">
            {t("curated_trips_description")}
          </p>
        </motion.div>

        {/* Tours - Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/trips" className="group">
              {t("see_all_adventures")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function TourCard({ tour, index }: { tour: TourCard; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("FeaturedTours");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = tour.images.length ? tour.images : ["/tourImage1.jpg"];

  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      setCurrentImageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000); // Переключение каждые 2 секунды

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/trips/${tour.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="card-playful h-full"
        >
          <div className="relative h-[320px] lg:h-[380px] overflow-hidden rounded-t-2xl">
            {/* Images that switch one by one on hover */}
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                className="absolute inset-0"
                initial={{ opacity: idx === 0 ? 1 : 0 }}
                animate={{
                  opacity: idx === currentImageIndex ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src={src}
                  alt={`${tour.title} - Image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

            {/* Heart Button */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-navy hover:text-coral transition-colors"
            >
              <Heart size={18} />
            </motion.button>
          </div>

          {/* Card Body */}
          <div className="p-5 bg-white rounded-b-2xl">
            <h3 className="font-display text-2xl font-bold text-muted-foreground mb-2">
              {tour.title}
            </h3>

            {/* Location & Meta */}
            <div className="flex flex-col gap-2 mb-4 text-muted-foreground font-body">
              {/* Locations (max 2) */}
              {tour.location && tour.location.length > 0 && (
                <div className="flex items-center gap-1.5 text-sm">
                  <MapPin size={14} className="text-coral shrink-0" />
                  <span className="truncate">
                    {tour.location.slice(0, 2).join(" • ")}
                    {tour.location.length > 2
                      ? ` +${tour.location.length - 2} `
                      : ""}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-coral" />
                  {t("duration") + " " + tour.duration.days + " days"}
                </span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="block text-muted-foreground text-xs font-body uppercase tracking-wide">
                  From
                </span>
                <span className="block font-display text-xl font-bold text-foreground">
                  US ${tour.price}
                </span>
                <span className="block text-xs text-muted-foreground font-body">
                  per person
                </span>
              </div>
              <span className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-gradient-to-r from-coral to-gold text-white text-sm md:text-base font-body font-semibold shadow-md group-hover:shadow-lg group-hover:translate-x-0.5 transition-all">
                View tour
                <ArrowRight size={16} className="ml-1" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
