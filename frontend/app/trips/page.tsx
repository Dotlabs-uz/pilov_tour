"use client";

import Filter from "@/components/custom/Filter";
import HeaderforOther from "@/components/custom/Header-otherPages";
import TourFilter from "@/components/custom/TourFilter";

const Tours = () => {
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen">
      <HeaderforOther />

      <section className="flex justify-center mt-8">
        <TourFilter />
      </section>

      <main className="flex justify-between max-w-7xl mx-auto w-full px-4 mt-12">
        <aside className="w-1/4">
          <Filter />
        </aside>

        <section className="flex flex-col gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl w-[540px] shadow-md p-4 h-60 flex items-center justify-center text-gray-500"
            >
              Tour Card {i + 1}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Tours;
