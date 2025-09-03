import FilterBlock from "@/components/custom/FilterBlock";
import Subscribe from "@/components/custom/Subcribe";
import LifeTravel from "@/containers/life-travel";
import RecTrips from "@/containers/RecTrips";
import Reviews from "@/containers/Reviews";

export default function HotelSearch() {
  return (
    <>
      <div className="mx-auto flex max-w-[1450px] mt-2 flex-col pr-2 pl-2">
        <LifeTravel component={<FilterBlock />} />
        <RecTrips />
        <Reviews />
        <Subscribe />
      </div>
    </>
  );
}
