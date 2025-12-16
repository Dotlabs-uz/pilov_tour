"use client";
import { motion } from "framer-motion";
import { MapPin, Users, Shield, Heart, Compass, Coffee } from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
	{
		icon: MapPin,
		title: "local_know_how_title",
		description: "local_know_how_description",
		color: "text-coral",
		bg: "bg-coral/10",
	},
	{
		icon: Users,
		title: "small_crews_only_title",
		description: "small_crews_only_description",
		color: "text-turquoise",
		bg: "bg-turquoise/10",
	},
	{
		icon: Coffee,
		title: "food_obsessed_title",
		description: "food_obsessed_description",
		color: "text-gold",
		bg: "bg-gold/10",
	},
	{
		icon: Compass,
		title: "flex_it_your_way_title",
		description: "flex_it_your_way_description",
		color: "text-primary",
		bg: "bg-primary/10",
	},
	{
		icon: Heart,
		title: "real_experiences_title",
		description: "real_experiences_description",
		color: "text-coral",
		bg: "bg-coral/10",
	},
	{
		icon: Shield,
		title: "years_trusted_title",
		description: "years_trusted_description",
		color: "text-accent",
		bg: "bg-accent/10",
	},
];

export function WhyPilavtour() {
	const t = useTranslations("WhyPilavtour");

	return (
		<section className="py-20 md:py-28 bg-white relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-coral/10 to-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-turquoise/10 to-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

			<div className="container mx-auto px-6 relative">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center max-w-2xl mx-auto mb-16"
				>
					<span className="inline-flex items-center gap-2 text-turquoise font-body text-sm font-semibold tracking-wide uppercase mb-4 block">
						{t("why_us")}
					</span>
					<h2 className="text-section text-foreground mb-6">
						{t("not_your_average")}
						<br />
						<span className="text-gradient">
							{t("travel_company")}
						</span>
					</h2>
					<p className="text-muted-foreground font-body text-lg">
						{t("description")}
					</p>
				</motion.div>

				{/* Features - Playful Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{
								y: -5,
								rotate: index % 2 === 0 ? 1 : -1,
							}}
							className="group bg-cream rounded-3xl p-8 transition-all duration-300 hover:shadow-medium cursor-default"
						>
							<motion.div
								whileHover={{ scale: 1.1, rotate: -5 }}
								className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-5`}
							>
								<feature.icon
									className={`w-7 h-7 ${feature.color}`}
								/>
							</motion.div>
							<h3 className="font-display text-xl font-bold text-foreground mb-2">
								{t(feature.title)}
							</h3>
							<p className="font-body text-muted-foreground leading-relaxed">
								{t(feature.description)}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
