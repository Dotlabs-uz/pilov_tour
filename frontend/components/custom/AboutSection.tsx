"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

export function AboutSection() {
    const t = useTranslations("about")

    return (
        <div id="about" className="w-full bg-white overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8 py-10 lg:py-20 max-w-7xl mx-auto text-center">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-black leading-none mb-8 text-center">
                    {(() => {
                        const words = t("title").split(" ");
                        const lastWord = words.pop(); 
                        return (
                            <>
                                {words.join(" ")}{" "}
                                <span className="bg-gradient-to-r from-[#8DD3BB] to-[#8DD3BB] bg-clip-text text-transparent">
                                    {lastWord}
                                </span>
                            </>
                        )
                    })()}
                </h1>

                <p className="text-3xl text-black font-light max-w-2xl mx-auto">Pilav Tour</p>
            </div>

            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                        <h3 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-tight text-center lg:text-left">
                            {t("section1.title")}
                        </h3>
                        <p className="text-lg text-black/70 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                            {t("section1.description")}
                        </p>
                        <div className="flex justify-center lg:justify-start gap-4 pt-4">
                            <div className="w-2 h-2 bg-[#8DD3BB] rounded-full"></div>
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <div className="w-2 h-2 bg-[#8DD3BB] rounded-full"></div>
                        </div>
                    </div>

                    <div className="relative h-96 lg:h-full">
                        <div className="absolute inset-0 bg-[#8DD3BB] rounded-3xl transform rotate-6"></div>
                        <div className="relative bg-white rounded-3xl p-2 h-full transform -rotate-2 shadow-2xl">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image src="/uzb.jpeg" alt={t("section1.title")} fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
                <div className="h-px bg-black/10"></div>
            </div>

            <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-1 relative h-96 lg:h-full order-2 lg:order-1">
                        <div className="absolute inset-0 bg-[#8DD3BB] rounded-3xl transform -rotate-6"></div>
                        <div className="relative bg-white rounded-3xl p-2 h-full transform rotate-2 shadow-2xl">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image src="/registan.jpg" alt={t("section2.title")} fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6 flex flex-col justify-center order-1 lg:order-2">
                        <h3 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-tight text-center lg:text-left">
                            {t("section2.title")}
                        </h3>
                        <p className="text-lg text-black/70 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                            {t("section2.description")}
                        </p>
                        <div className="flex justify-center lg:justify-start gap-4 pt-4">
                            <div className="w-2 h-2 bg-[#8DD3BB] rounded-full"></div>
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <div className="w-2 h-2 bg-[#8DD3BB] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="h-1 bg-[#8DD3BB] w-full"></div>
        </div>
    )
}
