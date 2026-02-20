"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HelpCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
  const t = useTranslations("faq");

  const faqCategories = [
    {
      category: "Booking & Reservations",
      icon: "🎫",
      questions: [
        {
          id: "q1",
          question: t("q1_question") || "How do I book a tour?",
          answer:
            t("q1_answer") ||
            "You can browse our available tours on the Trips page, select your preferred dates, and follow the booking form. You'll receive a confirmation within 24 hours.",
        },
        {
          id: "q2",
          question: t("q2_question") || "What's your cancellation policy?",
          answer:
            t("q2_answer") ||
            "Cancellations made 30 days before departure receive a full refund. Cancellations within 30 days are subject to a 50% charge. Within 14 days, no refund is available.",
        },
        {
          id: "q3",
          question: t("q3_question") || "Can I modify my booking?",
          answer:
            t("q3_answer") ||
            "Yes, you can modify your tour dates or group size up to 21 days before departure. Contact us at info@pilavtour.uz for assistance.",
        },
        {
          id: "q4",
          question: t("q4_question") || "Do you offer group discounts?",
          answer:
            t("q4_answer") ||
            "Yes! Groups of 8 or more receive special discounts. Contact our sales team for a custom quote.",
        },
      ],
    },
    {
      category: "Tour Details & Itinerary",
      icon: "🗺️",
      questions: [
        {
          id: "q5",
          question: t("q5_question") || "What's included in the tour price?",
          answer:
            t("q5_answer") ||
            "Our tour prices include all accommodation, meals as specified, local transportation, and guided activities. International flights and travel insurance are not included.",
        },
        {
          id: "q6",
          question:
            t("q6_question") || "What's the best time to visit Uzbekistan?",
          answer:
            t("q6_answer") ||
            "Spring (April-May) and autumn (September-October) offer the best weather. Summer (June-August) can be extremely hot, while winter (December-February) is cold but less crowded.",
        },
        {
          id: "q7",
          question: t("q7_question") || "Can tours be customized?",
          answer:
            t("q7_answer") ||
            "Absolutely! We specialize in custom tours. Share your interests, budget, and dates, and we'll create the perfect itinerary for you.",
        },
        {
          id: "q8",
          question: t("q8_question") || "Are there private tour options?",
          answer:
            t("q8_answer") ||
            "Yes, we offer fully private tours for groups of any size. These can be customized to your preferences and pace.",
        },
      ],
    },
    {
      category: "Travel Requirements",
      icon: "✈️",
      questions: [
        {
          id: "q9",
          question: t("q9_question") || "Do I need a visa for Uzbekistan?",
          answer:
            t("q9_answer") ||
            "Requirements depend on your nationality. Citizens of many countries can visit visa-free for up to 30 days. Check current regulations with your embassy.",
        },
        {
          id: "q10",
          question: t("q10_question") || "What vaccinations are recommended?",
          answer:
            t("q10_answer") ||
            "Consult your doctor, but typically hepatitis A and typhoid are recommended. COVID-19 vaccination requirements may apply depending on the situation.",
        },
        {
          id: "q11",
          question: t("q11_question") || "What currency is used?",
          answer:
            t("q11_answer") ||
            "Uzbekistan uses the Uzbekistani Som (UZS). ATMs are widely available in cities, and most hotels accept credit cards.",
        },
        {
          id: "q12",
          question: t("q12_question") || "Is it safe to travel to Uzbekistan?",
          answer:
            t("q12_answer") ||
            "Yes, Uzbekistan is generally safe for tourists. It has low crime rates and a welcoming culture. Our local guides ensure your safety and comfort.",
        },
      ],
    },
    {
      category: "Payment & Pricing",
      icon: "💳",
      questions: [
        {
          id: "q13",
          question: t("q13_question") || "What payment methods do you accept?",
          answer:
            t("q13_answer") ||
            "We accept credit cards (Visa, Mastercard), bank transfers, and popular payment platforms. A 50% deposit is required to confirm your booking.",
        },
        {
          id: "q14",
          question: t("q14_question") || "Are there additional fees?",
          answer:
            t("q14_answer") ||
            "The quoted price is all-inclusive for tour activities. Some optional activities (shopping, spas) may have extra costs.",
        },
        {
          id: "q15",
          question: t("q15_question") || "Do you offer travel insurance?",
          answer:
            t("q15_answer") ||
            "We recommend purchasing travel insurance for your trip. We can provide information about trusted providers.",
        },
        {
          id: "q16",
          question: t("q16_question") || "What's your pricing for children?",
          answer:
            t("q16_answer") ||
            "Children under 6 are free. Ages 6-12 receive 30% discount. Full price applies from age 13 onwards.",
        },
      ],
    },
    {
      category: "Before Your Trip",
      icon: "📋",
      questions: [
        {
          id: "q17",
          question: t("q17_question") || "What should I pack?",
          answer:
            t("q17_answer") ||
            "Pack light clothing for summer, warm layers for spring/autumn, and sturdy walking shoes. Modest clothing is advisable when visiting religious sites. Sunscreen and a hat are essential.",
        },
        {
          id: "q18",
          question: t("q18_question") || "What's the weather like?",
          answer:
            t("q18_answer") ||
            "Spring/autumn: 15-25°C, pleasant. Summer: 30-40°C, hot. Winter: 0-10°C, cold. Dress accordingly!",
        },
        {
          id: "q19",
          question: t("q19_question") || "Do you provide airport transfers?",
          answer:
            t("q19_answer") ||
            "Yes, airport transfers are included for most tours. We'll arrange pickup and dropoff as part of your package.",
        },
        {
          id: "q20",
          question: t("q20_question") || "What languages do your guides speak?",
          answer:
            t("q20_answer") ||
            "Our guides speak English, Russian, and other languages. Let us know your language preference when booking.",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-cream pt-20 mt-10 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="text-coral w-10 h-10" />
            <h1 className="text-section text-foreground">
              {t("title") || "Frequently Asked Questions"}
            </h1>
          </motion.div>
          <p className="text-lg text-muted-foreground font-body">
            {t("subtitle") ||
              "Find answers to common questions about our tours, booking process, and travel requirements."}
          </p>
        </motion.div>

        {/* FAQ Sections */}
        <div className="space-y-12 max-w-3xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <CardTitle>{category.category}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, itemIndex) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-semibold text-foreground">
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-coral/10 to-turquoise/10 border-coral/20">
            <CardContent className="pt-8">
              <MessageCircle className="w-12 h-12 text-coral mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {t("cta_title") || "Still have questions?"}
              </h3>
              <p className="text-muted-foreground font-body mb-6">
                {t("cta_description") ||
                  "Our team is here to help. Get in touch with us anytime!"}
              </p>
              <Button asChild size="lg">
                <Link href="/contact">{t("cta_button") || "Contact Us"}</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
