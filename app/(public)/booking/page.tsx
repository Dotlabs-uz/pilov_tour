"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { LocalizedString } from "@/lib/types";
import { db } from "@/app/(public)/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  Send,
  CheckCircle2,
  Loader2,
  Calendar,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Lang = keyof LocalizedString;

type LocalizedValue = string | LocalizedString | null | undefined;

function tLocalized(value: LocalizedValue, locale: Lang): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  return (
    value[locale] ||
    value.en ||
    value.ru ||
    value.uz ||
    value.uk ||
    value.it ||
    value.sp ||
    value.ge ||
    Object.values(value).find((v) => typeof v === "string" && v.trim()) ||
    ""
  );
}

const BookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale() as Lang;
  const t = useTranslations("booking");
  const commonT = useTranslations("common");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const tourId = searchParams.get("tourId");
  const tourName = searchParams.get("tourName");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const price = searchParams.get("price");
  const userId = searchParams.get("userId");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    contactMethod: "whatsapp",
    whatsappTelegram: "",
    email: "",
    comment: "",
    numberOfPeople: 1,
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    whatsappTelegram: "",
  });

  const totalPrice = price
    ? (parseInt(price) * formData.numberOfPeople).toLocaleString()
    : "0";
  const [tourData, setTourData] = useState<any | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data: any = snap.data();
          setFormData((prev) => ({
            ...prev,
            name: data.name || prev.name,
            email: data.email || prev.email,
            phone: data.phone || prev.phone,
            whatsappTelegram: data.whatsapp || prev.whatsappTelegram,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch user for booking prefill:", err);
      }
    };

    fetchUser();
  }, [userId]);

  // Fetch tour data for the right-side card
  useEffect(() => {
    if (!tourId) return;

    const fetchTour = async () => {
      try {
        const tourRef = doc(db, "tours", tourId);
        const snap = await getDoc(tourRef);
        if (snap.exists()) {
          setTourData(snap.data());
        }
      } catch (err) {
        console.error("Failed to fetch tour for booking page:", err);
      }
    };

    fetchTour();
  }, [tourId]);

  const validateForm = () => {
    const newErrors = { name: "", phone: "", whatsappTelegram: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t("name_required");
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("phone_required");
      isValid = false;
    }

    if (!formData.whatsappTelegram.trim()) {
      newErrors.whatsappTelegram = `${
        formData.contactMethod === "whatsapp" ? t("whatsapp") : t("telegram")
      } ${t("required")}`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendTelegramNotification = async (data: typeof formData) => {
    try {
      const tourInfo = tourName
        ? `Tour: ${tourName}\nStart: ${startDate ? new Date(startDate).toLocaleDateString() : "N/A"}\nEnd: ${endDate ? new Date(endDate).toLocaleDateString() : "N/A"}\nPeople: ${data.numberOfPeople}\nPrice per person: $${price || "N/A"}\nTotal price: $${totalPrice}\n\n`
        : "";

      const message = `
🎯 New Booking Request

${tourInfo}
Name: ${data.name}
Phone: ${data.phone}
Contact: ${data.contactMethod.toUpperCase()} ${data.whatsappTelegram}
Email: ${data.email || "Not provided"}
Comment: ${data.comment || "None"}
      `.trim();

      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        });
      }
    } catch (error) {
      console.error("Telegram notification error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This prevents actual form submission - the dialog now handles the submission
    return false;
  };

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-4 lg:px-0 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                {t("page_title")}
              </h1>
              <p className="text-muted-foreground max-w-lg">
                {t("page_subtitle")}
              </p>
            </motion.div>

            {tourName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-border"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  {t("selected_tour")}
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("tour_label")}
                    </p>
                    <p className="font-display font-semibold text-foreground">
                      {tourName}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {startDate && (
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar size={14} /> {t("start_date")}
                        </p>
                        <p className="font-semibold text-foreground">
                          {new Date(startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                    {endDate && (
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar size={14} /> {t("end_date")}
                        </p>
                        <p className="font-semibold text-foreground">
                          {new Date(endDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                  {price && (
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <DollarSign size={14} /> {t("price_per_person")}
                      </p>
                      <p className="font-display font-bold text-coral text-lg">
                        ${price}
                      </p>
                    </div>
                  )}
                  <div className="pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      {t("number_of_travelers")}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            numberOfPeople: Math.max(
                              1,
                              formData.numberOfPeople - 1,
                            ),
                          })
                        }
                        className="w-8 h-8 rounded-md border border-border hover:bg-muted transition-colors text-sm font-semibold"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {formData.numberOfPeople}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            numberOfPeople: formData.numberOfPeople + 1,
                          })
                        }
                        className="w-8 h-8 rounded-md border border-border hover:bg-muted transition-colors text-sm font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {price && (
                    <div className="pt-3 border-t border-border bg-coral/5 -mx-6 px-6 py-3 rounded-b-xl">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t("total_price")}
                      </p>
                      <p className="font-display font-bold text-coral text-2xl">
                        ${totalPrice}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
                >
                  <motion.div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md mx-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="mb-6 flex justify-center"
                    >
                      <CheckCircle2 size={64} className="text-green-500" />
                    </motion.div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                      ✅ {t("booking_success")}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {t("booking_success_message")}
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      {t("check_email")}{" "}
                      {formData.contactMethod === "whatsapp"
                        ? t("whatsapp")
                        : t("telegram")}{" "}
                      {t("for_updates")}.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg space-y-6"
            >
              <div>
                <label className="block font-display text-sm font-semibold text-foreground mb-3">
                  {t("full_name")} <span className="text-coral">*</span>
                </label>
                <Input
                  type="text"
                  placeholder={t("full_name_placeholder")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`h-12 rounded-xl ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block font-display text-sm font-semibold text-foreground mb-3">
                  {t("phone_number")} <span className="text-coral">*</span>
                </label>
                <Input
                  type="tel"
                  placeholder={t("phone_placeholder")}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`h-12 rounded-xl ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block font-display text-sm font-semibold text-foreground mb-3">
                  {t("preferred_contact_method")}{" "}
                  <span className="text-coral">*</span>
                </label>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, contactMethod: "whatsapp" })
                    }
                    className={`px-4 py-2 rounded-lg font-body font-semibold transition-all ${
                      formData.contactMethod === "whatsapp"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-foreground hover:bg-gray-200"
                    }`}
                  >
                    {t("whatsapp")}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, contactMethod: "telegram" })
                    }
                    className={`px-4 py-2 rounded-lg font-body font-semibold transition-all ${
                      formData.contactMethod === "telegram"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-foreground hover:bg-gray-200"
                    }`}
                  >
                    {t("telegram")}
                  </button>
                </div>
                <Input
                  type="text"
                  placeholder={
                    formData.contactMethod === "whatsapp"
                      ? t("whatsapp_number")
                      : t("telegram_username")
                  }
                  value={formData.whatsappTelegram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsappTelegram: e.target.value,
                    })
                  }
                  className={`h-12 rounded-xl ${
                    errors.whatsappTelegram ? "border-red-500" : ""
                  }`}
                />
                {errors.whatsappTelegram && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.whatsappTelegram}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-display text-sm font-semibold text-foreground mb-3">
                  {t("number_of_travelers")}{" "}
                  <span className="text-coral">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        numberOfPeople: Math.max(
                          1,
                          formData.numberOfPeople - 1,
                        ),
                      })
                    }
                    className="w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors text-lg font-semibold flex items-center justify-center"
                  >
                    −
                  </button>
                  <Input
                    type="number"
                    min="1"
                    value={formData.numberOfPeople}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfPeople: Math.max(
                          1,
                          parseInt(e.target.value) || 1,
                        ),
                      })
                    }
                    className="h-10 text-center flex-1 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        numberOfPeople: formData.numberOfPeople + 1,
                      })
                    }
                    className="w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors text-lg font-semibold flex items-center justify-center"
                  >
                    +
                  </button>
                  {price && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {t("total_price")}
                      </p>
                      <p className="font-display font-bold text-coral">
                        ${totalPrice}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-display text-sm font-semibold text-foreground mb-3">
                  {t("email")}{" "}
                  <span className="text-gray-400 text-xs">
                    ({t("email_optional")})
                  </span>
                </label>
                <Input
                  type="email"
                  placeholder={t("email_placeholder")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-display text-sm font-semibold text-foreground mb-3">
                  {t("special_requests")}{" "}
                  <span className="text-gray-400 text-xs">
                    ({t("email_optional")})
                  </span>
                </label>
                <Textarea
                  placeholder={t("special_requests_placeholder")}
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className="rounded-xl min-h-24 resize-none"
                />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="gradient"
                    size="lg"
                    disabled={isLoading}
                    className="w-full md:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t("submit_button")}
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>{t("privacy_agreement_title")}</DialogTitle>
                    <DialogDescription>
                      {t("privacy_agreement_description")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                        className="w-5 h-5 rounded border border-border cursor-pointer"
                      />
                      <span className="text-sm text-muted-foreground">
                        {t("privacy_agreement_checkbox")}
                      </span>
                    </label>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">{t("cancel")}</Button>
                    </DialogClose>
                    <Button
                      type="button"
                      disabled={!confirmed || isLoading}
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!validateForm()) {
                          toast({
                            title: t("validation_error"),
                            description: t("validation_message"),
                            variant: "destructive",
                          });
                          return;
                        }
                        setIsLoading(true);
                        try {
                          const bookingsCollection = collection(db, "bookings");
                          await addDoc(bookingsCollection, {
                            tourId: tourId || null,
                            tourName: tourName || null,
                            startDate: startDate || null,
                            endDate: endDate || null,
                            userId: userId || null,
                            pricePerPerson: price || null,
                            numberOfPeople: formData.numberOfPeople,
                            totalPrice: parseFloat(
                              totalPrice.replace(/,/g, ""),
                            ),
                            name: formData.name,
                            phone: formData.phone,
                            contactMethod: formData.contactMethod,
                            whatsappTelegram: formData.whatsappTelegram,
                            email: formData.email,
                            comment: formData.comment,
                            createdAt: serverTimestamp(),
                            status: "pending",
                          });
                          await sendTelegramNotification(formData);
                          setIsSubmitted(true);
                          setFormData({
                            name: "",
                            phone: "",
                            contactMethod: "whatsapp",
                            whatsappTelegram: "",
                            email: "",
                            comment: "",
                            numberOfPeople: 1,
                          });
                          setConfirmed(false);
                          toast({
                            title: t("booking_success"),
                            description: t("booking_submitted"),
                          });
                          // Close the dialog and redirect after 2 seconds
                          setTimeout(() => {
                            setIsSubmitted(false);
                            router.push("/trips");
                          }, 2000);
                        } catch (error) {
                          console.error("Booking error:", error);
                          toast({
                            title: t("booking_error"),
                            description: t("booking_error_message"),
                            variant: "destructive",
                          });
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin mr-2" />
                          {t("sending")}
                        </>
                      ) : (
                        t("accept")
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <p className="text-sm text-muted-foreground">
                {t("contact_info")}
              </p>
            </motion.form>
          </div>

          {/* Right-side tour card (visible on lg+) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              {tourData && (
                <>
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={
                        Array.isArray(tourData.images) && tourData.images.length
                          ? tourData.images[0]
                          : "/placeholder-tour.jpg"
                      }
                      alt={tourName || tourData.title || "Tour image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">
                      {tourName ||
                        tLocalized(tourData.title, locale) ||
                        tLocalized(tourData.name, locale)}
                    </h3>
                    {tourData.location && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {typeof tourData.location === "string"
                          ? tourData.location
                          : Array.isArray(tourData.location)
                            ? (tourData.location as string[])
                                .slice(0, 2)
                                .join(", ")
                            : ""}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-bold text-coral">
                          ${price || tourData.price || "—"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          Duration
                        </p>
                        <p className="font-medium">
                          {(tourData.duration &&
                            `${tourData.duration.days}d ${tourData.duration.nights}n`) ||
                            "—"}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                      {tLocalized(tourData.description, locale)}
                    </p>

                    <div className="mt-4">
                      <a
                        href={`/trips/${tourId}`}
                        className="text-sm text-foreground underline"
                      >
                        {t("view_full_tour")}
                      </a>
                    </div>
                  </div>
                </>
              )}
              {!tourData && (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  {t("no_tour_selected")}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
