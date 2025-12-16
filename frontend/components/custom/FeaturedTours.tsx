"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, ArrowRight, Star, Heart, Zap } from "lucide-react";
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
					data.title[locale as keyof LocalizedString] ||
					data.title.en ||
					"";

				const description =
					data.description[locale as keyof LocalizedString] ||
					data.description.en ||
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
							<span className="text-gradient">
								{t("adventure")}
							</span>
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
						<Link href="/tours" className="group">
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

	return (
		<motion.article
			ref={cardRef}
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.15 }}
			className={`group ${
				index === 0 ? "md:col-span-2 lg:col-span-1" : ""
			}`}
		>
			<Link href={`/trips/${tour.id}`}>
				<motion.div
					whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
					transition={{ duration: 0.3 }}
					className="card-playful h-full"
				>
					<div className="relative h-[320px] lg:h-[380px] overflow-hidden rounded-t-2xl">
						{/* Image */}
						<Image
							src={tour.images[0]}
							alt={tour.title}
							fill
							style={{ objectFit: "cover" }}
						/>

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

						{/* Content Overlay */}
						<div className="absolute bottom-0 left-0 right-0 p-5">
							<h3 className="font-display text-2xl font-bold text-white mb-1">
								{tour.title}
							</h3>
							<p className="text-white/70 font-body text-sm">
								{tour.description}
							</p>
						</div>
					</div>

					{/* Card Body */}
					<div className="p-5 bg-white rounded-b-2xl">
						<p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2">
							{tour.description}
						</p>

						{/* Meta */}
						<div className="flex items-center gap-4 mb-4 text-muted-foreground text-sm font-body">
							<span className="flex items-center gap-1.5">
								<Calendar size={14} className="text-coral" />
								{t("duration") +
									" " +
									tour.duration.days +
									" days"}
							</span>
						</div>

						{/* Price & CTA */}
						<div className="flex items-center justify-between pt-4 border-t border-border">
							<div>
								<span className="text-muted-foreground text-xs font-body">
									{t("from")}
								</span>
								<span className="block font-display text-xl font-bold text-foreground">
									€{tour.price}
								</span>
							</div>
							<span className="flex items-center gap-2 text-coral text-sm font-body font-semibold group-hover:gap-3 transition-all">
								{t("view_trip")}
								<ArrowRight size={16} />
							</span>
						</div>
					</div>
				</motion.div>
			</Link>
		</motion.article>
	);
}
