import FilterBlock from "@/components/custom/FilterBlock";
import HeaderMain from "@/components/custom/HeaderMain";
import HeaderTop from "@/components/custom/HeaderTop";
import RecTrips from "@/components/custom/Rectrips";
import { StickyHeader } from "@/components/custom/StickyHeader";
import Subscribe from "@/components/custom/Subcribe";
import LifeTravel from "@/containers/life-travel";
import Reviews from "@/containers/Reviews";

export default function Home() {
    return (
        <div className="mx-auto flex mt-2 flex-col">
            <StickyHeader />
            <HeaderTop />
            <HeaderMain />
            <LifeTravel component={<FilterBlock />} />
            <RecTrips />
            <Reviews />
            <Subscribe />
        </div>
    );
}
