const TravelCard = () => {
  return (
    <>
      <div
        className="flex flex-col mt-10 gap-5 p-4 bg-cover items-center justify-end rounded-2xl w-[300px] h-[400px] text-white"
        style={{ backgroundImage: "url('/melbourne.png')" }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">Melbourne</p>
            <span className="text-sm">An amazing journey</span>
          </div>
          <p className="text-lg font-semibold">$ 700</p>
        </div>
        <button className="w-[248px] cursor-pointer hover:bg-[#CDEAE1] transition-all h-[48px] rounded-md bg-[#8DD3BB] text-black">
          Book a Hotel
        </button>
      </div>
    </>
  );
};

export default TravelCard;
