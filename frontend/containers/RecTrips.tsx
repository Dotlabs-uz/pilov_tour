"use client";

import { Button } from "@/components/ui/button";

const recTrip = [
  {
    name: "Istanbul, Turkey",
    img: "/stanbul.png",
    desc: "Flights • Hotels • Resorts",
  },
  {
    name: "Sydney, Australia",
    img: "/sydney.png",
    desc: "Flights • Hotels • Resorts",
  },
  {
    name: "Baku, Azerbaijan",
    img: "/baku.png",
    desc: "Flights • Hotels • Resorts",
  },
  {
    name: "Malé, Maldives",
    img: "/male.png",
    desc: "Flights • Hotels • Resorts",
  },
  {
    name: "Paris, France",
    img: "/paris.png",
    desc: "Flights • Hotels • Resorts",
  },
  {
    name: "New York, US",
    img: "/newyork.png",
    desc: "Flights • Hotels • Resorts",
  },
  {
    name: "London, UK",
    img: "/london.png",
    desc: "Flights • Hotels • Resorts",
  },
  {
    name: "Tokyo, Japan",
    img: "/tokyo.png",
    desc: "Flights • Hotels • Resorts",
  },
  { name: "Dubai, UAE", img: "/dubai.png", desc: "Flights • Hotels • Resorts" },
];

const RecTrips = () => {
  return (
    <div className="flex flex-col mt-50 gap-6">
      {/* Заголовок */}
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Plan your perfect trip</p>
          <span className="text-gray-500 text-sm">
            Search Flights & Places Hire to our most popular destinations
          </span>
        </div>
        <Button className="bg-white text-[#112211] border border-[#8DD3BB]">
          See more places
        </Button>
      </div>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recTrip.map((trip, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-2xl border shadow-md hover:shadow-lg transition"
          >
            <img
              src={trip.img}
              alt={trip.name}
              className="w-[90px] h-[90px] object-cover rounded-xl"
            />
            <div className="flex flex-col">
              <p className="font-medium text-gray-900">{trip.name}</p>
              <span className="text-sm text-gray-500">{trip.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecTrips;
