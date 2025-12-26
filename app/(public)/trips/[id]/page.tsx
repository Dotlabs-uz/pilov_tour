"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { db, auth } from "@/app/(public)/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Star,
  Check,
  X,
  Sparkles,
  Heart,
  Share2,
  Info,
  MapPin,
  Plus,
  ChevronDown,
  Bed,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { LocalizedString } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TourDate } from "@/components/custom/DatesPrices";
import DatesAndPrices from "@/components/custom/DatesPrices";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

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
  itineraryImage?: string;
  name?: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  price: string;
  duration: {
    days: number;
    nights: number;
  };
  style: string;
  theme?: string;
  start?: string;
  end?: string;
  rating?: number;
  reviewsCount?: number;
  tripCode?: string;
  physicalRating?: number;
  minimumAge?: number;
  groupSize: LocalizedString;
  maxGroupCount?: number;
  dates: TourDate[];
  itinerary: ItineraryItem[];
  inclusions: Inclusions;
}

interface ItineraryItem {
  title: LocalizedString;
  description: LocalizedString;
  accommodation?: (string | LocalizedString)[];
  meals?: (string | LocalizedString)[];
  includedActivities?: (string | LocalizedString)[];
  optionalActivities?: (string | LocalizedString)[];
  specialInformation?: string | LocalizedString;
}
interface Inclusions {
  included: LocalizedString[];
  notIncluded: LocalizedString[];
}
export default function TourPage() {
  const params = useParams();
  const locale = useLocale() as Lang;
  const tourId = typeof params.id === "string" ? params.id : undefined;
  const router = useRouter();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedGalleryImageIndex, setSelectedGalleryImageIndex] = useState<number | null>(null);

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
        itineraryImage: data.itineraryImage || "",
        price: data.price || "",
        duration: data.duration || { days: 0, nights: 0 },
        style: data.style || "",
        theme: data.theme || "",
        start: data.start || "",
        end: data.end || "",
        rating: data.rating || 0,
        reviewsCount: data.reviewsCount || 0,
        tripCode: data.tripCode || "",
        physicalRating: data.physicalRating || 0,
        minimumAge: data.minimumAge || 0,
        maxGroupCount: data.maxGroupCount || 0,
        name: data.name || {},
        title: data.title || {},
        description: data.description || {},
        dates: data.dates || [],
        itinerary: data.itinerary || [],
        groupSize: data.groupSize || {},
        inclusions: data.inclusions || {
          included: [],
          notIncluded: [],
        },
      });

      setCurrentImageIndex(0);
    };

    fetchTour();
  }, [tourId, locale]);

  useEffect(() => {
    const name = t(tour?.name, locale);
    if (name) {
      document.title = name;
    }
  }, [tour]);

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // TODO: Check if user has liked this tour
      if (firebaseUser && tourId) {
        // Check like status from Firestore
        // For now, just set to false
        setIsLiked(false);
      }
    });

    return () => unsubscribe();
  }, [tourId]);

  if (!tour) return <div className="p-10 text-center">Loading...</div>;

  const images = tour.images || [];
  const name = t(tour.name, locale);
  const start = t(tour.start, locale);
  const end = t(tour.end, locale);
  const title = t(tour.title, locale);
  const theme = t(tour.theme, locale);
  const description = t(tour.description, locale);

  const groupSize = t(tour.groupSize, locale);

  // For mobile: show 2 lines with line-clamp, for desktop: show full or truncated at 200 chars
  const truncatedDescription =
    description.length > 200
      ? description.substring(0, 200) + "..."
      : description;
  const shouldShowReadMore = description.length > 100; // Show read more if description is long enough

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="pt-20 md:pt-24 lg:px-8 pb-4 md:pb-6 lg:pb-8">
        <div className="container mx-auto md:w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {name}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 order-1 lg:order-1">
              {/* Mobile carousel for images */}
              <div className="md:hidden mb-4">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-[300px] rounded-2xl overflow-hidden">
                          <Image
                            src={image}
                            alt={`${title} - Image ${index + 1}`}
                            fill
                            className="object-cover rounded-2xl"
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-white hover:bg-white/90 text-foreground border-0 shadow-lg" />
                  <CarouselNext className="right-2 bg-white hover:bg-white/90 text-foreground border-0 shadow-lg" />
                </Carousel>
              </div>

              {/* Desktop main image */}
              <div className="hidden md:block relative h-[300px] md:h-[50vh] md:min-h-[400px] rounded-2xl overflow-hidden">
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

                <div className="absolute top-8 right-8 hidden md:flex gap-2">
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
                            className={`relative h-28 md:h-32 rounded-2xl overflow-hidden cursor-pointer transition-all ${currentImageIndex === index
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

            <aside className="lg:col-span-1 order-2 lg:order-2">
              {/* Description on mobile - shown after image */}
              <div className="lg:hidden bg-white rounded-3xl p-6 shadow-card mb-7">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  {title}
                </h2>
                <p
                  className={`font-body text-muted-foreground text-base leading-relaxed ${!isDescriptionExpanded ? "line-clamp-2" : ""
                    }`}
                >
                  {isDescriptionExpanded ? description : description}
                </p>
                {shouldShowReadMore && (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="mt-4 text-coral hover:text-coral/80 p-0 h-auto"
                  >
                    {isDescriptionExpanded ? "Read less" : "Read more"}
                  </Button>
                )}

                {/* Like and Share buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    onClick={async () => {
                      if (!user) {
                        router.push("/login");
                        return;
                      }
                      // Toggle like
                      setIsLiked(!isLiked);
                      // TODO: Save like to Firestore
                      toast({
                        title: isLiked
                          ? "Removed from favorites"
                          : "Added to favorites",
                        description: isLiked
                          ? "This tour has been removed from your favorites"
                          : "This tour has been added to your favorites",
                      });
                    }}
                    className="flex-1 flex items-center gap-2"
                  >
                    <Heart
                      size={18}
                      className={isLiked ? "fill-current" : ""}
                    />
                    {isLiked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      try {
                        const url = window.location.href;
                        await navigator.clipboard.writeText(url);
                        toast({
                          title: "Link copied!",
                          description:
                            "The page link has been copied to your clipboard",
                        });
                      } catch (err) {
                        toast({
                          title: "Failed to copy",
                          description: "Please try again",
                          variant: "destructive",
                        });
                      }
                    }}
                    className="flex-1 flex items-center gap-2"
                  >
                    <Share2 size={18} />
                    Share
                  </Button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-[80px] bg-white rounded-3xl p-6 shadow-card mt-0"
              >
                {/* Rating and Trip Code */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Star
                      size={26}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="font-body font-semibold text-foreground text-2xl">
                      {tour.rating}
                    </span>
                  </div>
                </div>

                {/* Start and End Locations */}
                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                    <MapPin size={14} />
                    <span>
                      Start: <strong>{start}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
                    <MapPin size={14} />
                    <span>
                      End: <strong>{end}</strong>
                    </span>
                  </div>
                </div>

                {/* Details Grid - Two Columns */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <div className="py-3 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-1">
                        <Calendar size={16} />
                        Duration
                      </div>
                      <div className="font-body font-semibold">
                        {tour.duration.days} days
                      </div>
                    </div>

                    <div className="py-3 border-b border-border">
                      <div className="text-muted-foreground font-body text-sm mb-1">
                        Minimum age
                      </div>
                      <div className="font-body font-semibold">6 years old</div>
                    </div>

                    <div className="py-3 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-1">
                        Theme
                        <Info size={14} className="text-muted-foreground/60" />
                      </div>
                      <div className="font-body font-semibold">
                        {theme || "Overland, Wildlife"}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <div className="py-3 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-1">
                        <Users size={16} />
                        Group size
                      </div>
                      <div className="font-body font-semibold">{groupSize}</div>
                    </div>

                    <div className="py-3 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-1">
                        Style
                        <Info size={14} className="text-muted-foreground/60" />
                      </div>
                      <div className="font-body font-semibold">
                        {tour.style || "Basix"}
                      </div>
                    </div>

                    <div className="py-3 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground font-body text-sm mb-1">
                        Physical rating
                        <Info size={14} className="text-muted-foreground/60" />
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-3 h-3 rounded-sm ${level <= (tour.physicalRating || 3)
                                ? "bg-foreground"
                                : "bg-border border border-border"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-muted-foreground font-body text-sm">
                      From USD
                    </span>
                    <span className="font-display text-4xl font-bold text-foreground">
                      ${tour.price}
                    </span>
                  </div>
                </div>

                <Button
                  variant="gradient"
                  size="xl"
                  className="w-full mb-3"
                  onClick={() => {
                    const datesSection = document.getElementById(
                      "dates-prices-section"
                    );
                    if (datesSection) {
                      datesSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  <Sparkles size={18} />
                  Dates and prices
                </Button>
                <button className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm transition-colors">
                  <Plus size={16} />
                  Add to compare
                </button>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                {title}
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
                Itinerary 📅
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Image on the left (desktop) / top (mobile) */}
                {tour.itineraryImage && (
                  <div className="lg:col-span-1 order-1 lg:order-1">
                    <div className="lg:sticky lg:top-[80px]">
                      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                        <DialogTrigger asChild>
                          <div className="relative w-full rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                            <Image
                              src={tour.itineraryImage}
                              alt="Itinerary"
                              width={800}
                              height={600}
                              className="w-full h-auto object-cover rounded-2xl"
                            />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0">
                          <DialogTitle className="sr-only">Itinerary Image</DialogTitle>
                          <div className="relative w-full h-auto">
                            <Image
                              src={tour.itineraryImage}
                              alt="Itinerary"
                              width={1200}
                              height={900}
                              className="w-full h-auto object-contain rounded-lg"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}

                {/* Accordion on the right (desktop) / bottom (mobile) */}
                <div className={`${tour.itineraryImage ? "lg:col-span-2" : "lg:col-span-3"} order-2 lg:order-2`}>
                  <div className="space-y-0 border border-border rounded-2xl overflow-hidden bg-white">
                    {/* Header with Show all/Hide all button */}
                    <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (expandedDays.size === tour.itinerary.length) {
                            // All expanded, hide all
                            setExpandedDays(new Set());
                          } else {
                            // Not all expanded, show all
                            setExpandedDays(new Set(tour.itinerary.map((_, idx) => idx)));
                          }
                        }}
                        className="text-sm"
                      >
                        {expandedDays.size === tour.itinerary.length
                          ? "Hide all"
                          : "Show all"}
                      </Button>
                    </div>
                    {tour.itinerary.map((day, index) => {
                      const isExpanded = expandedDays.has(index);
                      const dayTitle = t(day.title, locale);
                      const dayDescription = t(day.description, locale);

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border last:border-b-0"
                        >
                          {/* Accordion Header */}
                          <button
                            onClick={() => {
                              const newSet = new Set(expandedDays);
                              if (isExpanded) {
                                newSet.delete(index);
                              } else {
                                newSet.add(index);
                              }
                              setExpandedDays(newSet);
                            }}
                            className="w-full flex items-center justify-between p-4 hover:bg-muted/40 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-display text-base font-medium text-muted-foreground">
                                Day {index + 1}
                              </span>
                              <span>•</span>
                              <span className="font-display text-base font-semibold text-foreground">
                                {dayTitle}
                              </span>
                            </div>
                            <ChevronDown
                              size={18}
                              className={`text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""
                                }`}
                            />
                          </button>

                          {/* Accordion Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-6 pt-2 space-y-6">
                                  {/* Main Description */}
                                  {dayDescription && (
                                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                                      {dayDescription}
                                    </p>
                                  )}

                                  {/* Two Column Grid for Sections */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Accommodation */}
                                    {day.accommodation && day.accommodation.length > 0 && (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                          <Bed size={16} className="text-muted-foreground" />
                                          <h4 className="font-display text-sm font-semibold text-foreground">
                                            Accommodation
                                          </h4>
                                        </div>
                                        <ul className="space-y-1 pl-6">
                                          {day.accommodation.map((item, idx) => {
                                            const itemText = t(item, locale);
                                            return itemText ? (
                                              <li
                                                key={idx}
                                                className="font-body text-sm text-muted-foreground list-disc"
                                              >
                                                {itemText}
                                              </li>
                                            ) : null;
                                          })}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Meals */}
                                    {day.meals && day.meals.length > 0 && (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                          <Utensils size={16} className="text-muted-foreground" />
                                          <h4 className="font-display text-sm font-semibold text-foreground">
                                            Meals
                                          </h4>
                                        </div>
                                        <ul className="space-y-1 pl-6">
                                          {day.meals.map((item, idx) => {
                                            const itemText = t(item, locale);
                                            return itemText ? (
                                              <li
                                                key={idx}
                                                className="font-body text-sm text-muted-foreground list-disc"
                                              >
                                                {itemText}
                                              </li>
                                            ) : null;
                                          })}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Included Activities */}
                                    {day.includedActivities && day.includedActivities.length > 0 && (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                          <Check size={16} className="text-muted-foreground" />
                                          <h4 className="font-display text-sm font-semibold text-foreground">
                                            Included activities
                                          </h4>
                                        </div>
                                        <ul className="space-y-1 pl-6">
                                          {day.includedActivities.map((item, idx) => {
                                            const itemText = t(item, locale);
                                            return itemText ? (
                                              <li
                                                key={idx}
                                                className="font-body text-sm text-muted-foreground list-disc"
                                              >
                                                {itemText}
                                              </li>
                                            ) : null;
                                          })}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Optional Activities */}
                                    {day.optionalActivities && day.optionalActivities.length > 0 && (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                          <Plus size={16} className="text-muted-foreground" />
                                          <h4 className="font-display text-sm font-semibold text-foreground">
                                            Optional activities
                                          </h4>
                                        </div>
                                        <ul className="space-y-1 pl-6">
                                          {day.optionalActivities.map((item, idx) => {
                                            const itemText = t(item, locale);
                                            return itemText ? (
                                              <li
                                                key={idx}
                                                className="font-body text-sm text-muted-foreground list-disc"
                                              >
                                                {itemText}
                                              </li>
                                            ) : null;
                                          })}
                                        </ul>
                                      </div>
                                    )}
                                  </div>

                                  {/* Special Information */}
                                  {day.specialInformation && (
                                    <div className="space-y-2 pt-2 border-t border-border">
                                      <h4 className="font-display text-sm font-semibold text-foreground">
                                        Special information
                                      </h4>
                                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                                        {t(day.specialInformation, locale)}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((image, index) => (
                  <Dialog
                    key={index}
                    open={selectedGalleryImageIndex === index}
                    onOpenChange={(open) => {
                      if (!open) {
                        setSelectedGalleryImageIndex(null);
                      } else {
                        setSelectedGalleryImageIndex(index);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
                      >
                        <Image
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0">
                      <DialogTitle className="sr-only">
                        Gallery Image {index + 1}
                      </DialogTitle>
                      <div className="relative w-full h-auto">
                        <Image
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          width={1200}
                          height={900}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
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

            <DatesAndPrices dates={tour.dates} />
          </div>
        </div>
      </section>
    </main>
  );
}
