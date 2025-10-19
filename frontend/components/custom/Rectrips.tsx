"use client";
import { appwriteConfig, database } from "@/app/(public)/appwrite";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface TripDocument {
	id: string;
	titles: string[];
	images: string[];
	descriptions: string[];
}

const RecTrips = () => {
	const [trips, setTrips] = useState<TripDocument[]>();
	useEffect(() => {
		const fetchTrips = async () => {
			try {
				const response = await database.listDocuments(
					appwriteConfig.databaseId,
					appwriteConfig.tourCollectionId
					
				);
				setTrips(response.documents as unknown as TripDocument[]);
			} catch (e) {
				console.error("Something went wrong", e);
			}
		};
		fetchTrips();
	}, []);

	return (
		<>
			<section className="flex max-w-[1200px] mx-auto w-full flex-col mt-10 lg:mt-50 gap-6">
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-1">
						<p className="text-xl font-semibold">
							Plan your perfect trip
						</p>
						<span className="text-gray-500 text-sm">
							Search Flights & Places Hire to our most popular
							destinations
						</span>
					</div>
					<Button className="bg-white cursor-pointer hover:bg-[#8DD3BB] text-[#112211] border border-[#8DD3BB]">
						See more places
					</Button>
				</div>
				<div className="w-full ">
					<Carousel opts={{ align: "start" }}>
						<CarouselContent>
							{trips?.map((trip, i) => (
								<CarouselItem
									key={i}
									className="basis-full sm:basis-1/2 lg:basis-1/3"
								>
									<div className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition flex flex-col bg-white">
										{trip.images?.[0] && (
											<img
												src={trip.images[0]}
												alt={
													trip.titles?.[0] ??
													"Trip image"
												}
												className="h-48 w-full object-cover"
											/>
										)}
										<div className="p-4 flex flex-col gap-2">
											<h3 className="text-lg font-semibold text-[#112211]">
												{trip.titles?.[0] ??
													"Untitled Trip"}
											</h3>
											<p className="text-sm text-gray-600 line-clamp-3">
												{trip.descriptions?.[0] ??
													"No description available."}
											</p>
											<Button className="mt-2 bg-[#8DD3BB] text-[#112211] hover:bg-[#7bc9aa]">
												Explore
											</Button>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>

						<CarouselPrevious className="hidden md:flex" />
						<CarouselNext className="hidden md:flex" />
					</Carousel>
				</div>
			</section>
		</>
	);
};

export default RecTrips;
