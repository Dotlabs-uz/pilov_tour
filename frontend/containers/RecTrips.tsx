"use client";

import { appwriteConfig, database } from "@/app/(public)/appwrite";
import Card from "@/components/custom/Card";
import { Button } from "@/components/ui/button";
import { HotelsFlights } from "@/utils/Flights&Hotels";
import { useEffect, useState } from "react";

interface TripDocument {
  name: string;
  imgUrl: string;
  description: string;
}

const RecTrips = () => {
  const [tours, setTours] = useState<TripDocument[]>();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.tourCollectionId
        );
        setTours(response.documents as unknown as TripDocument[]);
      } catch (e) {
        console.error("Something went wrong", e);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="flex max-w-[400px] lg:max-w-[1232px] mx-auto flex-col mt-10 lg:mt-50 gap-6">
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col gap-1">w
          <p className="text-xl font-semibold">Plan your perfect trip</p>
          <span className="text-gray-500 text-sm">
            Search Flights & Places Hire to our most popular destinations
          </span>
        </div>
        <Button className="bg-white cursor-pointer hover:bg-[#8DD3BB] text-[#112211] border border-[#8DD3BB]">
          See more places
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours?.map((trip, i) => (
          <div
            key={i}
            className="flex items-center gap-4 max-w-[450px] p-4 rounded-2xl border shadow-md hover:shadow-lg transition"
          >
            <img
              src={trip.imgUrl}
              alt={trip.name}
              className="w-[90px] h-[90px] object-cover rounded-xl"
            />
            <div className="flex flex-col">
              <p className="font-medium text-gray-900">{trip.name}</p>
              <span className="text-sm text-gray-500">{trip.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row mt-10 items-center gap-20 justify-between">
        {HotelsFlights.map((item, i) => (
          <Card
            key={i}
            name={item.name}
            description={item.description}
            image={item.imageUrl}
            button={item.button}
          />
        ))}
      </div>
    </div>
  );
};

export default RecTrips;
