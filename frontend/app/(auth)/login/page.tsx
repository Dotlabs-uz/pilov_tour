"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AuthSlider from "@/containers/auth-slider";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
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
    } catch (err: any) {
      console.error("Login error:", err);
      setError("root", {
        message: err.message || "Login failed. Please check your credentials.",
      });
    }
  };

  const handleSocialLogin = async (loginFunction: () => Promise<void>) => {
    try {
      setSocialLoading(true);
      await loginFunction();
      router.push("/");
    } catch (err: any) {
      console.error("Social login error:", err);
      setError("root", { message: "Social login failed. Please try again." });
    } finally {
      setSocialLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Logged in as {user.displayName || user.email}</p>
        <Button onClick={logout} className="mt-4">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center mt-10 gap-50 justify-between max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10">
        <Image src={"/logo.png"} width={200} height={50} alt="Logo" />
        <div className="flex flex-col mt-10 gap-5">
          <div className="flex flex-col gap-4">
            <p className="text-5xl font-semibold">Login</p>
            <span className="text-[#112211] text-lg font-light">
              Let’s get you all set up so you can access your account.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm -mt-1">{errors.email.message}</p>
          )}

          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="Enter password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm -mt-1">
              {errors.password.message}
            </p>
          )}

          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          <div className="flex max-h-[100px] justify-between items-center">
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input type="checkbox" {...register("rememberMe")} />
              <p className="text-gray-800 font-semibold">Remember Me</p>
            </label>
            <span
              onClick={() => router.push("/forgot-password")}
              className="text-red-400 text-xl font-semibold cursor-pointer"
            >
              Forgot Password
            </span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-[512px] h-[48px] bg-[#8DD3BB] hover:bg-[#8DD3BB] text-black text-lg font-semibold"
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </Button>
        </form>

        <div className="flex justify-center items-center gap-2">
          <span>Don't have an account?</span>
          <p
            onClick={() => router.push("/signup")}
            className="text-red-400 cursor-pointer hover:text-red-500 hover:font-bold transition-all"
          >
            Sign up
          </p>
        </div>

        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center gap-2">
            <hr className="bg-gray-500 border-1 w-50 border-gray-300" />
            <p className="flex text-gray-500">Or login with</p>
            <hr className="bg-gray-500 border-1 w-50 border-gray-300" />
          </div>
          <div className="flex gap-5 items-center">
            <Button
              onClick={() => handleSocialLogin(loginWithGoogle)}
              disabled={socialLoading}
              className="w-[160px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer disabled:opacity-50"
            >
              <FcGoogle className="w-[24px] h-[24px]" />
            </Button>
            <Button
              disabled
              className="w-[160px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer"
            >
              <FaApple className="w-[24px] h-[24px]" color="black" />
            </Button>
            <Button
              disabled
              className="w-[160px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer"
            >
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
  );
}
