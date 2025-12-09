"use client";

import { useTranslations } from "next-intl";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#8DD3BB] pt-28 pb-5 px-6 relative z-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div>
            <p className="text-2xl flex font-bold text-black mb-10">
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
            <h4 className="font-semibold mb-4">{t("destinations")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-black">
                  {t("destination_uzbekistan")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  {t("destination_kazakhstan")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  {t("destination_tajikistan")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("company")}</h4>

            <div className="flex gap-10">
              <ul className="space-y-2 text-sm whitespace-nowrap">
                <li><a href="#" className="hover:text-black">{t("about_us")}</a></li>
                <li><a href="#" className="hover:text-black">{t("testimonials")}</a></li>
                <li><a href="#" className="hover:text-black">{t("our_team")}</a></li>
                <li><a href="#" className="hover:text-black">{t("booking_terms")}</a></li>
                <li><a href="#" className="hover:text-black">{t("cancellations")}</a></li>
              </ul>

              <ul className="space-y-2 text-sm whitespace-nowrap">
                <li><a href="#" className="hover:text-black">{t("privacy_policy")}</a></li>
                <li><a href="#" className="hover:text-black">{t("sustainability_policy")}</a></li>
                <li><a href="#" className="hover:text-black">{t("partnership")}</a></li>
                <li><a href="#" className="hover:text-black">{t("contacts")}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-800">
          <p className="font-semibold">{t("company_full_name")}</p>
          <p className="mt-1">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
