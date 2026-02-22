"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  const handleScrollToTours = () => {
    const section = document.getElementById("tours-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden bg-white md:overflow-visible">

      <div className="relative h-[550px] md:h-[calc(100vh-6rem)] px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
        <Carousel
          className="h-full rounded-2xl overflow-hidden"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="h-full">
            <CarouselItem className="h-full">
              <div className="relative h-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0 h-full w-full overflow-hidden bg-gray-700 rounded-2xl">
                  <video
                    className="h-full w-full object-cover"
                    src="/banner1.mp4" 
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />

                <div className="relative z-10 h-full md:px-12">
                  <div className="container mx-auto px-6 flex flex-col justify-center h-[550px] md:h-[650px]">
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/90 text-white text-sm font-body font-medium shadow-glow">
                          <Sparkles size={14} />
                          {t("slide1_badge")}
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-hero text-white mb-6"
                      >
                        {t("slide1_title")}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-hero-sub text-white/80 max-w-xl mb-10"
                      >
                        {t("slide1_subtitle")}
                        <br className="hidden sm:block" />
                        {t("slide1_subtitle2")}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Button
                          variant="gradient"
                          size="xl"
                          onClick={handleScrollToTours}
                          className="flex items-center gap-2"
                        >
                          {t("slide1_button")}
                          <ArrowRight size={20} />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="h-full">
              <div className="relative h-full rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 h-full w-full bg-gray-700 bg-cover bg-center rounded-2xl"
                  style={{ backgroundImage: "url(/banner2.webp)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />

                <div className="relative z-10 h-full md:px-12">
                  <div className="container mx-auto px-6 flex flex-col justify-center h-[550px] md:h-[650px]">
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/90 text-white text-sm font-body font-medium shadow-glow">
                          <Sparkles size={14} />
                          {t("slide2_badge")}
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-hero text-white mb-6"
                      >
                        {t("slide2_title")}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-hero-sub text-white/80 max-w-xl mb-10"
                      >
                        {t("slide2_subtitle")}
                        <br className="hidden sm:block" />
                        {t("slide2_subtitle2")}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Button variant="gradient" size="xl" asChild>
                          <Link
                            href="/articles"
                            className="flex items-center gap-2"
                          >
                            {t("slide2_button")}
                            <ArrowRight size={20} />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="h-full">
              <div className="relative h-full rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 h-full w-full bg-gray-700 bg-cover bg-center rounded-2xl"
                  style={{ backgroundImage: "url(/hero-registan.jpg)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />

                <div className="relative z-10 h-full md:px-12">
                  <div className="container mx-auto px-6 flex flex-col justify-center h-[550px] md:h-[650px]">
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/90 text-white text-sm font-body font-medium shadow-glow">
                          <Sparkles size={14} />
                          {t("slide3_badge")}
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-hero text-white mb-6"
                      >
                        {t("slide3_title")}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-hero-sub text-white/80 max-w-xl mb-10"
                      >
                        {t("slide3_subtitle")}
                        <br className="hidden sm:block" />
                        {t("slide3_subtitle2")}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Button variant="gradient" size="xl" asChild>
                          <Link
                            href="/about"
                            className="flex items-center gap-2"
                          >
                            {t("slide3_button")}
                            <ArrowRight size={20} />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex bg-white text-navy hover:bg-white/90 shadow-lg !left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="hidden md:flex bg-white text-navy hover:bg-white/90 shadow-lg !right-2 !top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
