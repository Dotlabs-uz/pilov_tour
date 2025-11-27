// "use client";

// import { Button } from "@/components/ui/button";
// import { useTranslations } from "next-intl";
// import { useCallback } from "react";

// export default function LifeTravel() {
//     const t = useTranslations("LifeTravel");

// const scrollToArticles = useCallback(() => {
//     const el = document.getElementById("articles");
//     if (el) {
//         const y = el.getBoundingClientRect().top + window.pageYOffset - 120;

//         window.scrollTo({
//             top: y,
//             behavior: "smooth",
//         });
//     }
// }, []);

//     return (
//         <div className="py-6 mt-10 md:py-10 px-4 lg:px-0">
//             <section
//                 className="
//           relative 
//           h-[450px] md:h-[650px] 
//           max-w-7xl mx-auto 
//           rounded-3xl md:rounded-4xl 
//           overflow-hidden bg-center bg-cover p-4
//         "
//                 style={{
//                     backgroundImage: "url('/i.webp')",
//                 }}
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

//                 <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 gap-3">
//                     <p
//                         className="
//               text-white font-extrabold 
//               text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
//               leading-tight max-w-xs sm:max-w-md md:max-w-2xl 
//               drop-shadow-lg
//             "
//                     >
//                         {t("title2")}
//                     </p>

//                     <h1
//                         className="
//               text-white font-normal 
//               text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
//               max-w-sm sm:max-w-md md:max-w-xl 
//               drop-shadow-lg
//             "
//                     >
//                         {t("title1")}
//                     </h1>

//                     <p
//                         className="
//               text-gray-200 
//               text-sm sm:text-base md:text-lg lg:text-xl 
//               max-w-sm sm:max-w-md md:max-w-lg 
//               leading-relaxed drop-shadow
//             "
//                     >
//                         {t("title3")}
//                     </p>

//                     <div className="flex justify-end">
//                         <Button
//                             onClick={scrollToArticles}
//                             className="
//                 bg-white text-black hover:bg-gray-200
//                 rounded-lg px-6 py-3 
//                 text-base md:text-lg font-semibold
//                 shadow-md cursor-pointer transition-colors
//               "
//                         >
//                             {t("button")}
//                         </Button>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }
"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useCallback } from "react"

export default function LifeTravel() {
    const t = useTranslations("LifeTravel")

    const scrollToArticles = useCallback(() => {
        const el = document.getElementById("articles");
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 120;

            window.scrollTo({
                top: y,
                behavior: "smooth",
            });
        }
    }, []);

    return (
        <div className="py-6 mt-10 md:py-10 px-4 lg:px-0">
            <section className="relative h-[450px] md:h-[650px] max-w-7xl mx-auto rounded-3xl md:rounded-4xl overflow-hidden bg-center bg-cover p-4"
                style={{
                    backgroundImage: "url('/i.webp')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

                <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-12">
                    <div className="flex flex-col gap-4">

                        <p className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-xs sm:max-w-md md:max-w-2xl drop-shadow-lg"
                        >
                            {t("title2")}
                        </p>

                        <h1 className="text-white font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-sm sm:max-w-md md:max-w-xl drop-shadow-lg"
                        >
                            {t("title1")}
                        </h1>

                        <div className="flex items-center justify-between gap-4">
                            <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-sm sm:max-w-md md:max-w-lg leading-relaxed drop-shadowflex-1"
                            >
                                {t("title3")}
                            </p>

                            <Button onClick={scrollToArticles}
                                className="bg-white text-black hover:bg-[#8DD3BB] hover:text-white rounded-lg px-6 py-3 text-base md:text-lg font-semiboldshadow-md cursor-pointer transition-colorswhitespace-nowrap"
                            >
                                {t("button")}
                            </Button>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
