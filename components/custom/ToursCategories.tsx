"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/(public)/firebase";
import { Category } from "@/app/(public)/trips/page";
import { useRouter } from "next/navigation";

export default function ToursCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const t = useTranslations("tours");
  const router = useRouter();

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
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#8DD3BB] bg-opacity-10 rounded-full px-4 py-2 mb-4">
            <span className="text-white font-semibold text-sm">
              {t("badge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            {t("title")}
          </h1>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div onClick={() => router.push(`/trips?category=${category.destination}`)}
              className="w-[300px] cursor-pointer h-[150px] p-5 shadow-xl rounded-lg flex items-center justify-between"
              key={category.id}
            >
              <p className="text-lg font-bold">{category.destination}</p>
              <img
                className="w-[120px] h-[100px] rounded-lg"
                src={category.image}
                alt="category image"
              />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
