"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaApple, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthSlider from "@/containers/auth-slider";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/app/(public)/firebase";
import { doc, setDoc } from "firebase/firestore";
import { loginWithGoogle } from "@/lib/loginWithGoogle"; 

interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  surname: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      surname: "",  
      phone: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");
  const agreeToTerms = watch("agreeToTerms");
  const onSubmit = async (data: FormData) => {
    try {
      if (!data.agreeToTerms) {
        setError("agreeToTerms", {
          message: "You must agree to the Terms and Privacy Policies",
        });
        return;
      }

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

      setUser(user);

      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError("root", {
        message: err.message || "Registration failed. Please try again.",
      });
    }
  };

  const logout = async () => {
    await auth.signOut();
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
      <AuthSlider
        images={["/preview-login1.png", "/preview-login2.png"]}
        delay={2000}
      />

      <div className="flex flex-col gap-10">
        <Image src={"/logo.png"} width={200} height={50} alt="Logo" />
        <div className="flex flex-col mt-10 gap-5">
          <div className="flex flex-col gap-4">
            <p className="text-5xl font-semibold ">Sign Up</p>
            <span className="text-[#112211] text-lg font-light">
              Let’s get you all set up so you can access your personal account.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex pr-5 flex-col gap-2">
              <Input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-[308px] h-[56px]"
                placeholder="Enter your name"
                type="text"
              />
              {errors.name && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.name.message}
                </p>
              )}

              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-[308px] h-[56px]"
                placeholder="Enter email"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                {...register("surname", {
                  required: "Surname is required",
                  minLength: {
                    value: 2,
                    message: "Surname must be at least 2 characters",
                  },
                })}
                className="w-[308px] h-[56px]"
                placeholder="Surname"
                type="text"
              />
              {errors.surname && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.surname.message}
                </p>
              )}

              <Input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[0-9]{8,15}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                className="w-[308px] h-[56px]"
                placeholder="Enter your phone number"
                type="tel"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-[640px] h-[56px]"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-[640px] h-[56px]"
                placeholder="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm -mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex max-h-[100px] justify-between items-center">
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("agreeToTerms", {
                  required: "You must agree to the Terms and Privacy Policies",
                })}
              />
              <p className="text-gray-800 flex gap-1 font-semibold">
                I agree to all the <span className="text-red-400">Terms</span>{" "}
                and
                <span className="text-red-400">Privacy Policies</span>
              </p>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm -mt-2">
              {errors.agreeToTerms.message}
            </p>
          )}

          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !agreeToTerms}
            className="w-[640px] h-[48px] bg-[#8DD3BB] hover:bg-[#8DD3BB] cursor-pointer text-black text-lg text-center font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="flex justify-center gap-2">
          <span>Already have an account?</span>
          <p
            onClick={() => router.push("/login")}
            className="text-red-400 cursor-pointer hover:text-red-500"
          >
            Login
          </p>
        </div>

        <div className="flex flex-col gap-5 items-center">
          <div className="flex w-full max-w-[640px] items-center gap-2">
            <hr className="bg-gray-500 border-1 w-62 border-gray-300" />
            <p className="flex text-gray-500">Or Sign up with</p>
            <hr className="bg-gray-500 border-1 w-62 border-gray-300" />
          </div>
          <div className="flex max-w-[640px] gap-5 items-center">
            <Button
              onClick={loginWithGoogle}
              className="w-[202px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer"
            >
              <FcGoogle className="w-[24px] h-[24px]" />
            </Button>
            <Button className="w-[202px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer">
              <FaApple className="w-[24px] h-[24px]" color="black" />
            </Button>
            <Button className="w-[202px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer">
              <FaFacebook className="fill-[#1877F2] w-[24px] h-[24px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
