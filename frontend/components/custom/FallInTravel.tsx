import TravelCard from "./TravelCard";

const FallInTravel = () => {
    return (
      <>
        <div className="flex max-w-[1232px] mx-auto mt-50 flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-semibold">Fall into travel</p>
              <span className="text-lg max-w-[800px] font-light">
                Going somewhere to celebrate this season? Whether you’re going
                home or somewhere to roam, we’ve got the travel tools to get you
                to your destination.
              </span>
            </div>
            <button className="px-6 cursor-pointer py-2 border border-[#8DD3BB] rounded-lg text-[#112211] hover:bg-[#8DD3BB] transition-colors">
              See All
            </button>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <TravelCard />
            <TravelCard />
            <TravelCard />
            <TravelCard />
          </div>
        </div>
      </>
    );
}
 
export default FallInTravel;        