"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <main className="min-h-screen bg-cream pt-20 mt-10 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-display text-3xl font-bold mb-2">
          {t("title") || "Terms & Conditions"}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {t("last_updated") || "Last updated: February 20, 2026"}
        </p>

        <Card>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="introduction">
                <AccordionTrigger>
                  {t("introduction_title") || "Introduction"}
                </AccordionTrigger>
                <AccordionContent>
                  {t("introduction_text") ||
                    "These Terms and Conditions govern your use of the Pilavtour website and services. By using our site or booking a tour, you accept these terms."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="booking">
                <AccordionTrigger>
                  {t("booking_title") || "Booking & Payment"}
                </AccordionTrigger>
                <AccordionContent>
                  {t("booking_text") ||
                    "To book a tour you must follow the booking flow and provide the required information. A deposit may be required to confirm your reservation."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancellations">
                <AccordionTrigger>
                  {t("cancellations_title") || "Cancellations & Refunds"}
                </AccordionTrigger>
                <AccordionContent>
                  {t("cancellations_text") ||
                    "Cancellation terms vary by tour. Generally, cancellations made 30 days before departure receive a full refund; later cancellations may be subject to fees."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="liability">
                <AccordionTrigger>
                  {t("liability_title") || "Liability"}
                </AccordionTrigger>
                <AccordionContent>
                  {t("liability_text") ||
                    "Pilavtour acts as an organizer and takes reasonable care in providing services. We are not liable for events beyond our control (force majeure)."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy">
                <AccordionTrigger>
                  {t("privacy_title") || "Privacy & Data"}
                </AccordionTrigger>
                <AccordionContent>
                  {t("privacy_text") ||
                    "We collect and process personal data to provide our services. Please review our Privacy Policy for details on how we handle your information."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="changes">
                <AccordionTrigger>
                  {t("changes_title") || "Changes to These Terms"}
                </AccordionTrigger>
                <AccordionContent>
                  {t("changes_text") ||
                    "We may update these Terms from time to time. Continued use of the site after changes constitutes acceptance of the new terms."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger>
                  {t("contact_title") || "Contact"}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    {t("contact_text") ||
                      "If you have questions about these Terms, please contact our team."}
                  </p>
                  <Link href="/contact" className="text-coral font-medium">
                    {t("contact_button") || "Contact Us"}
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
