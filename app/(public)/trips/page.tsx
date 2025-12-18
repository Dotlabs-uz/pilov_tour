"use client";

import Subscribe from "@/components/custom/Subcribe";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Calendar,
	Users,
	Star,
	Search,
	ArrowRight,
	Heart,
	Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import Footer from "@/components/custom/Footer";
import { Navbar } from "@/components/custom/Navbar";

export type LangCodes = "en" | "ru" | "ge" | "it" | "sp" | "uk" | "uz";

export type MultiLangString = {
	[key in LangCodes]?: string;
};

export interface TourPreview {
	id: string;
	images: string[];
	title: MultiLangString;
	description: MultiLangString;
	price: string;
	duration: {
		days: number | string;
		nights: number | string;
	};
	style: string;
	category?: string;
	tag?: string;
	tagColor?: string;
	rating?: number;
	tagline?: string;
	groupSize?: string;
}

export interface TourCard {
	id: string;
	images: string[];
	title: string;
	description: string;
	price: string;
	duration: {
		days: number | string;
		nights: number | string;
	};
	style: string;
	category?: string;
	tag?: string;
	tagColor?: string;
	rating?: number;
	tagline?: string;
	groupSize?: string;
}

export interface Category {
	id: string;
	name: string;
	image: string;
}

const Tours = () => {
	const [tours, setTours] = useState<TourCard[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const locale = useLocale();
	const router = useRouter();
	const searchParams = useSearchParams();
	const activeCategory = searchParams.get("category");

	useEffect(() => {
		const fetchTours = async () => {
			const snapshot = await getDocs(collection(db, "tours"));

			const toursData: TourCard[] = snapshot.docs
				.map((tourDoc) => {
					const data = tourDoc.data() as TourPreview;

					const titleObj = data.title || {};
					const descObj = data.description || {};

					const title =
						titleObj[locale as keyof typeof titleObj] ||
						titleObj["en"] ||
						Object.values(titleObj)[0] ||
						"";

					const description =
						descObj[locale as keyof typeof descObj] ||
						descObj["en"] ||
						Object.values(descObj)[0] ||
						"";

					return {
						id: tourDoc.id,
						images: data.images || [],
						title,
						description,
						price: data.price || "",
						duration: data.duration || { days: "", nights: "" },
						style: data.style || "",
						tag: data.tag || "",
						tagColor: data.tagColor || "",
						rating: data.rating || 0,
						tagline: data.tagline || "",
						groupSize: data.groupSize || "",
					};
				})
				.filter(Boolean) as TourCard[];

			const filteredTours = toursData.filter((tour) => {
				const matchesCategory =
					activeCategory === null || tour.category === activeCategory;
				const matchesSearch =
					tour.title
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					tour.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase());
				return matchesCategory && matchesSearch;
			});

			setTours(filteredTours);
		};

		fetchTours();
	}, [locale, activeCategory, searchQuery]);

	useEffect(() => {
		const fetchCategories = async () => {
			const snapshot = await getDocs(collection(db, "categories"));

			const categoriesDb: Category[] = snapshot.docs.map((doc) => ({
				id: doc.id,
				name:
					(doc.data() as any).name || (doc.data() as any).destination,
				image: (doc.data() as any).image,
			}));

			setCategories([
				{ id: "all", name: "All", image: "" },
				...categoriesDb,
			]);
		};

		fetchCategories();
	}, []);

	return (
		<main className="min-h-screen bg-cream">
			<Navbar />

			{/* Hero */}
			<section className="relative pt-32 pb-16 bg-navy overflow-hidden">
				<div className="absolute inset-0 opacity-30">
					<img
						src="/hero-registan.jpg"
						alt=""
						className="w-full h-full object-cover"
					/>
				</div>
				<motion.div
					animate={{ y: [0, -20, 0] }}
					transition={{ duration: 5, repeat: Infinity }}
					className="absolute top-20 right-20 w-40 h-40 rounded-full bg-coral/30 blur-3xl"
				/>
				<div className="relative container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-2xl"
					>
						<motion.span
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="inline-flex items-center gap-2 text-gold font-body text-sm font-semibold tracking-wide uppercase mb-4"
						>
							<Zap size={16} />
							Find your trip
						</motion.span>
						<h1 className="text-hero text-white mb-4">
							All
							<br />
							<span className="text-coral">adventures</span>
						</h1>
						<p className="text-xl text-white/70 font-body">
							Pick your vibe. We'll handle the rest.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Filters */}
			<section className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-xl border-b border-border py-4 shadow-sm">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center gap-4">
						{/* Search */}
						<div className="relative flex-1 max-w-md w-full">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
							<Input
								type="text"
								placeholder="Search trips..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-12 h-12 rounded-full border-2"
							/>
						</div>

						{/* Category Pills */}
						<div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
							{categories.map((cat) => (
								<button
									key={cat.id}
									onClick={() =>
										router.push(
											`/trips?category=${cat.name}`
										)
									}
									className={cn(
										"px-5 py-2.5 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all",
										activeCategory === cat.name
											? "bg-coral text-white shadow-glow"
											: "bg-secondary text-foreground hover:bg-secondary/80"
									)}
								>
									{cat.name}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Results */}
			<section className="py-12">
				<div className="container mx-auto px-6">
					<p className="text-muted-foreground font-body mb-8">
						{tours.length} trips found
					</p>

					{tours.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{tours.map((tour, index) => (
								<motion.article
									key={tour.id}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
								>
									<a href={`/trips/${tour.id}`}>
										<motion.div
											whileHover={{
												y: -8,
												rotate:
													index % 2 === 0 ? 1 : -1,
											}}
											className="card-playful group h-full"
										>
											<div className="relative h-[280px] overflow-hidden rounded-t-2xl">
												<motion.img
													whileHover={{ scale: 1.08 }}
													transition={{
														duration: 0.6,
													}}
													src={
														tour.images[0] ||
														"/placeholder.svg"
													}
													alt={tour.title}
													className="w-full h-full object-cover"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

												<div className="absolute top-4 left-4 flex gap-2">
													{tour.tag && (
														<span
															className={`px-3 py-1.5 rounded-full ${
																tour.tagColor ||
																"bg-primary"
															} text-white text-xs font-semibold`}
														>
															{tour.tag}
														</span>
													)}
												</div>

												<motion.button
													whileHover={{ scale: 1.2 }}
													whileTap={{ scale: 0.9 }}
													onClick={(e) =>
														e.preventDefault()
													}
													className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-navy hover:text-coral transition-colors"
												>
													<Heart size={18} />
												</motion.button>

												<div className="absolute bottom-4 left-4 right-4">
													<div className="flex items-center gap-1 mb-2">
														<Star
															size={14}
															className="fill-gold text-gold"
														/>
														<span className="text-white text-sm font-medium">
															{tour.rating ||
																"N/A"}
														</span>
													</div>
													<h3 className="font-display text-2xl font-bold text-white">
														{tour.title}
													</h3>
													<p className="text-white/70 text-sm">
														{tour.tagline}
													</p>
												</div>
											</div>

											<div className="p-5 bg-white rounded-b-2xl">
												<p className="text-muted-foreground font-body text-sm mb-4">
													{tour.description}
												</p>

												<div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
													<span className="flex items-center gap-1.5">
														<Calendar
															size={14}
															className="text-coral"
														/>
														{tour.duration.days}{" "}
														days,{" "}
														{tour.duration.nights}{" "}
														nights
													</span>
													<span className="flex items-center gap-1.5">
														<Users
															size={14}
															className="text-turquoise"
														/>
														{tour.groupSize ||
															"N/A"}
													</span>
												</div>

												<div className="flex items-center justify-between pt-4 border-t border-border">
													<div>
														<span className="text-muted-foreground text-xs">
															From
														</span>
														<span className="block font-display text-xl font-bold">
															$
															{Number(
																tour.price
															).toLocaleString()}
														</span>
													</div>
													<span className="flex items-center gap-2 text-coral text-sm font-semibold group-hover:gap-3 transition-all">
														View trip
														<ArrowRight size={16} />
													</span>
												</div>
											</div>
										</motion.div>
									</a>
								</motion.article>
							))}
						</div>
					) : (
						<div className="text-center py-20">
							<p className="text-muted-foreground font-body text-lg mb-4">
								No trips found. Try different filters!
							</p>
							<Button
								variant="outline"
								onClick={() => router.push("/trips")}
							>
								Clear filters
							</Button>
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default Tours;
