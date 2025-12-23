"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const floatingTags = [
  { text: "Samarkand", top: "20%", left: "60%", delay: 0 },
  { text: "Bukhara", top: "35%", left: "75%", delay: 0.5 },
  { text: "Khiva", top: "55%", left: "65%", delay: 1 },
];

export function HeroSection() {
  const handleScrollToTours = () => {
    const section = document.getElementById("tours-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden bg-white md:overflow-visible">
      {/* Floating Location Tags */}
      {/* {floatingTags.map((tag, index) => (
				<motion.div
					key={tag.text}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 1 + tag.delay, duration: 0.5 }}
					className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white text-sm font-body"
					style={{ top: tag.top, left: tag.left }}
				>
					<MapPin size={14} className="text-coral" />
					{tag.text}
				</motion.div>
			))} */}

      {/* Carousel with video slides */}
      <div className="relative h-[550px] md:h-[calc(100vh-6rem)] px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
        <Carousel
          className="h-full rounded-2xl overflow-hidden"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="h-full">
            {/* Slide 1 */}
            <CarouselItem className="h-full">
              <div className="relative h-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0 h-full w-full overflow-hidden bg-gray-700 rounded-2xl">
                  <video
                    className="h-full w-full object-cover"
                    src="/banner1.mp4" // положи файл в public/ или укажи свой путь
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
                          New Season 2025
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-hero text-white mb-6"
                      >
                        Feel the{" "}
                        <span className="text-gradient">Silk Road</span>
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-hero-sub text-white/80 max-w-xl mb-10"
                      >
                        Ancient cities. Epic food. Real adventures.
                        <br className="hidden sm:block" />
                        Discover Central Asia your way.
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
                          Explore Now
                          <ArrowRight size={20} />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 2 */}
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
                          New Stories 2025
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-hero text-white mb-6"
                      >
                        Stories from the{" "}
                        <span className="text-gradient">Silk Road</span>
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-hero-sub text-white/80 max-w-xl mb-10"
                      >
                        Real travelers. Honest emotions. Unforgettable moments.
                        <br className="hidden sm:block" />
                        See Central Asia through their eyes.
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
                            Read Their Stories
                            <ArrowRight size={20} />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3 */}
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
                          Meet Pilav Tour
                        </span>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-hero text-white mb-6"
                      >
                        More Than a{" "}
                        <span className="text-gradient">Tour Company</span>
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-hero-sub text-white/80 max-w-xl mb-10"
                      >
                        We are local experts, storytellers, and hosts —
                        <br className="hidden sm:block" />
                        creating meaningful journeys across Central Asia.
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
                            Meet Pilav Tour
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

      {/* Scroll Indicator */}
      {/* <motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
				className="absolute bottom-10 left-1/2 -translate-x-1/2"
			>
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 1.5, repeat: Infinity }}
					className="flex flex-col items-center gap-2 text-white/60 text-sm font-body"
				>
					<span>Scroll to explore</span>
					<div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
						<motion.div
							animate={{ y: [0, 12, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="w-1.5 h-3 rounded-full bg-coral"
						/>
					</div>
				</motion.div>
			</motion.div> */}
    </section>
  );
}
