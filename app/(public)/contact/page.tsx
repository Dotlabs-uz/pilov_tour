"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      phone: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setSubmitSuccess(true);
      form.reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@pilavtour.uz",
      color: "text-coral",
      bg: "bg-coral/10",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+998 (71) 205-33-00",
      color: "text-turquoise",
      bg: "bg-turquoise/10",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Tashkent, Uzbekistan",
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      icon: MessageSquare,
      title: "Telegram",
      value: "@pilavtour",
      color: "text-accent",
      bg: "bg-accent/10",
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
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h1 className="text-section text-foreground mb-4">{t("title")}</h1>
          <p className="text-lg text-muted-foreground font-body">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div
                    className={`${info.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <info.icon className={`${info.color} w-6 h-6`} />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {info.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("form_title") || "Send us a message"}</CardTitle>
              <CardDescription>
                {t("form_description") ||
                  "Fill out the form below and we'll get back to you as soon as possible."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg"
                >
                  <p className="text-green-800 font-semibold">
                    ✓{" "}
                    {t("success_message") ||
                      "Thank you! Your message has been sent."}
                  </p>
                </motion.div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("form_name_label") || "Full Name"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                t("form_name_placeholder") || "John Doe"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("form_email_label") || "Email"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={
                                t("form_email_placeholder") || "you@example.com"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("form_phone_label") || "Phone (optional)"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder={
                                t("form_phone_placeholder") ||
                                "+998 (XX) XXX-XX-XX"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("form_subject_label") || "Subject"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                t("form_subject_placeholder") ||
                                "How can we help?"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("form_message_label") || "Message"}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={
                              t("form_message_placeholder") ||
                              "Tell us more about your inquiry..."
                            }
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("form_sending") || "Sending..."}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("form_submit") || "Send Message"}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
