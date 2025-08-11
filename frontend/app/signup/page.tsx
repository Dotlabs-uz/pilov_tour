"use client";
import { useState, ChangeEvent } from "react";
import { account, ID } from "../appwrite";
import type { Models } from "appwrite";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

interface FormState {
  email: string;
  password: string;
  name: string;
  phone: number;
  surname: string;
  confirmPassword: string;
}

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: 0,
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      setError("");
      // Создаём пользователя
      await account.create(ID.unique(), form.email, form.password, form.name);

      // Сохраняем доп. данные в prefs
      await account.updatePrefs({
        phone: form.phone,
        surname: form.surname,
      });

      // Авторизуем
      await account.createEmailPasswordSession(form.email, form.password);
      setUser(await account.get());

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  if (user) {
    return (
      <div>
        <p>Logged in as {user.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <>
      <div className="flex p-10 pl-20 gap-50 justify-center">
        <Carousel
          className="flex items-center justify-center"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <Image
                src="/preview-login1.png"
                alt="photo"
                width={618}
                height={816}
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src="/preview-login2.png"
                alt="photo"
                width={618}
                height={816}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div className="flex flex-col gap-10">
          <Image src={"/logo.png"} width={200} height={50} alt="Logo" />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <p className="text-5xl font-semibold ">Sign Up</p>
              <span className="text-[#112211] text-lg font-light">
                Let’s get you all st up so you can access your personal account.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center justify-between">
              <div className="flex pr-5 flex-col gap-2">
                <Input
                  value={form.name}
                  name="name"
                  onChange={handleChange}
                  className="w-[308px] h-[56px]"
                  placeholder="Enter your name"
                  type="text"
                />
                <Input
                  value={form.email}
                  name="email"
                  onChange={handleChange}
                  className="w-[308px] h-[56px]"
                  placeholder="Enter email"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  value={form.surname}
                  name="surname"
                  onChange={handleChange}
                  className="w-[308px] h-[56px]"
                  placeholder="Surname"
                  type="text"
                />
                <Input
                  value={form.phone}
                  name="phone"
                  onChange={handleChange}
                  className="w-[308px] h-[56px]"
                  placeholder="Enter your phone number"
                  type="tel"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Input
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  className="w-[640px] h-[56px]"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative">
                <Input
                  value={form.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  className="w-[640px] h-[56px]"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex max-h-[100px] justify-between items-center">
              <div className="flex items-center justify-center gap-2">
                <input type="checkbox" />
                <p className="text-gray-800 flex gap-1 font-semibold">
                  I agree to all the <span className="text-red-400">Terms</span>{" "}
                  and
                  <span className="text-red-400">Privacy Policies</span>
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={register}
            className="w-[512px] h-[48px] bg-[#8DD3BB] hover:bg-[#8DD3BB] cursor-pointer text-black text-lg text-center font-semibold"
          >
            Create account
          </Button>
          <div className="flex justify-center gap-2">
            <span>Already have an account?</span>
            <p
              onClick={() => router.push("/login")}
              className="text-red-400 cursor-pointer"
            >
              Login
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
