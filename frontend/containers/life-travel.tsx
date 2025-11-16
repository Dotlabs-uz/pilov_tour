import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function LifeTravel() {
    const t = await getTranslations("LifeTravel");

    return (
        <div className="py-10">
            <section
                className="relative h-[650px] max-w-7xl mx-auto rounded-4xl overflow-hidden bg-center bg-cover p-4"
                style={{
                    backgroundImage: "url('/i.webp')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

                <div className="relative z-10 h-full flex flex-col justify-end px-10 lg:px-20">
                    <p className="text-white font-extrabold text-5xl lg:text-6xl leading-tight max-w-2xl drop-shadow-lg">
                        {t("title2")}
                    </p>

                    <h1 className="text-white font-normal text-4xl lg:text-5xl max-w-xl mt-5 drop-shadow-lg">
                        {t("title1")}
                    </h1>

                    <p className="text-gray-200 text-lg lg:text-xl max-w-lg mt-7 leading-relaxed drop-shadow">
                        {t("title3")}
                    </p>

                    <div className="absolute bottom-6 right-6">
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-lg px-6 py-3">
                            Explore Journals
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}