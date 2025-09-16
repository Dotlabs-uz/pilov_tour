import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#8DD3BB] pt-28 pb-5 px-6 relative z-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-8 mb-10">
          <div>
            {/* <Image
              src="/logo-footer.png"
              alt="Golobe Logo"
              width={120}
              height={40}
              className="mb-6"
            /> */}

            <p className="text-2xl flex font-bold text-black mb-10 ">
              Pilav{" "}
              <span className="text-white">
                Tour <u>Agency</u>
              </span>
            </p>
            <div className="flex gap-4 text-2xl text-gray-800">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Destinations</h4>
            <ul className="space-y-2 text-sm">
              {["Canada", "Alaska", "France", "Iceland"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-black">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Our Activities</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Northern Lights",
                "Cruising & sailing",
                "Multi-activities",
                "Kayaking",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-black">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Travel Blogs</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Bali Travel Guide",
                "Sri Lanka Travel Guide",
                "Peru Travel Guide",
                "Bali Travel Guide",
              ].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-black">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Contact */}
          <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            <ul className="space-y-2 text-sm mb-6">
              {["Our Story", "Work with us"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-black">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              {["Our Story", "Work with us"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-black">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-sm text-gray-800">
          <p>© 2025 PilavTour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
