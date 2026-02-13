"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  Heart,
  Sparkles,
  MapPin,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

import uzbekWoman from "@/public/uzbek-woman.jpg";
import artisanPottery from "@/public/artisan-pottery.jpg";
import silkRoadDesert from "@/public/silk-road-desert.jpg";

const AboutPage = () => {
  const t = useTranslations("about");

  const values = [
    {
      icon: MapPin,
      title: t("values_born_here_title"),
      description: t("values_born_here_description"),
      color: "text-coral",
      bg: "bg-coral/10",
    },
    {
      icon: Users,
      title: t("values_small_crews_title"),
      description: t("values_small_crews_description"),
      color: "text-turquoise",
      bg: "bg-turquoise/10",
    },
    {
      icon: Coffee,
      title: t("values_food_first_title"),
      description: t("values_food_first_description"),
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      icon: Heart,
      title: t("values_real_connections_title"),
      description: t("values_real_connections_description"),
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  const stats = [
    { value: "2005", label: t("stats_started") },
    { value: "2,500+", label: t("stats_happy_travelers") },
    { value: "4.9", label: t("stats_rating") },
    { value: "15", label: t("stats_team_members") },
  ];

  const team = [
    { name: "Rustam", role: t("team_rustam_role"), emoji: "🎯" },
    { name: "Dilnoza", role: t("team_dilnoza_role"), emoji: "🗺️" },
    { name: "Aziz", role: t("team_aziz_role"), emoji: "🍜" },
    { name: "Malika", role: t("team_malika_role"), emoji: "🎨" },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-navy">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={uzbekWoman}
            alt="Local Uzbek woman"
            fill
            style={{ objectFit: "cover" }}
            objectPosition="top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
        </motion.div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 text-gold font-body text-sm font-semibold tracking-wide uppercase mb-4"
              >
                <Sparkles size={16} />
                {t("about_us_heading")}
              </motion.span>
              <h1 className="text-hero text-white mb-6">
                {t("we_are")}
                <br />
                <span className="text-coral">{t("company_name")}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-body leading-relaxed">
                {t("hero_description_part1")}
                <br />
                {t("hero_description_part2")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-coral mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-turquoise font-body text-sm font-semibold tracking-wide uppercase mb-4 block">
                {t("our_story_heading")}
              </span>
              <h2 className="text-section text-foreground mb-8">
                {t("started_with")}
                <br />
                <span className="text-gradient">{t("three_friends")}</span>
              </h2>
              <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
                <p className="text-lg">{t("story_paragraph1")}</p>
                <p>{t("story_paragraph2")}</p>
                <p>{t("story_paragraph3")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 0 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-medium">
                <Image
                  src={artisanPottery}
                  alt="Local artisan"
                  width={700}
                  height={500}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-coral text-white p-6 rounded-2xl shadow-glow"
              >
                <div className="text-4xl font-display font-bold">
                  {t("years_of_experience_value")}
                </div>
                <div className="text-white/80 font-body">
                  {t("years_of_experience_label")}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-coral font-body text-sm font-semibold tracking-wide uppercase mb-4 block">
              {t("what_we_are_about_heading")}
            </span>
            <h2 className="text-section text-foreground">
              {t("not_your_typical")}
              <br />
              <span className="text-gradient">{t("tour_company")}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  rotate: index % 2 === 0 ? 1 : -1,
                }}
                className="bg-cream rounded-3xl p-8 flex gap-6"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${value.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-section text-foreground">
              {t("meet_the")} <span className="text-gradient">{t("crew")}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{
                  opacity: 0,
                  y: 30,
                  rotate: (index - 1.5) * 3,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: (index - 1.5) * 3,
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="bg-white rounded-3xl p-6 text-center shadow-card"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-coral to-gold flex items-center justify-center text-4xl">
                  {member.emoji}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={silkRoadDesert}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              {t("ready_to_explore")}
            </h2>
            <p className="text-xl text-white/80 font-body mb-8 max-w-lg mx-auto">
              {t("plan_your_adventure")}
            </p>
            <Button variant="gradient" size="xl" asChild>
              <Link href="/trips">
                {t("see_all_trips")}
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
