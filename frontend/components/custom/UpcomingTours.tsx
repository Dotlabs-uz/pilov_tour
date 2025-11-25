"use client"

import { useTranslations } from "next-intl"
import { ChevronRight } from "lucide-react"

export default function UpcomingTours() {
    const t = useTranslations("tours")

    const tours = [
        {
            id: 1,
            date: t("tour_1_date"),
            name: t("tour_1_name"),
            destinations: t("tour_1_destinations"),
            departures: t("tour_1_departures"),
            days: t("tour_1_days"),
            price: t("tour_1_price"),
            description: t("tour_1_description"),
            image: "/i.webp",
        },
        {
            id: 2,
            date: t("tour_2_date"),
            name: t("tour_2_name"),
            destinations: t("tour_2_destinations"),
            departures: t("tour_2_departures"),
            days: t("tour_2_days"),
            price: t("tour_2_price"),
            description: t("tour_2_description"),
            image: "/i.webp",
        },
        {
            id: 3,
            date: t("tour_3_date"),
            name: t("tour_3_name"),
            destinations: t("tour_3_destinations"),
            departures: t("tour_3_departures"),
            days: t("tour_3_days"),
            price: t("tour_3_price"),
            description: t("tour_3_description"),
            image: "/i.webp",
        },
    ]

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-block bg-[#8DD3BB] bg-opacity-10 rounded-full px-4 py-2 mb-4">
                        <span className="text-white font-semibold text-sm">{t("badge")}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{t("title")}</h1>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t("description")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tours.map((tour) => (
                        <div
                            key={tour.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="h-40 overflow-hidden bg-gray-100">
                                <img src={tour.image || "/placeholder.svg"} alt={tour.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="p-5">
                                <div className="inline-block bg-[#8DD3BB] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                    {tour.date}
                                </div>

                                <h3 className="text-lg font-bold text-black mb-2">{tour.name}</h3>

                                <p className="text-gray-600 text-sm mb-3">{tour.description}</p>

                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{t("destinations")}</p>
                                    <p className="text-gray-700 text-sm">{tour.destinations}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 font-semibold mb-1">{t("duration")}</p>
                                        <p className="text-lg font-bold text-[#8DD3BB]">{tour.days}</p>
                                        <p className="text-xs text-gray-500">{t("days")}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 font-semibold mb-1">{t("status")}</p>
                                        <p className="text-sm font-bold text-green-600">{t("available")}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 font-semibold mb-1">{t("price")}</p>
                                        <p className="font-bold text-[#8DD3BB]">US${tour.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xs text-gray-600 font-medium">
                                        {tour.departures} {t("departures")}
                                    </span>
                                    <button className="bg-[#8DD3BB] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors">
                                        {t("book_now")}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


