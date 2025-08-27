"use client";
import { useState, ChangeEvent } from "react";
import { account, appwriteConfig, database } from "../appwrite";
import { ID, OAuthProvider, Query, type Models } from "appwrite";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

interface FormState {
  email: string;
  password: string;
}

export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/404`
    );

    const currentUser = await account.get();

    const existing = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("email", currentUser.email),
      ]
    );

    if (existing.documents.length === 0) {
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          userId: currentUser.$id,
          email: currentUser.email,
          name: currentUser.name || "",
        }
      );
    }
  } catch (e) {
    console.error("OAuth login error:", e);
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      setLoading(true);
      setError("");

      await account.createEmailPasswordSession(form.email, form.password);

      const currentUser = await account.get();
      setUser(currentUser);

      router.push("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
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
    <div className="flex p-10 pl-20 gap-50 justify-center">
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
        <div className="flex flex-col gap-2 ">
          <Input
            value={form.email}
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            type="email"
          />
          <Input
            value={form.password}
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
            type="password"
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex max-h-[100px] justify-between items-center">
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" />
              <p className="text-gray-800 font-semibold">Remember Me</p>
            </div>
            <span
              onClick={() => router.push("/forgot-password")}
              className="text-red-400 text-xl font-semibold cursor-pointer"
            >
              Forgot Password
            </span>
          </div>
        </div>
        <Button
          onClick={login}
          className="w-[512px] h-[48px] bg-[#8DD3BB] hover:bg-[#8DD3BB] text-black text-lg font-semibold"
        >
          {loading ? "Logging In..." : "Login"}
        </Button>
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
              onClick={loginWithGoogle}
              className="w-[160px] h-[56px] rounded-[4px] border-[1px] items-center flex border-[#8DD3BB] bg-white hover:bg-gray-200 transition-all cursor-pointer"
            >
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
  );
}
