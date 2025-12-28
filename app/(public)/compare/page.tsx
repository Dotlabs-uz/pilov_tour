"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { db } from "@/app/(public)/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { X, Star, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LocalizedString } from "@/lib/types";

type Lang = "en" | "ru" | "uz" | "uk" | "it" | "sp" | "ge";

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

interface ItineraryItem {
  title: LocalizedString;
  description: LocalizedString;
}

interface Tour {
  id: string;
  images: string[];
  name?: LocalizedString;
  title: LocalizedString;
  price: string;
  duration: {
    days: number;
    nights: number;
  };
  style: string;
  theme?: string | LocalizedString;
  start?: string | LocalizedString;
  end?: string | LocalizedString;
  rating?: number;
  reviewsCount?: number;
  tripCode?: string;
  physicalRating?: number;
  minimumAge?: number;
  groupSize: LocalizedString;
  maxGroupCount?: number;
  destinations?: (string | LocalizedString)[];
  location?: string | LocalizedString;
  itinerary?: ItineraryItem[];
  includedActivities?: (string | LocalizedString)[];
  optionalActivities?: (string | LocalizedString)[];
  meals?: string | LocalizedString;
  transport?: string | LocalizedString;
}

export default function ComparePage() {
  const router = useRouter();
  const locale = useLocale() as Lang;
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchTours = async () => {
      const compareIds = JSON.parse(
        localStorage.getItem("compareTours") || "[]"
      ) as string[];

      if (compareIds.length === 0) {
        setLoading(false);
        return;
      }

      const toursData: Tour[] = [];
      for (const id of compareIds) {
        try {
          const tourRef = doc(db, "tours", id);
          const tourSnap = await getDoc(tourRef);

          if (tourSnap.exists()) {
            const data = tourSnap.data();
            toursData.push({
              id: tourSnap.id,
              images: data.images || [],
              name: data.name || {},
              title: data.title || {},
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
              groupSize: data.groupSize || {},
              maxGroupCount: data.maxGroupCount || 0,
              destinations: data.destinations || [],
              location: data.location || "",
              itinerary: data.itinerary || [],
              includedActivities: data.includedActivities || [],
              optionalActivities: data.optionalActivities || [],
              meals: data.meals || "",
              transport: data.transport || "",
            });
          }
        } catch (error) {
          console.error(`Error fetching tour ${id}:`, error);
        }
      }

      setTours(toursData);
      setLoading(false);
    };

    fetchTours();
  }, []);

  const removeTour = (tourId: string) => {
    const compareIds = JSON.parse(
      localStorage.getItem("compareTours") || "[]"
    ) as string[];
    const updatedIds = compareIds.filter((id) => id !== tourId);
    localStorage.setItem("compareTours", JSON.stringify(updatedIds));
    
    // Update tours state
    setTours(tours.filter((tour) => tour.id !== tourId));
    
    // Dispatch custom event to update CompareButton
    window.dispatchEvent(new Event("compareToursUpdated"));
  };

  const removeAllTours = () => {
    localStorage.setItem("compareTours", JSON.stringify([]));
    setTours([]);
    
    // Dispatch custom event to update CompareButton
    window.dispatchEvent(new Event("compareToursUpdated"));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Compare trips</h1>
            <p className="text-muted-foreground mb-8">
              No trips to compare. Add trips to compare them side by side.
            </p>
            <Button asChild>
              <Link href="/trips">Browse Trips</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Comparison fields to display
  const comparisonFields = [
    {
      label: "Days",
      getValue: (tour: Tour) => tour.duration.days?.toString() || "—",
    },
    {
      label: "Nights",
      getValue: (tour: Tour) => tour.duration.nights?.toString() || "—",
    },
    {
      label: "Price",
      getValue: (tour: Tour) => tour.price ? `$${tour.price}` : "—",
    },
    {
      label: "Reviews",
      getValue: (tour: Tour) => tour.reviewsCount?.toString() || "—",
    },
    {
      label: "Start",
      getValue: (tour: Tour) => {
        if (!tour.start) return "—";
        return typeof tour.start === "string" ? tour.start : t(tour.start, locale);
      },
    },
    {
      label: "End",
      getValue: (tour: Tour) => {
        if (!tour.end) return "—";
        return typeof tour.end === "string" ? tour.end : t(tour.end, locale);
      },
    },
    {
      label: "Group Size",
      getValue: (tour: Tour) => t(tour.groupSize, locale) || tour.maxGroupCount?.toString() || "—",
    },
    {
      label: "Style",
      getValue: (tour: Tour) => tour.style || "—",
    },
    {
      label: "Theme",
      getValue: (tour: Tour) => {
        if (!tour.theme) return "—";
        return typeof tour.theme === "string" ? tour.theme : t(tour.theme, locale);
      },
    },
    {
      label: "Destinations",
      getValue: (tour: Tour) => {
        if (tour.destinations && tour.destinations.length > 0) {
          return tour.destinations
            .map((dest) => typeof dest === "string" ? dest : t(dest, locale))
            .join(", ");
        }
        if (tour.location) {
          return typeof tour.location === "string" ? tour.location : t(tour.location, locale);
        }
        return "—";
      },
    },
    {
      label: "Itinerary",
      getValue: (tour: Tour) => {
        if (!tour.itinerary || tour.itinerary.length === 0) return "—";
        return "ITINERARY_LIST";
      },
      renderAsList: true,
    },
    {
      label: "Included activities",
      getValue: (tour: Tour) => {
        if (!tour.includedActivities || tour.includedActivities.length === 0) return "—";
        return "ACTIVITIES_LIST";
      },
      renderAsList: true,
      listType: "included",
    },
    {
      label: "Optional activities",
      getValue: (tour: Tour) => {
        if (!tour.optionalActivities || tour.optionalActivities.length === 0) return "—";
        return "ACTIVITIES_LIST";
      },
      renderAsList: true,
      listType: "optional",
    },
    {
      label: "Meals",
      getValue: (tour: Tour) => {
        if (!tour.meals) return "—";
        return typeof tour.meals === "string" ? tour.meals : t(tour.meals, locale);
      },
    },
    {
      label: "Transport",
      getValue: (tour: Tour) => {
        if (!tour.transport) return "—";
        return typeof tour.transport === "string" ? tour.transport : t(tour.transport, locale);
      },
    },
    {
      label: "Physical Rating",
      getValue: (tour: Tour) => {
        if (!tour.physicalRating) return "—";
        return tour.physicalRating.toString();
      },
      renderAsVisual: true,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Compare trips
            </h1>
            <p className="text-muted-foreground">
              Add up to 4 trips
            </p>
          </div>
          <Button
            variant="outline"
            onClick={removeAllTours}
            className="w-fit"
          >
            <X size={16} />
            Remove all trips
          </Button>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tours.map((tour) => {
            const name = t(tour.name, locale) || t(tour.title, locale);
            const mainImage = tour.images?.[0] || "/tourImage1.jpg";
            
            return (
              <div
                key={tour.id}
                className="relative bg-white rounded-2xl shadow-card overflow-hidden border border-border"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeTour(tour.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Remove tour"
                >
                  <X size={16} className="text-foreground" />
                </button>

                {/* Map/Image placeholder */}
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={mainImage}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Tour Info */}
                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={20} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">
                      {tour.rating?.toFixed(1) || "—"}
                    </span>
                    {tour.reviewsCount && (
                      <span className="text-sm text-muted-foreground">
                        · {tour.reviewsCount} reviews
                      </span>
                    )}
                  </div>

                  {/* Trip Name */}
                  <h3 className="font-display text-lg font-bold text-foreground mb-3 line-clamp-2">
                    {name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-muted-foreground text-sm">From USD </span>
                    <span className="font-bold text-foreground text-xl">
                      ${tour.price || "—"}
                    </span>
                  </div>

                  {/* View Trip Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href={`/trips/${tour.id}`}>View trip</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="text-left p-4 font-semibold text-foreground">
                    Details
                  </th>
                  {tours.map((tour) => {
                    const name = t(tour.name, locale) || t(tour.title, locale);
                    return (
                      <th
                        key={tour.id}
                        className="text-left p-4 font-semibold text-foreground min-w-[200px]"
                      >
                        {name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-b-0 hover:bg-gray-50/50"
                  >
                    <td className="p-4 font-medium text-foreground">
                      {field.label}
                    </td>
                    {tours.map((tour) => {
                      const value = field.getValue(tour);
                      const ratingValue = field.label === "Physical Rating" && tour.physicalRating ? tour.physicalRating : null;
                      const expandedKey = `${tour.id}-${field.label}`;
                      const isExpanded = expandedItems[expandedKey];

                      return (
                        <td key={tour.id} className="p-4 text-muted-foreground">
                          {field.renderAsVisual && ratingValue ? (
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`w-3 h-3 rounded-sm ${
                                    level <= ratingValue
                                      ? "bg-foreground"
                                      : "bg-border border border-border"
                                  }`}
                                />
                              ))}
                            </div>
                          ) : field.renderAsList && value !== "—" ? (
                            <div className="space-y-1">
                              {field.label === "Itinerary" && tour.itinerary ? (
                                <>
                                  <div className="text-sm">
                                    {(isExpanded ? tour.itinerary : tour.itinerary.slice(0, 3)).map((day, idx) => (
                                      <div key={idx} className="mb-1">
                                        {t(day.title, locale)}
                                      </div>
                                    ))}
                                  </div>
                                  {tour.itinerary.length > 3 && (
                                    <button
                                      onClick={() => {
                                        setExpandedItems((prev) => ({
                                          ...prev,
                                          [expandedKey]: !prev[expandedKey],
                                        }));
                                      }}
                                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                                    >
                                      {isExpanded ? "Show less" : `Show all (${tour.itinerary.length} days)`}
                                      <ChevronDown
                                        size={12}
                                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                      />
                                    </button>
                                  )}
                                </>
                              ) : field.listType === "included" && tour.includedActivities ? (
                                <>
                                  <div className="text-sm">
                                    {(isExpanded ? tour.includedActivities : tour.includedActivities.slice(0, 3)).map((act, idx) => (
                                      <div key={idx} className="mb-1">
                                        {typeof act === "string" ? act : t(act, locale)}
                                      </div>
                                    ))}
                                  </div>
                                  {tour.includedActivities.length > 3 && (
                                    <button
                                      onClick={() => {
                                        setExpandedItems((prev) => ({
                                          ...prev,
                                          [expandedKey]: !prev[expandedKey],
                                        }));
                                      }}
                                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                                    >
                                      {isExpanded ? "Show less" : `Show all (${tour.includedActivities.length})`}
                                      <ChevronDown
                                        size={12}
                                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                      />
                                    </button>
                                  )}
                                </>
                              ) : field.listType === "optional" && tour.optionalActivities ? (
                                <>
                                  <div className="text-sm">
                                    {(isExpanded ? tour.optionalActivities : tour.optionalActivities.slice(0, 3)).map((act, idx) => (
                                      <div key={idx} className="mb-1">
                                        {typeof act === "string" ? act : t(act, locale)}
                                      </div>
                                    ))}
                                  </div>
                                  {tour.optionalActivities.length > 3 && (
                                    <button
                                      onClick={() => {
                                        setExpandedItems((prev) => ({
                                          ...prev,
                                          [expandedKey]: !prev[expandedKey],
                                        }));
                                      }}
                                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                                    >
                                      {isExpanded ? "Show less" : `Show all (${tour.optionalActivities.length})`}
                                      <ChevronDown
                                        size={12}
                                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                      />
                                    </button>
                                  )}
                                </>
                              ) : null}
                            </div>
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
