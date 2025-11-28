"use client"
import type React from "react"
import { useState } from "react"
import { useTranslations } from "next-intl"

export function ContactSection() {
    const t = useTranslations("contact")
    const [isOpen, setIsOpen] = useState(false)
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
            setIsOpen(false)
        }, 1000)
    }

    return (
        <>
            <section className="py-16 md:py-24 bg-[#8DD3BB] relative overflow-hidden">
                <div className="relative z-10 container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-block mb-6 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                            <span className="text-white text-sm font-semibold tracking-wide">{t("badge")}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t("title")}</h2>
                        <p className="text-xl text-white/90 leading-relaxed mb-4">{t("subtitle")}</p>
                        <p className="text-lg text-white/80 mb-8">{t("description")}</p>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-block px-8 py-3 bg-[#007bb5] text-white font-semibold rounded-lg hover:bg-[#005a8a] transition-colors cursor-pointer"
                        >
                            {t("form_submit")}
                        </button>
                    </div>
                </div>
            </section>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                            <h3 className="text-2xl font-bold text-gray-900">{t("title")}</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("form_name_label")}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t("form_name_placeholder")}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("form_email_label")}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t("form_email_placeholder")}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        {t("form_destination_label")}
                                    </label>
                                    <input
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        placeholder={t("form_destination_placeholder")}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{t("form_message_label")}</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t("form_message_placeholder")}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007bb5] focus:border-transparent resize-none"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 py-3 bg-[#8DD3BB] text-white font-semibold rounded-lg hover:bg-[#5ad6ab] disabled:opacity-70 disabled:cursor-not-allowed transition-colors cursor-pointer"                                    >
                                        {isSubmitting ? t("form_submitting") : t("form_submit")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                                    >
                                        {t("form_cancel")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

