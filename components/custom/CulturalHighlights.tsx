"use client";

import { motion} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(public)/firebase";
import { HighlightData } from "@/lib/types";

export function CulturalHighlights() {
  const t = useTranslations("CulturalHighlights");
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const locale = useLocale();

  useEffect(() => {
    const fetchArticles = async () => {
      const snapshot = await getDocs(collection(db, "articles"));
      const lang = locale.split("-")[0];

      const articlesData: HighlightData[] = snapshot.docs.map((doc) => {
        const data = doc.data() as any;
        const titleObj = data.title || {};
        const title =
          titleObj[lang] ||
          titleObj["en"] ||
          Object.values(titleObj)[0] ||
          "Untitled";

        return {
          id: doc.id,
          title,
          coverImage: data.coverImage || "",
        };
      });

      setHighlights(articlesData);
    };

    fetchArticles();
  }, [locale]);

  return (
    <section className="py-20 md:py-28 bg-sand overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-flex items-center gap-2 text-coral font-body text-sm font-semibold tracking-wide uppercase mb-4">
            <Sparkles size={16} />
            {t("discover_more")}
          </span>
          <h2 className="text-section text-foreground mb-6">
            {t("beyond_the")}
            <br />
            <span className="text-gradient-ocean">{t("monuments")}</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={highlight.id}
                highlight={highlight}
                index={index}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-primary font-body font-semibold hover:gap-3 transition-all group"
          >
            {t("read_travel_stories")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function HighlightCard({
  highlight,
  index,
}: {
  highlight: HighlightData;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("CulturalHighlights");
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{
        scale: 1.03,
        zIndex: 10,
        rotate: index % 2 === 0 ? 1 : -1,
      }}
      className="relative group"
      style={{ transformOrigin: "center center" }}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-card bg-white">
        <div className="relative h-[280px] md:h-[320px] overflow-hidden">
          <Image
            src={highlight.coverImage}
            alt={highlight.title}
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-coral/30 to-transparent opacity-60`}
          />
        </div>

        <div className="p-6">
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            {highlight.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
