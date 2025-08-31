import FilterBlock from "@/components/custom/FilterBlock";
import Header from "@/components/custom/Header";
import Subscribe from "@/components/custom/Subcribe";
import RecTrips from "@/containers/RecTrips";
import Reviews from "@/containers/Reviews";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1450px] mt-2 flex-col pr-2 pl-2">
      <section
        className="relative h-[581px] w-full rounded-2xl bg-cover"
        style={{
          backgroundImage: `url('/bg.png')`,
        }}
      >
        <Header />

        {/* Текст */}
        <div className="flex h-[80%] flex-col items-center justify-center gap-2 text-center">
          <span className="text-white font-semibold text-[45px]">
            Helping Others
          </span>
          <p className="text-white font-bold text-[80px]">Life & Travel</p>
          <span className="text-white font-semibold text-[20px]">
            Special offers to suit your plan
          </span>
        </div>

        {/* Фильтр */}
        <div className="absolute left-1/2 bottom-[-100px] -translate-x-1/2">
          <FilterBlock />
        </div>
      </section>

      <RecTrips />
      <Reviews />
      <Subscribe />
    </div>
  );
}
