"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const isHomePage = pathname === "/";
	const t = useTranslations("Navbar");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ name: t("explore"), href: "/trips" },
		{ name: t("stories"), href: "/articles" },
		{ name: t("about"), href: "/about" },
	];

	const navBackground =
		isScrolled || !isHomePage
			? "bg-white/90 backdrop-blur-xl shadow-soft"
			: "bg-transparent";

	const textColor =
		isScrolled || !isHomePage ? "text-foreground" : "text-white";

	const logoColor =
		isScrolled || !isHomePage ? "text-gradient" : "text-white";

	return (
		<>
			<motion.header
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-500",
					navBackground
				)}
			>
				<nav className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<Link
							href="/"
							className="flex items-center gap-2 group"
						>
							<motion.div
								whileHover={{ scale: 1.05, rotate: -2 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									"font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
									logoColor
								)}
							>
								pilavtour
							</motion.div>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center gap-1">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className={cn(
										"relative px-5 py-2 font-body text-sm font-medium rounded-full transition-all duration-300",
										textColor,
										pathname === link.href
											? "bg-white/20"
											: "hover:bg-white/10"
									)}
								>
									{link.name}
									{pathname === link.href && (
										<motion.div
											layoutId="navIndicator"
											className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
										/>
									)}
								</Link>
							))}
						</div>

						{/* Desktop CTA */}
						<div className="hidden lg:flex items-center gap-3">
							<Button
								variant={
									isScrolled || !isHomePage
										? "gradient"
										: "hero"
								}
								size="default"
								asChild
							>
								<Link
									href="/trips"
									className="flex items-center gap-2"
								>
									<Sparkles size={16} />
									{t("start_adventure")}
								</Link>
							</Button>
						</div>

						{/* Mobile Menu Button */}
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							className={cn(
								"lg:hidden p-2 rounded-full transition-colors",
								textColor,
								"hover:bg-white/10"
							)}
							aria-label={t("toggle_menu")}
						>
							{isMobileMenuOpen ? (
								<X size={24} />
							) : (
								<Menu size={24} />
							)}
						</motion.button>
					</div>
				</nav>
			</motion.header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-40 lg:hidden"
					>
						<div
							className="absolute inset-0 bg-navy/60 backdrop-blur-md"
							onClick={() => setIsMobileMenuOpen(false)}
						/>
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{
								duration: 0.4,
								ease: [0.4, 0, 0.2, 1],
							}}
							className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white rounded-l-3xl shadow-strong overflow-hidden"
						>
							<div className="p-8 pt-24 h-full flex flex-col">
								<div className="flex flex-col gap-2">
									{navLinks.map((link, index) => (
										<motion.div
											key={link.name}
											initial={{ opacity: 0, x: 30 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: index * 0.1 + 0.1,
											}}
										>
											<Link
												href={link.href}
												onClick={() =>
													setIsMobileMenuOpen(false)
												}
												className={cn(
													"block py-4 px-4 font-display text-2xl font-bold rounded-2xl transition-all",
													pathname === link.href
														? "bg-primary/10 text-primary"
														: "text-foreground hover:bg-secondary"
												)}
											>
												{link.name}
											</Link>
										</motion.div>
									))}
								</div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className="mt-auto pb-8"
								>
									<Button
										variant="gradient"
										size="xl"
										className="w-full"
										asChild
									>
										<Link
											href="/trips"
											onClick={() =>
												setIsMobileMenuOpen(false)
											}
										>
											<Sparkles size={20} />
											{t("start_adventure")}
										</Link>
									</Button>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
