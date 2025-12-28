"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GitCompare } from "lucide-react";

export function CompareButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    // Function to update compare count from localStorage
    const updateCompareCount = () => {
      if (typeof window === "undefined") return;
      const compareTours = JSON.parse(
        localStorage.getItem("compareTours") || "[]"
      ) as string[];
      setCompareCount(compareTours.length);
    };

    // Initial update
    updateCompareCount();

    // Listen for custom event (when localStorage changes in same tab)
    window.addEventListener("compareToursUpdated", updateCompareCount);

    // Also poll occasionally to catch any missed updates
    const interval = setInterval(updateCompareCount, 1000);

    return () => {
      window.removeEventListener("compareToursUpdated", updateCompareCount);
      clearInterval(interval);
    };
  }, []);

  // Don't show button on compare page itself
  if (pathname === "/compare" || compareCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => router.push("/compare")}
        size="lg"
        variant="gradient"
        className="shadow-2xl hover:scale-105 transition-transform"
      >
        <GitCompare size={20} />
        Compare ({compareCount})
      </Button>
    </div>
  );
}
