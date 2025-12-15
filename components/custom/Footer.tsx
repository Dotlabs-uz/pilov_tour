"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("footer");

	const footerLinks = {
		explore: [
			{ name: t("all_trips"), href: "/tours" },
			// { name: t("stories"), href: "/articles" },
			{ name: t("about_us"), href: "/about" },
		],
		support: [
			{ name: t("faq"), href: "/faq" },
			{ name: t("contact"), href: "/contact" },
			{ name: t("terms"), href: "/terms" },
		],
	};

	return (
		<footer className="bg-cream">
			{/* Main Footer */}
			<div className="container mx-auto px-6 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* Brand Column */}
					<div className="lg:col-span-2">
						<Link href="/" className="inline-block mb-6">
							<span className="font-display text-3xl font-bold text-gradient">
								pilavtour
							</span>
						</Link>
						<p className="text-muted-foreground font-body mb-6 max-w-sm leading-relaxed">
							{t("tagline_part1")}
							<br />
							{t("tagline_part2")}
							<span className="text-coral">
								{t("tagline_part3")} 🚀
							</span>
						</p>
						<div className="flex gap-3">
							{[
								{
									icon: Instagram,
									href: "https://instagram.com",
									label: t("instagram_label"),
								},
								{
									icon: Send,
									href: "https://t.me",
									label: t("telegram_label"),
								},
							].map((social) => (
								<motion.a
									key={social.label}
									whileHover={{ scale: 1.1, rotate: 5 }}
									whileTap={{ scale: 0.9 }}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
									aria-label={social.label}
								>
									<social.icon size={20} />
								</motion.a>
							))}
						</div>
					</div>

					{/* Links */}
					<div>
						<h4 className="font-display text-lg font-bold mb-6">
							{t("explore_heading")}
						</h4>
						<ul className="space-y-3">
							{footerLinks.explore.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-muted-foreground hover:text-coral font-body text-sm transition-colors link-playful"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="font-display text-lg font-bold mb-6">
							{t("support_heading")}
						</h4>
						<ul className="space-y-3">
							{footerLinks.support.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-muted-foreground hover:text-coral font-body text-sm transition-colors link-playful"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Contact Bar */}
				<div className="mt-12 pt-8 border-t border-border">
					<div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground font-body">
						<a
							href="mailto:hello@pilavtour.uz"
							className="flex items-center gap-2 hover:text-coral transition-colors"
						>
							<Mail size={16} className="text-coral" />
							hello@pilavtour.uz
						</a>
						<a
							href="tel:+998901234567"
							className="flex items-center gap-2 hover:text-turquoise transition-colors"
						>
							<Phone size={16} className="text-turquoise" />
							+998 90 123 45 67
						</a>
						<span className="flex items-center gap-2">
							<MapPin size={16} className="text-gold" />
							{t("location")}
						</span>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-8 text-center">
					<p className="text-muted-foreground text-sm font-body flex items-center justify-center gap-1">
						{t("made_with")}{" "}
						<Heart size={14} className="text-coral fill-coral" />{" "}
						{t("in_uzbekistan")}
						<span className="mx-2">•</span>©{" "}
						{new Date().getFullYear()} {t("company_name")}
					</p>
				</div>
			</div>
		</footer>
	);
}
