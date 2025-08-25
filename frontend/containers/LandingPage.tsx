"use client";

import FilterBlock from "@/components/custom/FilterBlock";
import Header from "@/components/custom/Header";

const LandingPage = () => {
  return (
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
  );
};

export default LandingPage;
