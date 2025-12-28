"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthSlider from "@/containers/auth-slider";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Reset = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4">
      <div className="flex w-full max-w-[1200px] justify-center lg:justify-between gap-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-[520px]">
          <div className="flex flex-col gap-6 mb-8">
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 text-sm text-[#0B5D4B] hover:underline w-fit"
            >
              <FaArrowLeft size={14} />
              Back to login
            </button>

            <div className="flex flex-col gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#112211]">
                Forgot your password?
              </h1>
              <p className="text-[#112211]/70 text-sm sm:text-base">
                Don’t worry, it happens. Enter your email and we’ll help you
                reset your password.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              name="email"
              placeholder="Email address"
              type="email"
              className="h-[48px] rounded-lg"
            />

            <Button
              className="
                h-[48px]
                bg-[#0B5D4B]
                hover:bg-[#094D3F]
                text-white
                text-lg
                font-semibold
              "
            >
              Send reset link
            </Button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full h-[52px] flex items-center justify-center gap-3"
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>
        </div>

        <div className="hidden lg:block w-[520px]">
          <AuthSlider
            images={["/preview-login1.png", "/preview-login2.png"]}
            delay={2500}
          />
        </div>
      </div>
    </div>
  );
};

export default Reset;
