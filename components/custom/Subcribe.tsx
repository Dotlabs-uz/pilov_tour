"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Subscribe = () => {
  const t = useTranslations("subscribe");
  const c = useTranslations("contact");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", destination: "", message: "" });
      setIsOpen(false);
    }, 1000);
  };

  return (
    <section className="bg-[#CDEAE1] w-[300px] lg:max-w-[1232px] lg:w-full mt-20 mx-auto py-12 px-6 rounded-xl relative -mb-20 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 text-left">
          <div className="flex flex-col max-w-[350px]">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-semibold mb-4">
              {t("title")}
            </h2>
            <p className="text-lg md:text-xl font-semibold mb-4">
              {t("description")}
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => setIsOpen(true)}
                className="mt-4 px-6 py-3 bg-[#007bb5] text-white font-semibold rounded-lg hover:bg-[#005a8a] transition-colors cursor-pointer inline-flex"
              >
                {t("contact_button")}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Image
            width={400}
            height={305}
            src="/mail.png"
            alt={t("image_alt")}
            className="w-60 md:w-72"
          />
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">{c("title")}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {c("form_name_label")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={c("form_name_placeholder")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {c("form_email_label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={c("form_email_placeholder")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {c("form_destination_label")}
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder={c("form_destination_placeholder")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {c("form_message_label")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={c("form_message_placeholder")}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:border-transparent resize-none"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-[#8DD3BB] text-white font-semibold rounded-lg hover:bg-[#5ad6ab] disabled:opacity-70 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {isSubmitting ? c("form_submitting") : c("form_submit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    {c("form_cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Subscribe;
