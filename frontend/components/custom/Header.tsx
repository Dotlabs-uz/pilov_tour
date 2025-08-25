"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { CiPlane } from "react-icons/ci";
import { IoBed } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <header className="flex justify-between items-center px-4 lg:px-8 py-2 text-white">
        <div className="hidden lg:flex items-center gap-4">
          <p className="flex items-center cursor-pointer gap-2">
            <CiPlane size={24} /> Find Flight
          </p>
          <p className="flex cursor-pointer items-center gap-2">
            <IoBed size={24} /> Find Stays
          </p>
        </div>

        <Image width={110} height={36} src="/logo-header.png" alt="Logo" />

        {}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login">Login</Link>
          <Button
            onClick={() => router.push("/signup")}
            className="w-[104px] h-[48px] hover:bg-gray-400 bg-white text-black rounded-lg cursor-pointer"
          >
            Sign up
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
