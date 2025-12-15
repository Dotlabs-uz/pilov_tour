"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export function CtaSection() {
	const t = useTranslations("CtaSection");

	return (
		<section className="relative py-24 md:py-32 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0">
				<Image
					src="/silk-road-desert.jpg"
					alt="Silk Road desert caravan"
					fill
					style={{ objectFit: "cover" }}
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
			</div>

			{/* Floating elements */}
			<motion.div
				animate={{ y: [0, -20, 0] }}
				transition={{ duration: 4, repeat: Infinity }}
				className="absolute top-20 right-20 w-20 h-20 rounded-full bg-coral/20 blur-2xl"
			/>
			<motion.div
				animate={{ y: [0, 20, 0] }}
				transition={{ duration: 5, repeat: Infinity }}
				className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-gold/20 blur-2xl"
			/>

			{/* Content */}
			<div className="relative container mx-auto px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left - CTA */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<motion.span
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/20 text-coral text-sm font-body font-semibold mb-6"
						>
							<Sparkles size={14} />
							{t("ready_to_go_question")}
						</motion.span>

						<h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
							{t("your_adventure")}
							<br />
							<span className="text-gold">
								{t("starts_here")}
							</span>
						</h2>

						<p className="font-body text-xl text-white/80 mb-8 max-w-lg">
							{t("dream_trip_description")}
						</p>

						<div className="flex flex-wrap gap-4">
							<Button variant="gradient" size="xl" asChild>
								<Link href="/tours">
									{t("browse_trips")}
									<ArrowRight size={20} />
								</Link>
							</Button>
							<Button variant="hero" size="xl" asChild>
								<a href="mailto:hello@pilavtour.uz">
									{t("chat_with_us")}
								</a>
							</Button>
						</div>
					</motion.div>

					{/* Right - Newsletter */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
					>
						<h3 className="font-display text-2xl font-bold text-white mb-2">
							{t("get_travel_inspo")} ✨
						</h3>
						<p className="font-body text-white/70 mb-6">
							{t("newsletter_description")}
						</p>

						<form
							onSubmit={(e) => e.preventDefault()}
							className="space-y-4"
						>
							<Input
								type="email"
								placeholder={t("email_placeholder")}
								className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl text-lg"
							/>
							<Button
								variant="gradient"
								size="lg"
								className="w-full"
								type="submit"
							>
								<Send size={18} />
								{t("subscribe_button")}
							</Button>
						</form>

						<p className="text-white/50 text-xs font-body mt-4 text-center">
							{t("newsletter_join_text")}
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
