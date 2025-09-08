import Header from "@/components/custom/Header";
import { getTranslations } from "next-intl/server";

export default async function LifeTravel({ component }: { component: any }) {
  
  const t = await getTranslations("LifeTravel");

  return (
    <>
      <section
        className="relative h-[581px] w-full rounded-2xl bg-cover"
        style={{
          backgroundImage: `url('/bg.png')`,
        }}
      >
        <Header />

        <div className="flex h-[80%] flex-col items-center justify-center gap-2 text-center">
          <span className="text-white font-semibold text-[45px]">
            {t("title1")}
          </span>
          <p className="text-white font-bold text-[80px]">{t("title2")}</p>
          <span className="text-white font-semibold text-[20px]">
            {t("title3")}
          </span>
        </div>

        <div className="absolute left-1/2 bottom-[-100px] -translate-x-1/2">
          {component}
        </div>
      </section>
    </>
  );
}
