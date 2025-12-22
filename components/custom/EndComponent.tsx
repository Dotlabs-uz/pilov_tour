"use client";

import { Button } from "../ui/button";

const EndComponent = () => {
  return (
    <>
      <div className="flex w-[400px] justify-center pl-5 pr-5 h-[284px] border-1 border-[#8DD3BB] rounded-lg  flex-col gap-10">
        <div className="flex flex-col gap-3">
          <p className="text-3xl max-w-[230px] font-bold">
            Cancellation Policy
          </p>
          <span className="text-xl font-light">
            You can cancel up to 24 hours in advance of the experience fo a full
            refund
          </span>
        </div>
        <Button className="w-[115px] font-bold rounded-md h-[48px] text-black hover:bg-white hover:text-black cursor-pointer bg-white border-1 border-[#8DD3BB] ">
          Show more
        </Button>
      </div>
    </>
  );
};

export default EndComponent;
