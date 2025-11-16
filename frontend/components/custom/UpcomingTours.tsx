import { ChevronRight, Sparkles, TrendingUp } from 'lucide-react';

export default function UpcomingTours() {
    const tours = [
        {
            date: "14 Nov",
            month: "Nov",
            name: "Classic Uzbekistan Group Tour",
            destinations: "Tashkent, Khiva, Bukhara, Samarkand",
            departures: "43",
            status: "Available",
            days: 8,
            price: "1,390",
            description: "Explore the iconic Silk Road cities and immerse yourself in Central Asian culture",
            image: "i.webp",
        },
        {
            date: "16 Mar",
            month: "Mar",
            name: "Silk Road Group Tour",
            destinations: "Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, Turkmenistan, Azerbaijan, Georgia, Armenia",
            departures: "29",
            status: "Available",
            days: 29,
            price: "8,160",
            description: "The ultimate Central Asia adventure covering 8 countries and countless wonders",
            image: "i.webp",
        },
        {
            date: "16 Mar",
            month: "Mar",
            name: "Central Asia Group Tour",
            destinations: "Kazakhstan, Kyrgyzstan, Turkmenistan, Tajikistan, Uzbekistan",
            departures: "35",
            status: "Available",
            days: 14,
            price: "4,380",
            description: "Discover the hidden gems and breathtaking landscapes of Central Asia",
            image: "i.webp",
        },
        {
            date: "16 Mar",
            month: "Mar",
            name: "Central Asia Group Tour",
            destinations: "Kazakhstan, Kyrgyzstan, Turkmenistan, Tajikistan, Uzbekistan",
            departures: "35",
            status: "Available",
            days: 14,
            price: "4,380",
            description: "Discover the hidden gems and breathtaking landscapes of Central Asia",
            image: "i.webp",
        }
    ];

    return (
        <div className="min-h-screen">
            <section className="relative overflow-hidden py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Sparkles className="w-8 h-8 text-amber-400 flex-shrink-0" />
                        <span className="text-amber-400 font-semibold text-lg">Premium Group Tours</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
                        Unforgettable Adventures in 2025
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Choose from our carefully curated selection of group tours across Central Asia. Each journey is designed to immerse you in breathtaking landscapes, rich cultures, and unforgettable experiences.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {tours.map((tour, idx) => (
                        <div
                            key={idx}
                            className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-slate-200"
                        >
                            <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                                <img
                                    src={tour.image || "/placeholder.svg"}
                                    alt={tour.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="relative z-10 p-6">
                                <div className="inline-flex items-center gap-2 mb-4 bg-amber-500 px-3 py-1 rounded-full">
                                    <span className="text-white font-bold text-sm">{tour.date}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{tour.name}</h3>

                                <p className="text-slate-700 text-sm mb-4 leading-relaxed">{tour.description}</p>

                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                                        Destinations
                                    </p>
                                    <p className="text-slate-700 text-sm">{tour.destinations}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-slate-100 rounded-lg p-3 text-center">
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Duration</p>
                                        <p className="text-2xl font-bold text-amber-600">{tour.days}</p>
                                        <p className="text-xs text-slate-600">days</p>
                                    </div>
                                    <div className="bg-slate-100 rounded-lg p-3 text-center">
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Status</p>
                                        <p className="text-sm font-bold text-emerald-600">{tour.status}</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
                                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Price</p>
                                        <p className="text-xl font-bold text-amber-600">US${tour.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold">
                                        <TrendingUp className="w-4 h-4" />
                                        {tour.departures} more departures
                                    </div>
                                    <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2">
                                        Book Now
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

