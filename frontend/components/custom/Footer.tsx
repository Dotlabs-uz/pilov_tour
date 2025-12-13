"use client";

import { db } from "@/app/(public)/firebase";
import { Category } from "@/app/(public)/trips/page";
import { collection, getDocs } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";

const Footer = () => {
  const t = useTranslations("footer");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));

        const categoryDb: Category[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, "id">),
        }));

        console.log(categoryDb);
        setCategories(categoryDb);
      } catch (e) {
        console.log(e, "Something w+ent wrong");
      }
    };

    fetchCategories();
  }, []);

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
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("destinations")}</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/trips?=category${category.destination}`}
                    className="hover:text-black"
                  >
                    {category.destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-10">
            <div>
              <h4 className="font-semibold mb-4">{t("company")}</h4>
              <ul className="space-y-2 text-sm whitespace-nowrap">
                <li>
                  <a href="#about" className="hover:text-black">
                    {t("about_us")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    {t("testimonials")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    {t("our_team")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    {t("booking_terms")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("confidentiality")}</h4>
              <ul className="space-y-2 text-sm whitespace-nowrap">
                <li>
                  <a href="#" className="hover:text-black">
                    {t("cancellations")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    {t("privacy_policy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    {t("sustainability_policy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    {t("partnership")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    {t("contacts")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 whitespace-nowrap">
                {t("payment_methods")}
              </h4>
              <div className="flex gap-4 items-center">
                <FaCcVisa className="text-5xl" color="blue" />
                <FaCcMastercard className="text-5xl" color="" />
              </div>
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
