"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import AuthSlider from "@/containers/auth-slider";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/(public)/firebase";
import { loginWithGoogle } from "@/lib/loginWithGoogle";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [socialLoading, setSocialLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("rememberMe", true);
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (data.rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/");
    } catch {
      setError("root", { message: "Invalid email or password" });
    }
  };

  const handleSocialLogin = async (loginFunction: () => Promise<void>) => {
    try {
      setSocialLoading(true);
      await loginFunction();
      router.push("/");
    } catch {
      setError("root", { message: "Google login failed. Try again." });
    } finally {
      setSocialLoading(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4">
      <div className="flex w-full max-w-[1200px] items-center justify-center gap-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-[520px]">
          <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#112211]">
              Login
            </h1>
            <p className="text-[#112211]/70 text-sm sm:text-base">
              Let’s get you all set up so you can access your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <Input
              {...register("email", { required: "Email is required" })}
              placeholder="Email address"
              type="email"
              className="h-[48px] rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <Input
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              type="password"
              className="h-[48px] rounded-lg"
            />

            {errors.root && (
              <p className="text-red-500 text-sm">{errors.root.message}</p>
            )}

            <div className="flex justify-between items-center text-sm mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("rememberMe")} />
                <span className="text-[#112211]/70">Remember me</span>
              </label>

              <span
                onClick={() => router.push("/forgot-password")}
                className="text-[#0B5D4B] hover:underline cursor-pointer"
              >
                Forgot password?
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                mt-4 h-[48px] rounded-lg
                bg-[#0B5D4B]
                hover:bg-[#094D3F]
                text-white
                text-lg font-semibold
                transition-all
              "
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <Button
            onClick={() => handleSocialLogin(loginWithGoogle)}
            disabled={socialLoading}
            variant="outline"
            className="w-full h-[52px] rounded-lg flex items-center justify-center gap-3"
          >
            <FcGoogle size={22} />
            <span className="font-medium text-[#112211]">
              Continue with Google
            </span>
          </Button>

          <div className="text-center mt-6 text-sm">
            <span className="text-[#112211]/70">Don’t have an account?</span>{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-[#0B5D4B] cursor-pointer hover:underline font-medium"
            >
              Sign up
            </span>
          </div>
        </div>

        {/* <div className="hidden lg:block w-[520px]">
          <AuthSlider
            images={["/preview-login1.png", "/preview-login2.png"]}
            delay={2500}
          />
        </div> */}
      </div>
    </div>
  );
}
