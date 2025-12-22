"use client";

import { FaFlag } from "react-icons/fa";
import { Avatar, AvatarImage } from "../ui/avatar";

const Review = () => {
  return (
    <>
      <div className="flex items-center gap-5 border-b-1 border-black pb-5 justify-between">
        {/* avatar */}
        <Avatar className="bg-gray-200 p-1">
          <AvatarImage src={"/avatar-default.svg"} />
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p>5.0 Amazing</p>
            <p>|</p>
            <p>Omar Siphron</p>
          </div>
          <p className="text-md font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <FaFlag size={26} />
      </div>
    </>
  );
};

export default Review;
