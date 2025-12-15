import { HeroSection } from "@/components/custom/HeroSection";
import { FeaturedTours } from "@/components/custom/FeaturedTours";
import { WhyPilavtour } from "@/components/custom/WhyPilavtour";
import { CulturalHighlights } from "@/components/custom/CulturalHighlights";
import { Testimonials } from "@/components/custom/Testimonials";
import { CtaSection } from "@/components/custom/CtaSection";
import RecTrips from "@/components/custom/Rectrips";

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<FeaturedTours />
			<WhyPilavtour />
			<CulturalHighlights />
			<Testimonials />
			<CtaSection />
		</main>
	);
}
