import RecTrips from "@/components/custom/Rectrips";
import { StickyHeader } from "@/components/custom/StickyHeader";
import Subscribe from "@/components/custom/Subcribe";
import LifeTravel from "@/containers/life-travel";
// import Reviews from "@/containers/Reviews";
import { ContactSection } from "@/components/custom/ContactSection";
import UpcomingTours from "@/components/custom/ToursCategories";
import { ArticlesList } from "@/components/custom/ArticlesList";
import { AboutSection } from "@/components/custom/AboutSection";

export default function Home() {
  return (
    <div className="mx-auto flex mt-2 flex-col">
      <StickyHeader />
      {/* <HeaderTop /> */}
      {/* <HeaderMain /> */}
      <LifeTravel />
      <RecTrips />
      <AboutSection />
      <ContactSection />
      <UpcomingTours />
      {/* <Reviews /> */}
      <ArticlesList />
      <Subscribe />
    </div>
  );
}
