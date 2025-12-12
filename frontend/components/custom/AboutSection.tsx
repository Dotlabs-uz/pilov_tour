"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"

export function AboutSection() {
    const t = useTranslations("about")
    const c = useTranslations("contact")
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
        <div id="about" className="w-full bg-white overflow-hidden container max-w-[1200px] mx-auto">
            <div className="px-4 lg:px-0 py-10 lg:py-20 flex justify-between items-center">
                <h1 className="text-xl sm:text-3xl lg:text-5xl font-black text-black leading-none">
                    {(() => {
                        const words = t("title").split(" ");
                        const lastWord = words.pop();
                        return (
                            <>
                                {words.join(" ")}{" "}
                                <span className="bg-gradient-to-r from-[#8DD3BB] to-[#8DD3BB] bg-clip-text text-transparent">
                                    {lastWord}
                                </span>
                            </>
                        )
                    })()}
                </h1>

                <p className="text-3xl text-black font-light max-w-2xl">Pilav Tour</p>
            </div>

            <section className="px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight text-center lg:text-left">
                            {t("section1.title")}
                        </h3>
                        <p className="text-lg text-black/70 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                            {t("section1.description")}
                        </p>
                    </div>

                    <div className="relative h-96 lg:h-full">
                        <div className="absolute inset-0 bg-[#8DD3BB] rounded-3xl transform rotate-6"></div>
                        <div className="relative bg-white rounded-3xl p-2 h-full transform -rotate-2 shadow-2xl">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image src="/uzb.jpeg" alt={t("section1.title")} fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="px-4 lg:px-0 py-8">
                <div className="h-px bg-black/10"></div>
            </div>

            <section className="px-4 lg:px-0 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

                    <div className="lg:col-span-1 relative h-96 lg:h-full order-2 lg:order-1">
                        <div className="absolute inset-0 bg-[#8DD3BB] rounded-3xl transform -rotate-6"></div>
                        <div className="relative bg-white rounded-3xl p-2 h-full transform rotate-2 shadow-2xl">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image src="/registan.jpg" alt={t("section2.title")} fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6 flex flex-col justify-center order-1 lg:order-2">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight text-center lg:text-left">
                            {t("section2.title")}
                        </h3>

                        <p className="text-lg text-black/70 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                            {t("section2.description")}
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
            </section>

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
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{c("form_name_label")}</label>
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
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{c("form_email_label")}</label>
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
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">{c("form_message_label")}</label>
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
                                        className="flex-1 py-3 bg-[#8DD3BB] text-white font-semibold rounded-lg hover:bg-[#5ad6ab] disabled:opacity-70 disabled:cursor-not-allowed transition-colors cursor-pointer"                                    >
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
        </div>
    )
}
