"use client";
import { motion } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Testimonial {
  id: number;
  nameKey: string;
  locationKey: string;
  textKey: string;
  rating: number;
  tourKey: string;
  avatar: string;
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      nameKey: "testimonial_1_name",
      locationKey: "testimonial_1_location",
      textKey: "testimonial_1_text",
      rating: 5,
      tourKey: "testimonial_1_tour",
      avatar: "🇫🇷",
    },
    {
      id: 2,
      nameKey: "testimonial_2_name",
      locationKey: "testimonial_2_location",
      textKey: "testimonial_2_text",
      rating: 5,
      tourKey: "testimonial_2_tour",
      avatar: "🇩🇪",
    },
    {
      id: 3,
      nameKey: "testimonial_3_name",
      locationKey: "testimonial_3_location",
      textKey: "testimonial_3_text",
      rating: 5,
      tourKey: "testimonial_3_tour",
      avatar: "🇳🇱",
    },
  ];

  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 md:py-28 bg-navy text-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-body text-sm font-semibold tracking-wide uppercase mb-4 block">
            {t("badge")}
          </span>
          <h2 className="text-section mb-4">
            {t("title")}
            <br />
            {t("title_highlight")}
          </h2>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 rounded-2xl bg-coral flex items-center justify-center">
                <Quote size={24} className="text-white" />
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-6 pt-4">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="fill-gold text-gold" />
              ))}
            </div>

            {/* Quote */}
            <p className="font-body text-xl md:text-2xl text-white leading-relaxed mb-8">
              "{t(testimonials[activeIndex].textKey)}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-coral to-gold flex items-center justify-center text-2xl">
                {testimonials[activeIndex].avatar}
              </div>
              <div>
                <p className="font-display text-lg font-bold text-white">
                  {t(testimonials[activeIndex].nameKey)}
                </p>
                <p className="font-body text-sm text-white/60">
                  {t(testimonials[activeIndex].locationKey)} •{" "}
                  {t(testimonials[activeIndex].tourKey)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-8 bg-coral" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
        >
          {[
            { valueKey: "stat_travelers_value", labelKey: "stat_travelers" },
            { valueKey: "stat_rating_value", labelKey: "stat_rating" },
            { valueKey: "stat_return_value", labelKey: "stat_return" },
          ].map((stat) => (
            <div key={stat.labelKey}>
              <p className="font-display text-3xl md:text-4xl font-bold text-gold mb-1">
                {t(stat.valueKey)}
              </p>
              <p className="font-body text-sm text-white/60">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
