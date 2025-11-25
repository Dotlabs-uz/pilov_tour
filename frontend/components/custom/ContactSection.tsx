"use client"

import type React from "react"
import { useState } from "react"
import { useTranslations } from "next-intl"

export function ContactSection() {
    const t = useTranslations("contact")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        destination: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            setFormData({ name: "", email: "", destination: "", message: "" })
        }, 1000)
    }

    return (
<<<<<<< HEAD
      <section className="py-16 md:py-24 bg-[#8DD3BB] relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <span className="text-white text-sm font-semibold tracking-wide">
                CONTACT US
              </span>
=======
        <section className="py-16 md:py-24 relative overflow-hidden bg-white">
            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-block mb-6 px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                        <span className="text-gray-600 text-sm font-semibold tracking-wide">{t("badge")}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{t("title")}</h2>
                    <p className="text-xl text-gray-700 leading-relaxed mb-2">{t("subtitle")}</p>
                    <p className="text-lg text-gray-600">{t("description")}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <h4 className="text-teal-600 font-semibold mb-2">{t("sidebar_title")}</h4>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("sidebar_heading")}</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">{t("sidebar_text1")}</p>
                            <p className="text-gray-700 leading-relaxed mb-4">{t("sidebar_text2")}</p>
                            <p className="text-gray-800 font-medium">{t("sidebar_text3")}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("form_name_label")}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t("form_name_placeholder")}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#8DD3BB]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("form_email_label")}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t("form_email_placeholder")}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#8DD3BB]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("form_destination_label")}</label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    placeholder={t("form_destination_placeholder")}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#8DD3BB]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("form_message_label")}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t("form_message_placeholder")}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#8DD3BB] resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 bg-[#8DD3BB] text-gray-900 font-semibold rounded-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer hover:bg-[#7bc5ad] transition-colors"
                            >
                                {isSubmitting ? t("form_submitting") : t("form_submit")}
                            </button>
                        </form>
                    </div>
                </div>
>>>>>>> f626d045a02a07528dc206c161673e6204d1faa4
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Don't know where to go next?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-2">
              Dream of a trip created just for you?
            </p>
            <p className="text-lg text-white/80">
              Click "Get in Touch", fill out a quick form — and we'll turn your
              ideas into the perfect route.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h4 className="text-blue-300 font-semibold mb-2">
                  Ready for a Journey?
                </h4>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Your new adventure starts with one click!
                </h3>
                <p className="text-white/80 leading-relaxed mb-4">
                  Let us craft the perfect journey tailored to your dreams. Our
                  travel experts are ready to help you create unforgettable
                  memories, from hidden gems and local experiences to iconic
                  landmarks and thrilling adventures.
                </p>
                <p className="text-white/80 leading-relaxed mb-4">
                  Share your vision with us, and we’ll turn it into a seamless,
                  personalized itinerary that will leave you inspired, relaxed,
                  and ready to explore the world like never before.
                </p>
                <p className="text-white/90 font-medium">
                  Adventure awaits – let's plan it together!
                </p>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Where to?
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g., Uzbekistan, Kazakhstan..."
                    className="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Tell us about your dream trip
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your ideal adventure..."
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
                  {isSubmitting ? "Sending..." : "Send My Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}

