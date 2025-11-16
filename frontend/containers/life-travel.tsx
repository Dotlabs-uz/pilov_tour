// import Header from "@/components/custom/Header";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { getTranslations } from "next-intl/server";
// import { FaSearch } from "react-icons/fa";

// export default async function LifeTravel({ component }: { component: any }) {
//     const t = await getTranslations("LifeTravel");

//     return (
//         <>
//             <section
//                 className="relative h-[581px] w-full rounded-2xl bg-cover mt-8"
//                 style={{
//                     backgroundImage: `url('/i.webp')`,
//                 }}
//             >
//                 <div className="lg:block hidden">
//                     <Header />
//                 </div>
//                 <div className="flex lg:hidden">

//                 </div>
//                 <div className="flex h-[80%] flex-col items-center justify-center gap-2 text-center">
//                     <span className="text-white font-semibold lg:text-[45px]">
//                         {t("title1")}
//                     </span>
//                     <p className="text-white font-bold text-[80px]">{t("title2")}</p>
//                     <span className="text-white font-semibold lg:text-[20px]">
//                         {t("title3")}
//                     </span>
//                 </div>

//                 <div className="lg:block absolute hidden left-1/2 bottom-[-100px] -translate-x-1/2">
//                     {component}
//                 </div>

//                 <div className="flex items-center justify-center lg:hidden">
//                     <Input
//                         className="w-[325px] h-[48px] bg-white"
//                         placeholder="Search for Tours"
//                     ></Input>
//                     <Button className="w-[48px] h-[48px] hover:bg-green-800 cursor-pointer bg-[#8DD3BB] rounded-sm ">
//                         <FaSearch />
//                     </Button>
//                 </div>
//             </section>
//         </>
//     );
// }

import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTranslations } from "next-intl/server";
import { FaSearch } from "react-icons/fa";

export default async function LifeTravel({ component }: { component: any }) {
    const t = await getTranslations("LifeTravel");

    return (
        <>
            <section
                className="relative h-[581px] mx-auto rounded-2xl overflow-hidden bg-center bg-cover"
                style={{
                    backgroundImage: "url('/i.webp')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>

                <div className="relative z-10 h-full flex flex-col justify-center px-10 lg:px-20">
                    <h1 className="text-white font-semibold text-4xl lg:text-5xl max-w-xl">
                        {t("title1")}
                    </h1>

                    <p className="text-white font-bold text-5xl lg:text-7xl leading-tight max-w-2xl mt-2">
                        {t("title2")}
                    </p>

                    <p className="text-white font-medium text-lg lg:text-xl max-w-lg mt-4">
                        {t("title3")}
                    </p>


                    <div className="absolute bottom-6 right-6">
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-lg px-6 py-3">
                            Explore Journals
                        </Button>
                    </div>
                </div>
            </section>

        </>
    );
}