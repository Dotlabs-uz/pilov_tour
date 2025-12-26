"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Timestamp } from "firebase/firestore";

export interface TourDate {
  startDate: Timestamp;
  endDate: Timestamp;
  status: "Available" | "Few spots" | "On request" | "Sold out";
  price: string;
}

interface Props {
  dates: TourDate[];
}

export default function DatesAndPrices({ dates }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [showAll, setShowAll] = useState(false);

  const sortedDates = [...dates].sort((a, b) => {
    const aTime = a.startDate.toMillis();
    const bTime = b.startDate.toMillis();
    return sort === "asc" ? aTime - bTime : bTime - aTime;
  });

  const visibleDates = showAll ? sortedDates : sortedDates.slice(0, 3);

  return (
    <section id="dates-prices-section" className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-xl font-semibold">Travel dates</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        >
          Start date ({sort === "asc" ? "earliest" : "latest"})
        </Button>
      </div>

      <div className="divide-y">
        {visibleDates.map((date, i) => {
          const isDisabled = date.status === "Sold out";
          const isOpen = expanded === i;

          return (
            <div key={i}>
              <div
                onClick={() => !isDisabled && setExpanded(isOpen ? null : i)}
                className={`flex items-center gap-4 p-4 transition
                  ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-muted/40"
                  }
                `}
              >
                <div className="flex-1 flex flex-col sm:flex-row sm:gap-12">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting</p>
                    <p className="font-medium">
                      {date.startDate.toDate().toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Ending</p>
                    <p className="font-medium">
                      {date.endDate.toDate().toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="hidden md:block min-w-[130px]">
                  <Status status={date.status} />
                </div>

                <div className="text-right min-w-[120px]">
                  <p className="text-xs text-muted-foreground">Prices from</p>
                  <p className="text-lg font-bold">USD ${date.price}</p>
                </div>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4 text-sm text-muted-foreground"
                  >
                    <p>• Price per person</p>
                    <p>• Limited availability</p>

                    <Button size="sm" className="mt-3">
                      Book this date
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {dates.length > 3 && (
        <div className="p-4 text-center">
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "View more dates"}
          </Button>
        </div>
      )}
    </section>
  );
}


function Status({ status }: { status: TourDate["status"] }) {
  const styles = {
    Available: "text-green-600",
    "Few spots": "text-red-600 font-semibold",
    "On request": "text-orange-500",
    "Sold out": "text-gray-400 line-through",
  };

  return <p className={styles[status]}>{status}</p>;
}
