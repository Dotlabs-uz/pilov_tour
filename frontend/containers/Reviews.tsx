"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface ReviewDocument {
    title: string;
    text: string;
    author: string;
    place: string;
    source: string;
    image: string;
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<ReviewDocument[]>();

    // useEffect(() => {
    //     const fetchReviews = async () => {
    //         try {
    //             const response = await database.listDocuments(
    //                 appwriteConfig.databaseId,
    //                 appwriteConfig.reviewCollectionId
    //             );
    //             setReviews(response.documents as unknown as ReviewDocument[]);
    //         } catch (e) {
    //             console.log("Something went wrong", e);
    //         }
    //     };
    //     fetchReviews()
    // }, []);



    return (
        <section className="container mx-auto flex flex-col gap-10 px-4 mt-20">
            <div className="flex items-center w-full justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-3xl font-bold">Reviews</p>
                    <p className="text-gray-600">
                        What people says about Golobe facilities
                    </p>
                </div>
                <button className="px-6 py-2 border border-[#8DD3BB] cursor-pointer rounded-lg text-[#112211] hover:bg-[#8DD3BB] transition-colors">
                    See All
                </button>
            </div>

            <Carousel opts={{ align: "start" }}>
                <CarouselContent>
                    {reviews?.map((review, i) => (
                        <CarouselItem
                            key={i}
                            className="basis-full sm:basis-1/2 lg:basis-1/3"
                        >
                            <Card className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 flex flex-col gap-4">
                                    <h3 className="font-semibold text-lg leading-snug">
                                        “{review.title}”
                                    </h3>
                                    <p className="text-gray-600 text-sm">{review.text}</p>

                                    <p className="text-[#8DD3BB] font-medium text-sm cursor-pointer">
                                        View more
                                    </p>

                                    <div className="flex gap-1 text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400" />
                                        ))}
                                    </div>

                                    <div>
                                        <p className="font-semibold">{review.author}</p>
                                        <p className="text-gray-500 text-sm">{review.place}</p>
                                        <p className="text-gray-500 text-sm">{review.source}</p>
                                    </div>

                                    <div className="mt-4">
                                        <Image
                                            src={review.image}
                                            alt={review.title}
                                            width={400}
                                            height={220}
                                            className="rounded-xl object-cover"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </section>
    );
};

export default Reviews;
