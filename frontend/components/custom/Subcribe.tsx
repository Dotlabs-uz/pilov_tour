import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Subscribe: React.FC = () => {
  return (
    <section className="bg-[#CDEAE1] w-[300px] lg:max-w-[1232px] lg:w-full mt-20 mx-auto py-12 px-6 rounded-xl relative -mb-20 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 text-left">
          <div className="flex flex-col max-w-[250px]">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-semibold mb-4">
              Subscribe Newsletter
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              The Travel
            </h3>
          </div>
          <p className="text-gray-700 mb-6">
            Get inspired! Receive travel discounts, tips and behind the scenes
            stories.
          </p>

          <div className="flex flex-col gap-6 lg:flex-row items-center lg:gap-3 max-w-md">
            <Input
              type="email"
              placeholder="Your email address"
              className="lg:w-[473px] w-[200px] lg:h-[56px] h-[35px] bg-white "
            />
            <Button
              type="button"
              className="w-[104px] cursor-pointer hover:bg-[#8DD3BB] hover:border-white hover:border-1 hover:text-black transition-all h-[56px] rounded-md "
            >
              Subscribe
            </Button>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Image
            width={400}
            height={305}
            src="/mail.png"
            alt="Mailbox illustration"
            className="w-60 md:w-72"
          />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
