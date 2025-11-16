import FilterBlock from "@/components/custom/FilterBlock";
import RecTrips from "@/components/custom/Rectrips";
import { StickyHeader } from "@/components/custom/StickyHeader";
import Subscribe from "@/components/custom/Subcribe";
import LifeTravel from "@/containers/life-travel";
import Reviews from "@/containers/Reviews";

export default function Home() {
  return (
    <div className="mx-auto flex lg:max-w-[1450px] mt-2 flex-col pr-2 pl-2">
      <StickyHeader />
      <LifeTravel component={<FilterBlock />} />
      <RecTrips />  
      <Reviews />
      <Subscribe />
    </div>
  );
}
