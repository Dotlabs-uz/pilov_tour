"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthSlider from "@/containers/auth-slider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/app/(public)/firebase";
import { doc, setDoc } from "firebase/firestore";
import { loginWithGoogle } from "@/lib/loginWithGoogle";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  phone: string;
  agreeToTerms: boolean;
}

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>();

  const password = watch("password");
  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${data.name} ${data.surname}`,
      });

      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        createdAt: new Date(),
      });

      router.push("/");
    } catch (err: any) {
      setError("root", { message: "Registration failed. Try again." });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center px-4">
      <div className="flex w-full max-w-[1200px] justify-center lg:justify-between gap-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-[560px]">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#112211]">
              Sign up
            </h1>
            <p className="text-[#112211]/70 mt-2">
              Create your account and start your journey
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="First name"
                {...register("name", { required: "Required" })}
              />
              <Input
                placeholder="Last name"
                {...register("surname", { required: "Required" })}
              />
            </div>

            <Input
              placeholder="Email address"
              type="email"
              {...register("email", { required: "Required" })}
            />

            <Input
              placeholder="Phone number"
              type="tel"
              {...register("phone", { required: "Required" })}
            />

            <div className="relative">
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Required",
                  minLength: { value: 8, message: "Min 8 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <Input
                placeholder="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  validate: (v) => v === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("agreeToTerms")} />
              <span className="text-[#112211]/70">
                I agree to the{" "}
                <span className="text-[#0B5D4B] font-medium">Terms</span> and{" "}
                <span className="text-[#0B5D4B] font-medium">
                  Privacy Policy
                </span>
              </span>
            </label>

            {errors.root && (
              <p className="text-red-500 text-sm">{errors.root.message}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !agreeToTerms}
              className="
                h-[48px]
                bg-[#0B5D4B]
                hover:bg-[#094D3F]
                text-white
                text-lg
                font-semibold
              "
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full h-[52px] flex gap-3"
            onClick={async () => {
              await loginWithGoogle();
              router.push("/");
            }}
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-[#0B5D4B] cursor-pointer font-medium hover:underline"
            >
              Login
            </span>
          </p>
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
}
