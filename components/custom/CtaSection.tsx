"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Send,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useState } from "react";

enum ContactEnum {
  Email = "email",
  Telegram = "telegram",
  Whatsapp = "whatsapp",
}

export function CtaSection() {
  const t = useTranslations("CtaSection");
  const tBooking = useTranslations("booking");
  const tContact = useTranslations("contact");
  const [contact, setContact] = useState<ContactEnum>(ContactEnum.Email);
  const [email, setEmail] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/silk-road-desert.jpg"
          alt="Silk Road desert caravan"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
      </div>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-20 w-20 h-20 rounded-full bg-coral/20 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-gold/20 blur-2xl"
      />

      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/20 text-coral text-sm font-body font-semibold mb-6"
            >
              <Sparkles size={14} />
              {t("ready_to_go_question")}
            </motion.span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("your_adventure")}
              <br />
              <span className="text-gold">{t("starts_here")}</span>
            </h2>

            <p className="font-body text-xl text-white/80 mb-8 max-w-lg">
              {t("dream_trip_description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="gradient" size="xl" asChild>
                <Link href="/tours">
                  {t("browse_trips")}
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button
                onClick={() => {
                  const contactForm = document.getElementById("contact-form");
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                variant="hero"
                size="xl"
              >
                {t("chat_with_us")}
                <Send size={18} />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
            id="contact-form"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              {t("get_travel_inspo")} ✨
            </h3>
            <p className="font-body text-white/70 mb-6">
              {t("newsletter_description")}
            </p>

            <div className="flex gap-3 mb-6 flex-wrap">
              <button
                onClick={() => setContact(ContactEnum.Email)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body font-semibold transition-all ${
                  contact === ContactEnum.Email
                    ? "bg-coral text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <Mail size={18} />
                {tBooking("email") || t("email_placeholder")}
              </button>
              <button
                onClick={() => setContact(ContactEnum.Telegram)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body font-semibold transition-all ${
                  contact === ContactEnum.Telegram
                    ? "bg-coral text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <MessageCircle size={18} />
                {tBooking("telegram")}
              </button>
              <button
                onClick={() => setContact(ContactEnum.Whatsapp)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-body font-semibold transition-all ${
                  contact === ContactEnum.Whatsapp
                    ? "bg-coral text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <Phone size={18} />
                {tBooking("whatsapp")}
              </button>
            </div>

            {contact === ContactEnum.Email && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) {
                    window.location.href = `mailto:hello@pilavtour.uz?subject=Contact from ${email}`;
                    setEmail("");
                  }
                }}
                className="space-y-4"
              >
                <Input
                  type="email"
                  placeholder={t("email_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl text-lg"
                />
                <Input
                  type="text"
                  placeholder={t("name_placeholder")}
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl text-lg"
                />
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={!email}
                >
                  <Send size={18} />
                  {t("subscribe_button")}
                </Button>
              </form>
            )}

            {contact === ContactEnum.Telegram && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (telegramUsername) {
                    window.open(
                      `https://t.me/pilavtour_bot?start=${telegramUsername}`,
                      "_blank",
                    );
                    setTelegramUsername("");
                  }
                }}
                className="space-y-4"
              >
                <Input
                  type="text"
                  placeholder={t("telegram_placeholder")}
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl text-lg"
                />
                <p className="text-white/50 text-sm font-body">
                  {t("or_contact_direct")}
                </p>
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  type="button"
                  onClick={() =>
                    window.open("https://t.me/pilavtour_bot", "_blank")
                  }
                >
                  <MessageCircle size={18} />
                  {t("open_telegram")}
                </Button>
              </form>
            )}

            {contact === ContactEnum.Whatsapp && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (whatsappPhone) {
                    const message = encodeURIComponent(
                      "Hi, I'd like to know more about your tours!",
                    );
                    window.open(
                      `https://wa.me/998933881111?text=${message}`,
                      "_blank",
                    );
                    setWhatsappPhone("");
                  }
                }}
                className="space-y-4"
              >
                <Input
                  type="tel"
                  placeholder={t("whatsapp_placeholder")}
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl text-lg"
                />
                <p className="text-white/50 text-sm font-body">
                  {t("response_time")}
                </p>
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  type="button"
                  onClick={() =>
                    window.open("https://wa.me/998933881111", "_blank")
                  }
                >
                  <Phone size={18} />
                  {t("open_whatsapp")}
                </Button>
              </form>
            )}

            <p className="text-white/50 text-xs font-body mt-4 text-center">
              {t("newsletter_join_text")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
