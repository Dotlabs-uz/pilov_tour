import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function LifeTravel() {
  const t = await getTranslations("LifeTravel");

  return (
    <div className="py-6 mt-10 md:py-10 px-4 lg:px-0">
      <section
        className="
                    relative 
                    h-[450px] md:h-[650px] 
                    max-w-7xl mx-auto 
                    rounded-3xl md:rounded-4xl 
                    overflow-hidden bg-center bg-cover p-4
                "
        style={{
          backgroundImage: "url('/i.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

        <div className="relative z-10 h-full flex flex-col justify-end px-4 md:px-10 lg:px-20 pb-6 md:pb-10">
          <p
            className="
                        text-white font-extrabold 
                        text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                        leading-tight max-w-xs sm:max-w-md md:max-w-2xl 
                        drop-shadow-lg
                    "
          >
            {t("title2")}
          </p>

          <h1
            className="
                        text-white font-normal 
                        text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                        max-w-sm sm:max-w-md md:max-w-xl 
                        mt-3 md:mt-5 drop-shadow-lg
                    "
          >
            {t("title1")}
          </h1>

          <p
            className="
                        text-gray-200 
                        text-sm sm:text-base md:text-lg lg:text-xl 
                        max-w-sm sm:max-w-md md:max-w-lg 
                        mt-4 md:mt-7
                        leading-relaxed drop-shadow
                    "
          >
            {t("title3")}
          </p>

          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-lg px-4 py-2 md:px-6 md:py-3 text-sm md:text-base">
              Explore Journals
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
