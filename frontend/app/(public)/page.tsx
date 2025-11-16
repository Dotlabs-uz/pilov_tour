import FilterBlock from "@/components/custom/FilterBlock";
import HeaderMain from "@/components/custom/HeaderMain";
import HeaderTop from "@/components/custom/HeaderTop";
import RecTrips from "@/components/custom/Rectrips";
import { StickyHeader } from "@/components/custom/StickyHeader";
import Subscribe from "@/components/custom/Subcribe";
import LifeTravel from "@/containers/life-travel";
import Reviews from "@/containers/Reviews";
import { ContactSection } from "@/components/custom/ContactSection";
import UpcomingTours from "@/components/custom/UpcomingTours";
import { ArticlesList } from "@/components/custom/ArticlesList";

export default function Home() {
    return (
        <div className="mx-auto flex mt-2 flex-col">
            <StickyHeader />
            <HeaderTop />
            <HeaderMain />
            <LifeTravel />
            <RecTrips />
            <ContactSection />
            <UpcomingTours />
            <Reviews />
            <ArticlesList />
            <Subscribe />
        </div>
    );
}
