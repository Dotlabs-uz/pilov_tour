import ChooseTour from "@/components/custom/Choose-Tour";
import FallInTravel from "@/components/custom/FallInTravel";
import RecentSearch from "@/components/custom/RecentSearch";
import Subscribe from "@/components/custom/Subcribe";
import { Button } from "@/components/ui/button";
import LifeTravel from "@/containers/life-travel";

export default function HotelSearch() {
  return (
    <>
      <div className="mx-auto flex max-w-[1450px] mt-2 flex-col pr-2 pl-2">
        <LifeTravel component={<ChooseTour />} />
        <RecentSearch />
        <FallInTravel />
        <div className="flex w-full mt-20 max-w-[1232px] mx-auto flex-col gap-5 px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">Fall into travel</p>
              <span className="max-w-[851px] text-lg font-light">
                Going somewhere to celebrate this season? Whether you’re going
                home or somewhere to roam, we’ve got the travel tools to get you
                to your destination.
              </span>
            </div>
            <button className="px-6 cursor-pointer py-2 border border-[#8DD3BB] rounded-lg text-[#112211] hover:bg-[#8DD3BB] transition-colors">
              See All
            </button>
          </div>
          <div className="flex gap-10 items-center">
            <div className="flex bg-[#8DD3BB] w-[552px] h-[424px] rounded-xl p-4 gap-10">
              <div className="flex flex-col justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <p className="text-3xl font-semibold max-w-[263px]">Backpacking Sri Lanka</p>
                    <div className="w-[68px] h-[62px] bg-white rounded-sm text-center flex flex-col justify-center mb-10 ">
                      <p>From</p>
                      <span>$700</span>
                    </div>
                  </div>
                  <div>
                    <p>
                      Traveling is a unique experience as it's the best way to
                      unplug from the pushes and pulls of daily life. It helps
                      us to forget about our problems, frustrations, and fears
                      at home. During our journey, we experience life in
                      different ways. We explore new places, cultures, cuisines,
                      traditions, and ways of living.
                    </p>
                  </div>
                </div>
                <Button className="w-[504px] text-black hover:text-white h-[48px] bg-white cursor-pointer ">
                  Book Flight
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div
                style={{
                  backgroundImage: "url('/first.jpg')",
                }}
                className="w-[318px] h-[200px] rounded-lg bg-center bg-cover border-[2px] border-[#8DD3BB]"
              />
              <div
                style={{
                  backgroundImage: "url('/second.jpg')",
                }}
                className="w-[318px] h-[200px] rounded-lg bg-center bg-cover border-[2px] border-[#8DD3BB]"
              />
              <div
                style={{
                  backgroundImage: "url('/third.jpg')",
                }}
                className="w-[318px] h-[200px] rounded-lg bg-center bg-cover border-[2px] border-[#8DD3BB]"
              />
              <div
                style={{
                  backgroundImage: "url('/fourth.jpg')",
                }}
                className="w-[318px] h-[200px] rounded-lg bg-center bg-cover border-[2px] border-[#8DD3BB]"
              />
            </div>
          </div>
        </div>
        <Subscribe />
      </div>
    </>
  );
}
