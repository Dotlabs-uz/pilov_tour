import { Link } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p></p>
          <p></p>
        </div>
        <Image width={110.35} height={36} src="/logo.png" alt="Logo" />
        <div className="flex items-center gap-2">
          <Link to="/login" />
          <Button className="">Sign up</Button>
        </div>
      </header>
    </>
  );
};

export default Header;
