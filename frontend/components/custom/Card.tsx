interface CardProps {
  name: string;
  description: string;
  button: string;
  image: string;
}

const Card = ({ name, description, button, image }: CardProps) => {
  console.log(image);
  return (
    <>
      <div
        className="lg:w-[604px] w-[312px] h-[400px] bg-cover relative flex flex-col gap-2 justify-end items-center text-white p-7 lg:h-[559px] rounded-lg"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <p className="font-bold text-4xl">{name}</p>
        <span className="font-light max-w-[368px] text-center text-lg">
          {description}
        </span>
        <button className=" w-[144px] text-[#112211] font-bold text-sm h-[48px] bg-[#8DD3BB] rounded-[4px] cursor-pointer ">
          {button}
        </button>
      </div>
    </>
  );
};

export default Card;
