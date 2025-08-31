"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import AuthSlider from "@/containers/auth-slider";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaApple, FaArrowLeft, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Reset = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex p-10 pl-20 gap-50 justify-center">
        <div className="flex flex-col gap-10">
          <Image src={"/logo.png"} width={200} height={50} alt="Logo" />
          <div className="flex flex-col mt-10 gap-5">
            <p
              onClick={() => router.push("/login")}
              className="flex gap-2 cursor-pointer items-center"
            >
              <FaArrowLeft /> Back to login
            </p>
            <div className="flex flex-col gap-4">
              <p className="text-5xl font-semibold">Forgot your password?</p>
              <span className="text-[#112211] text-lg font-light">
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <Input name="email" placeholder="Enter your email" type="email" />
          </div>
          <Button className="w-[512px] h-[48px] bg-[#8DD3BB] hover:bg-[#8DD3BB] text-black text-lg font-semibold">
            Submit
          </Button>
          <div className="flex flex-col gap-5 items-center">
            <div className="flex items-center gap-2">
              <hr className="bg-gray-500 border-1 w-50 border-gray-300" />
              <p className="flex text-gray-500">Or login with</p>
              <hr className="bg-gray-500 border-1 w-50 border-gray-300" />
            </div>
            <div className="flex gap-5 items-center">
              <Button className="w-[160px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer">
                <FcGoogle className="w-[24px] h-[24px]" />
              </Button>
              <Button className="w-[160px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer">
                <FaApple className="w-[24px] h-[24px]" color="black" />
              </Button>
              <Button className="w-[160px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer">
                <FaFacebook className="fill-[#1877F2] w-[24px] h-[24px]" />
              </Button>
            </div>
          </div>
        </div>
        <AuthSlider
          images={["/preview-login1.png", "/preview-login2.png"]}
          delay={2000}
        />
      </div>
    </>
  );
};

export default Reset;
