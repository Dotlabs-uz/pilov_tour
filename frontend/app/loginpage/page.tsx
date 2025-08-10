"use client";
import { useState, ChangeEvent } from "react";
import { account, ID } from "../appwrite";
import type { Models } from "appwrite";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface FormState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      setLoading(true);
      await account.createEmailPasswordSession(form.email, form.password);
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    try {
      setLoading(true);
      await account.create(ID.unique(), form.email, form.password);
      await login();
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
        <div className="flex flex-col gap-10">
          <Image src={"/logo.png"} width={200} height={50} alt="Logo" />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <p className="text-5xl font-semibold ">Login</p>
              <span className="">Login to access your Golobe account</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <Input
              value={form.email}
              name="email"
              onChange={handleChange}
              className=""
              placeholder="Enter your email"
              type="email"
            />
            <Input
              value={form.password}
              name="password"
              onChange={handleChange}
              className=""
              placeholder="Enter password"
              type="text"
            />
            <div className="flex max-h-[100px] justify-between items-center">
              <div className="flex items-center justify-center gap-2">
                <input type="checkbox" />
                <p className="text-gray-800 font-semibold">Remember Me</p>
              </div>
              <span className="text-red-400 text-xl font-semibold cursor-pointer">
                Forgot Password
              </span>
            </div>
          </div>
          <Button
            onClick={register}
            className="w-[512px] h-[48px] bg-[#8DD3BB] hover:bg-[#8DD3BB] cursor-pointer text-black text-lg text-center font-semibold"
          >
            Login
          </Button>
          <div className="flex justify-center items-center gap-2">
            <span className="">Don't have an account?</span>
            <p className="text-red-400 cursor-pointer hover:text-red-500 hover:font-bold transition-all">
              Sign up
            </p>
          </div>
        </div>
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
      </div>
    </>
  );
}
