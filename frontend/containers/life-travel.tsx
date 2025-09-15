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
        className="relative h-[581px] w-full rounded-2xl bg-cover"
        style={{
          backgroundImage: `url('/bg.png')`,
        }}
      >
        <div className="lg:block hidden">
          <Header />
        </div>
        <div className="flex lg:hidden">

        </div>
        <div className="flex h-[80%] flex-col items-center justify-center gap-2 text-center">
          <span className="text-white font-semibold lg:text-[45px]">
            {t("title1")}
          </span>
          <p className="text-white font-bold text-[80px]">{t("title2")}</p>
          <span className="text-white font-semibold lg:text-[20px]">
            {t("title3")}
          </span>
        </div>

        <div className="lg:block absolute hidden left-1/2 bottom-[-100px] -translate-x-1/2">
          {component}
        </div>

        <div className="flex items-center justify-center lg:hidden">
          <Input
            className="w-[325px] h-[48px] bg-white"
            placeholder="Search for Tours"
          ></Input>
          <Button className="w-[48px] h-[48px] hover:bg-green-800 cursor-pointer bg-[#8DD3BB] rounded-sm ">
            <FaSearch />
          </Button>
        </div>
      </section>
    </>
  );
}
