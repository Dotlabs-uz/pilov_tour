"use client";

import type React from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactSection() {
  const t = useTranslations("contact");

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
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#8DD3BB] relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 rounded-full border border-white/20">
            <span className="text-white text-sm font-semibold tracking-wide">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("title")}
          </h2>

          <p className="text-xl text-white/90 leading-relaxed mb-2">
            {t("subtitle")}
          </p>
          <p className="text-lg text-white/80">{t("description")}</p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Sidebar */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h4 className="text-blue-100 font-semibold mb-2">
                {t("sidebar_title")}
              </h4>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("sidebar_heading")}
              </h3>
              <p className="text-white/80 leading-relaxed mb-4">
                {t("sidebar_text1")}
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                {t("sidebar_text2")}
              </p>
              <p className="text-white/90 font-medium">{t("sidebar_text3")}</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t("form_name_label")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form_name_placeholder")}
                  className="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t("form_email_label")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form_email_placeholder")}
                  className="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t("form_destination_label")}
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder={t("form_destination_placeholder")}
                  className="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  {t("form_message_label")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("form_message_placeholder")}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#007bb5] text-white font-semibold rounded-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? t("form_submitting") : t("form_submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
