"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play, MapPin, Search, Sparkles } from "lucide-react"; // Added Search
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Added Input back
import { useTranslations } from "next-intl"; // Added useTranslations back

const floatingTags = [
	{ text: "Samarkand", top: "20%", left: "60%", delay: 0 },
	{ text: "Bukhara", top: "35%", left: "75%", delay: 0.5 },
	{ text: "Khiva", top: "55%", left: "65%", delay: 1 },
];

export function HeroSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

	const t = useTranslations("HeroSection"); // Added t back

	return (
		<section
			ref={containerRef}
			className="relative h-screen min-h-[800px] overflow-hidden bg-navy"
		>
			{/* Background Image with Parallax */}
			<motion.div style={{ y, scale }} className="absolute inset-0">
				<div
					className="w-full h-[130%] object-cover bg-gray-700 flex items-center justify-center text-white"
					style={{
						backgroundImage: `url(/hero-registan.jpg)`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* Placeholder for hero image */}
				</div>
				<div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/30 to-navy/80" />
				<div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-transparent" />
			</motion.div>

			{/* Floating Location Tags */}
			{floatingTags.map((tag, index) => (
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
			))}

			{/* Content */}
			<motion.div style={{ opacity }} className="relative h-full">
				<div className="container mx-auto px-6 h-full flex flex-col justify-center pt-20">
					<div className="max-w-3xl">
						{/* Badge */}
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

						{/* Main Headline */}
						<motion.h1
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.3 }}
							className="text-hero text-white mb-6"
						>
							Feel the
							<br />
							<span className="text-gradient">Silk Road</span>
						</motion.h1>

						{/* Description - Short & Punchy */}
						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className="text-hero-sub text-white/80 max-w-xl mb-10"
						>
							Ancient cities. Epic food. Real adventures.
							<br className="hidden sm:block" />
							Discover Uzbekistan your way.
						</motion.p>

						{/* CTAs */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.7 }}
							className="flex flex-wrap gap-4"
						>
							<Button variant="gradient" size="xl" asChild>
								<Link href="/tours">
									Explore Now
									<ArrowRight size={20} />
								</Link>
							</Button>
							<Button variant="hero" size="xl" className="group">
								<Play
									size={20}
									className="group-hover:scale-110 transition-transform"
								/>
								Watch Film
							</Button>
						</motion.div>

						{/* Social Proof */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.2 }}
							className="mt-12 flex items-center gap-6"
						>
							<div className="flex -space-x-3">
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-gold border-2 border-white"
									/>
								))}
							</div>
							<div className="text-white/80 text-sm font-body">
								<span className="text-white font-semibold">
									2,500+
								</span>{" "}
								travelers
								<br />
								<span className="text-gold font-semibold">
									4.9★
								</span>{" "}
								rating
							</div>
						</motion.div>
					</div>

					{/* Search Bar */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-xl mx-auto flex items-center gap-3 shadow-medium"
					>
						<Search size={20} className="text-white/70" />
						<Input
							type="text"
							placeholder={t("search_placeholder")}
							className="flex-grow bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0 text-lg"
						/>
						<Button variant="hero" size="lg">
							{t("search_button")}
						</Button>
					</motion.div>
				</div>

				{/* Scroll Indicator */}
				<motion.div
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
				</motion.div>
			</motion.div>
		</section>
	);
}
