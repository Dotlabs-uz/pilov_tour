"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Subscribe from "@/components/custom/Subcribe";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { LocalizedString } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations, useLocale } from "next-intl";
import {
  Settings,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Heart,
  LogOut,
  Edit,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface DatabaseUser {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt?: any;
}

export interface Booking {
  id: string;
  tourId: string;
  tourName?: string;
  tourImage?: string;
  startDate: any;
  endDate: any;
  price: string;
  status: "pending" | "confirmed" | "cancelled";
  participants: number;
  createdAt: any;
}

type Lang = keyof LocalizedString;

function getLocalizedString(
  value: string | LocalizedString | null | undefined,
  locale: string,
): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  const localized = value as LocalizedString;
  return (
    localized[locale as Lang] ||
    localized.en ||
    localized.ru ||
    localized.uz ||
    Object.values(localized).find((v) => typeof v === "string" && v.trim()) ||
    ""
  );
}

const countries = [
  {
    code: "UZ",
    name: "Uzbekistan",
    dialCode: "+998",
    mask: "+998 (##) ###-##-##",
  },
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    mask: "+1 (###) ###-####",
  },
  { code: "CA", name: "Canada", dialCode: "+1", mask: "+1 (###) ###-####" },
  { code: "RU", name: "Russia", dialCode: "+7", mask: "+7 (###) ###-##-##" },
  {
    code: "KZ",
    name: "Kazakhstan",
    dialCode: "+7",
    mask: "+7 (###) ###-##-##",
  },
  {
    code: "TJ",
    name: "Tajikistan",
    dialCode: "+992",
    mask: "+992 (##) ###-##-##",
  },
  {
    code: "KG",
    name: "Kyrgyzstan",
    dialCode: "+996",
    mask: "+996 (###) ###-###",
  },
  {
    code: "TM",
    name: "Turkmenistan",
    dialCode: "+993",
    mask: "+993 (##) ##-##-##",
  },
  {
    code: "AF",
    name: "Afghanistan",
    dialCode: "+93",
    mask: "+93 (###) ###-###",
  },
  { code: "TR", name: "Turkey", dialCode: "+90", mask: "+90 (###) ###-##-##" },
  { code: "IR", name: "Iran", dialCode: "+98", mask: "+98 (###) ###-####" },
  { code: "PK", name: "Pakistan", dialCode: "+92", mask: "+92 (###) #######" },
  { code: "IN", name: "India", dialCode: "+91", mask: "+91 (####) #######" },
  { code: "CN", name: "China", dialCode: "+86", mask: "+86 (###) ####-####" },
  { code: "JP", name: "Japan", dialCode: "+81", mask: "+81 (##) ####-####" },
  {
    code: "KR",
    name: "South Korea",
    dialCode: "+82",
    mask: "+82 (##) ####-####",
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    mask: "+44 (####) ######",
  },
  { code: "DE", name: "Germany", dialCode: "+49", mask: "+49 (###) #######" },
  { code: "FR", name: "France", dialCode: "+33", mask: "+33 (##) ## ## ## ##" },
  { code: "IT", name: "Italy", dialCode: "+39", mask: "+39 (###) ###-####" },
  { code: "ES", name: "Spain", dialCode: "+34", mask: "+34 (###) ###-###" },
  {
    code: "NL",
    name: "Netherlands",
    dialCode: "+31",
    mask: "+31 (##) ####-####",
  },
  { code: "BE", name: "Belgium", dialCode: "+32", mask: "+32 (###) ###-###" },
  {
    code: "CH",
    name: "Switzerland",
    dialCode: "+41",
    mask: "+41 (##) ###-##-##",
  },
  { code: "AT", name: "Austria", dialCode: "+43", mask: "+43 (###) #######" },
  { code: "SE", name: "Sweden", dialCode: "+46", mask: "+46 (##) ###-##-##" },
  { code: "NO", name: "Norway", dialCode: "+47", mask: "+47 (###) ## ###" },
  { code: "DK", name: "Denmark", dialCode: "+45", mask: "+45 (##) ## ## ##" },
  { code: "FI", name: "Finland", dialCode: "+358", mask: "+358 (##) ###-####" },
  { code: "PL", name: "Poland", dialCode: "+48", mask: "+48 (###) ###-###" },
  {
    code: "CZ",
    name: "Czech Republic",
    dialCode: "+420",
    mask: "+420 (###) ###-###",
  },
  { code: "GR", name: "Greece", dialCode: "+30", mask: "+30 (###) ###-####" },
  {
    code: "PT",
    name: "Portugal",
    dialCode: "+351",
    mask: "+351 (###) ###-###",
  },
  { code: "IE", name: "Ireland", dialCode: "+353", mask: "+353 (##) ###-####" },
  {
    code: "AU",
    name: "Australia",
    dialCode: "+61",
    mask: "+61 (##) ####-####",
  },
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "+64",
    mask: "+64 (##) ###-####",
  },
  {
    code: "ZA",
    name: "South Africa",
    dialCode: "+27",
    mask: "+27 (##) ###-####",
  },
  { code: "EG", name: "Egypt", dialCode: "+20", mask: "+20 (###) ###-####" },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    mask: "+966 (##) ###-####",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    mask: "+971 (##) ###-####",
  },
  { code: "IL", name: "Israel", dialCode: "+972", mask: "+972 (##) ###-####" },
  { code: "BR", name: "Brazil", dialCode: "+55", mask: "+55 (##) #####-####" },
  { code: "MX", name: "Mexico", dialCode: "+52", mask: "+52 (###) ###-####" },
  {
    code: "AR",
    name: "Argentina",
    dialCode: "+54",
    mask: "+54 (##) ####-####",
  },
  { code: "CL", name: "Chile", dialCode: "+56", mask: "+56 (##) ####-####" },
  { code: "CO", name: "Colombia", dialCode: "+57", mask: "+57 (###) ###-####" },
  { code: "PE", name: "Peru", dialCode: "+51", mask: "+51 (###) ###-###" },
  {
    code: "VE",
    name: "Venezuela",
    dialCode: "+58",
    mask: "+58 (###) ###-####",
  },
  {
    code: "ID",
    name: "Indonesia",
    dialCode: "+62",
    mask: "+62 (###) ###-####",
  },
  { code: "MY", name: "Malaysia", dialCode: "+60", mask: "+60 (##) ###-####" },
  { code: "SG", name: "Singapore", dialCode: "+65", mask: "+65 (####) ####" },
  { code: "TH", name: "Thailand", dialCode: "+66", mask: "+66 (##) ###-####" },
  { code: "VN", name: "Vietnam", dialCode: "+84", mask: "+84 (##) ####-####" },
  {
    code: "PH",
    name: "Philippines",
    dialCode: "+63",
    mask: "+63 (###) ###-####",
  },
  {
    code: "BD",
    name: "Bangladesh",
    dialCode: "+880",
    mask: "+880 (####) ###-###",
  },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", mask: "+94 (##) ###-####" },
  { code: "MM", name: "Myanmar", dialCode: "+95", mask: "+95 (##) ###-####" },
  { code: "KH", name: "Cambodia", dialCode: "+855", mask: "+855 (##) ###-###" },
  { code: "LA", name: "Laos", dialCode: "+856", mask: "+856 (##) ##-###-###" },
  { code: "MN", name: "Mongolia", dialCode: "+976", mask: "+976 (####) ####" },
  { code: "NP", name: "Nepal", dialCode: "+977", mask: "+977 (##) ###-####" },
  { code: "BT", name: "Bhutan", dialCode: "+975", mask: "+975 (#) ###-###" },
  { code: "MV", name: "Maldives", dialCode: "+960", mask: "+960 (###) ####" },
  {
    code: "UA",
    name: "Ukraine",
    dialCode: "+380",
    mask: "+380 (##) ###-##-##",
  },
  {
    code: "BY",
    name: "Belarus",
    dialCode: "+375",
    mask: "+375 (##) ###-##-##",
  },
  { code: "RO", name: "Romania", dialCode: "+40", mask: "+40 (###) ###-###" },
  { code: "HU", name: "Hungary", dialCode: "+36", mask: "+36 (##) ###-####" },
  {
    code: "BG",
    name: "Bulgaria",
    dialCode: "+359",
    mask: "+359 (###) ###-###",
  },
  { code: "RS", name: "Serbia", dialCode: "+381", mask: "+381 (##) ###-####" },
  { code: "HR", name: "Croatia", dialCode: "+385", mask: "+385 (##) ###-####" },
  { code: "SI", name: "Slovenia", dialCode: "+386", mask: "+386 (##) ###-###" },
  {
    code: "SK",
    name: "Slovakia",
    dialCode: "+421",
    mask: "+421 (###) ###-###",
  },
  { code: "LT", name: "Lithuania", dialCode: "+370", mask: "+370 (###) #####" },
  { code: "LV", name: "Latvia", dialCode: "+371", mask: "+371 (##) ###-###" },
  { code: "EE", name: "Estonia", dialCode: "+372", mask: "+372 (####) ####" },
  { code: "IS", name: "Iceland", dialCode: "+354", mask: "+354 (###) ####" },
  {
    code: "LU",
    name: "Luxembourg",
    dialCode: "+352",
    mask: "+352 (###) ###-###",
  },
  { code: "MT", name: "Malta", dialCode: "+356", mask: "+356 (####) ####" },
  { code: "CY", name: "Cyprus", dialCode: "+357", mask: "+357 (##) ###-###" },
].sort((a, b) => a.name.localeCompare(b.name));

function formatPhoneNumber(value: string, mask: string): string {
  const numbers = value.replace(/\D/g, "");
  const dialCodeMatch = mask.match(/^\+?\d+/);
  const dialCode = dialCodeMatch ? dialCodeMatch[0] : "";

  let phoneDigits = numbers;
  if (dialCode && numbers.startsWith(dialCode.replace(/\D/g, ""))) {
    phoneDigits = numbers.substring(dialCode.replace(/\D/g, "").length);
  }

  let formatted = mask;
  let digitIndex = 0;

  for (
    let i = 0;
    i < formatted.length && digitIndex < phoneDigits.length;
    i++
  ) {
    if (formatted[i] === "#") {
      formatted =
        formatted.substring(0, i) +
        phoneDigits[digitIndex] +
        formatted.substring(i + 1);
      digitIndex++;
    }
  }

  formatted = formatted.replace(/#/g, "");

  formatted = formatted.replace(/[()\s-]+$/, "");

  return formatted;
}

const Profile = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [likedTours, setLikedTours] = useState<any[]>([]);
  const [likedToursLoading, setLikedToursLoading] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "UZ",
  });
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchOrCreateUser(firebaseUser);
        await fetchBookings(firebaseUser.uid);
        await fetchLikedTours(firebaseUser.uid);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchBookings = async (userId: string) => {
    setBookingsLoading(true);
    try {
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", userId),
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);

      const bookingsData: Booking[] = [];
      for (const bookingDoc of bookingsSnapshot.docs) {
        const bookingData = bookingDoc.data();

        // Fetch tour details if tourId exists
        let tourName = bookingData.tourName || "Unknown Tour";
        let tourImage = bookingData.tourImage || "/placeholder.svg";

        if (bookingData.tourId) {
          try {
            const tourRef = doc(db, "tours", bookingData.tourId);
            const tourSnap = await getDoc(tourRef);
            if (tourSnap.exists()) {
              const tourData = tourSnap.data();
              tourName = tourData.name?.en || tourData.title?.en || tourName;
              tourImage = tourData.images?.[0] || tourImage;
            }
          } catch (error) {
            console.error("Error fetching tour details:", error);
          }
        }

        bookingsData.push({
          id: bookingDoc.id,
          tourId: bookingData.tourId || "",
          tourName,
          tourImage,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          price: bookingData.price || "0",
          status: bookingData.status || "pending",
          participants: bookingData.participants || 1,
          createdAt: bookingData.createdAt,
        });
      }

      // Sort by creation date (newest first)
      bookingsData.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return bTime - aTime;
      });

      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  };

  const fetchLikedTours = async (userId: string) => {
    setLikedToursLoading(true);
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const likedTourIds = userData.likedTours || [];

        if (likedTourIds.length > 0) {
          const toursData = [];
          for (const tourId of likedTourIds) {
            try {
              const tourRef = doc(db, "tours", tourId);
              const tourSnap = await getDoc(tourRef);
              if (tourSnap.exists()) {
                toursData.push({
                  id: tourSnap.id,
                  ...tourSnap.data(),
                });
              }
            } catch (error) {
              console.error("Error fetching tour:", error);
            }
          }
          setLikedTours(toursData);
        } else {
          setLikedTours([]);
        }
      } else {
        setLikedTours([]);
      }
    } catch (error) {
      console.error("Error fetching liked tours:", error);
      setLikedTours([]);
    } finally {
      setLikedToursLoading(false);
    }
  };

  const fetchOrCreateUser = async (firebaseUser: FirebaseUser) => {
    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        const newUser: DatabaseUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          phone: firebaseUser.phoneNumber || "",
          avatar: firebaseUser.photoURL || "/avatar-default.svg",
          createdAt: serverTimestamp(),
        };
        await setDoc(userRef, newUser);
        setDbUser(newUser);
      } else {
        setDbUser(docSnap.data() as DatabaseUser);
      }
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  };

  const handleOpenEditDialog = () => {
    // Extract phone number and country from existing phone
    const currentPhone = dbUser?.phone || user?.phoneNumber || "";
    let phoneNumber = "";
    let countryCode = "UZ";

    if (currentPhone) {
      // Try to detect country from phone number
      const country = countries.find((c) =>
        currentPhone.startsWith(c.dialCode),
      );
      if (country) {
        countryCode = country.code;
        phoneNumber = currentPhone.replace(country.dialCode, "").trim();
      } else {
        phoneNumber = currentPhone;
      }
    }

    setEditForm({
      name: dbUser?.name || user?.displayName || "",
      email: dbUser?.email || user?.email || "",
      phone: phoneNumber,
      country: countryCode,
    });
    setEditDialogOpen(true);
  };

  const handleSaveSettings = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const selectedCountry = countries.find(
        (c) => c.code === editForm.country,
      );
      const fullPhone = selectedCountry
        ? `${selectedCountry.dialCode} ${editForm.phone.replace(/\D/g, "")}`
        : editForm.phone;

      const userRef = doc(db, "users", user.uid);
      const updateData: any = {
        name: editForm.name,
        phone: fullPhone,
        updatedAt: serverTimestamp(),
      };

      // Check if email changed
      const currentEmail = dbUser?.email || user?.email || "";
      if (editForm.email && editForm.email !== currentEmail) {
        // Email changed - send verification link to new email
        // Note: Firebase requires re-authentication to change email
        // For now, we'll store the new email and send a verification link
        // The user will need to verify the new email address
        try {
          // Store pending email in Firestore
          updateData.pendingEmail = editForm.email;
          updateData.emailChangeRequestedAt = serverTimestamp();

          // Send email verification to the new email
          // Note: This sends verification to current email, so we'll need a custom solution
          // For now, we'll just store the pending email and show a message
        } catch (emailError) {
          console.error("Error processing email change:", emailError);
          throw new Error("Failed to process email change request");
        }
      } else {
        // Update email in Firestore if it exists and hasn't changed
        if (editForm.email) {
          updateData.email = editForm.email;
        }
      }

      await updateDoc(userRef, updateData);

      // Update local state
      setDbUser({
        ...dbUser!,
        name: editForm.name,
        email: editForm.email || currentEmail,
        phone: fullPhone,
      });

      setEditDialogOpen(false);

      // Show success message
      if (editForm.email && editForm.email !== currentEmail) {
        alert(
          "Your email change request has been saved. A verification link will be sent to your new email address. Please check your inbox and verify the new email address.",
        );
      }
    } catch (error: any) {
      console.error("Error updating settings:", error);
      alert(error.message || "Failed to update settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user || !user.email) {
      alert("No email address found. Please contact support.");
      return;
    }

    setResetPasswordLoading(true);
    try {
      await sendPasswordResetEmail(auth, user.email, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false,
      });
      alert(
        "Password reset link has been sent to your email address. Please check your inbox.",
      );
    } catch (error: any) {
      console.error("Error sending password reset:", error);
      alert(
        error.message ||
          "Failed to send password reset email. Please try again.",
      );
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogoutDialogOpen(false);
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const logout = () => {
    setLogoutDialogOpen(true);
  };

  // Helper function to format date
  const formatDate = (date: any): string => {
    if (!date) return "N/A";

    try {
      if (date.toDate && typeof date.toDate === "function") {
        // Firestore Timestamp
        return date.toDate().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
      if (date instanceof Date) {
        // JavaScript Date
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
      if (typeof date === "string") {
        // String date
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
    }

    return "N/A";
  };

  const fields = [
    {
      label: t("profile.name"),
      value: dbUser?.name || user?.displayName || "—",
      icon: <FaUser className="text-gray-600" />,
    },
    {
      label: t("profile.email"),
      value: dbUser?.email || user?.email || "—",
      icon: <FaEnvelope className="text-gray-600" />,
    },
    {
      label: t("profile.phone"),
      value: dbUser?.phone || user?.phoneNumber || "—",
      icon: <FaPhone className="text-gray-600" />,
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        <div className="max-w-[1400px] mx-auto px-6 pt-20">
          <Skeleton className="w-full h-[200px] rounded-3xl mb-8" />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Skeleton */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white border border-border rounded-2xl p-2 shadow-sm">
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-full h-12 rounded-xl" />
                  <Skeleton className="w-full h-12 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 min-w-0">
              <Card className="p-6 rounded-2xl shadow-md">
                <CardContent className="flex flex-col gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-6 h-6 rounded" />
                        <div className="flex flex-col gap-2">
                          <Skeleton className="w-32 h-4" />
                          <Skeleton className="w-48 h-5" />
                        </div>
                      </div>
                      <Skeleton className="w-20 h-8 rounded-xl" />
                    </div>
                  ))}
                  <div className="flex justify-center mt-5">
                    <Skeleton className="w-[200px] h-[45px] rounded-xl" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mt-20 flex-col gap-10 min-h-screen">
      <div className="w-full max-w-[1400px] mx-auto px-6 pt-5 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-navy via-navy/90 to-coral/20 rounded-3xl shadow-lg overflow-hidden mb-8"
        >
          <div className="absolute inset-0 bg-[url('/profile-bg.png')] opacity-20 bg-cover bg-center" />
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  <Image
                    src={
                      dbUser?.avatar || user?.photoURL || "/avatar-default.svg"
                    }
                    alt="avatar"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  {dbUser?.name || user?.displayName || "Anonymous User"}
                </h2>
                <p className="text-white/80 font-body text-lg">
                  {dbUser?.email || user?.email}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 w-full">
          <Tabs defaultValue="settings" className="w-full">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-white border border-border rounded-2xl p-2 shadow-sm sticky top-24 flex flex-col">
                  <TabsList className="flex flex-col w-full h-auto bg-transparent p-0 gap-1 flex-1">
                    <TabsTrigger
                      value="settings"
                      className="flex items-center gap-3 justify-start w-full px-4 py-3 rounded-xl data-[state=active]:bg-coral data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                    >
                      <Settings size={18} />
                      {t("profile.settings_tab")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="bookings"
                      className="flex items-center gap-3 justify-start w-full px-4 py-3 rounded-xl data-[state=active]:bg-coral data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                    >
                      <Calendar size={18} />
                      {t("profile.bookings_tab")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="liked"
                      className="flex items-center gap-3 justify-start w-full px-4 py-3 rounded-xl data-[state=active]:bg-coral data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                    >
                      <Heart size={18} />
                      {t("profile.favorites_tab")}
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-auto pt-4 border-t border-border">
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="w-full h-[45px] flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      {t("profile.sign_out")}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <TabsContent value="settings">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-6 rounded-2xl shadow-md bg-white">
                      <CardContent className="flex flex-col gap-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-2xl font-bold text-foreground">
                            {t("profile.account_settings")}
                          </h3>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl w-10 h-10"
                            onClick={handleOpenEditDialog}
                          >
                            <Edit size={18} />
                          </Button>
                        </div>

                        {/* User Information Display */}
                        <div className="space-y-6">
                          {fields.map((field, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0"
                            >
                              <div className="mt-1">{field.icon}</div>
                              <div className="flex-1">
                                <p className="text-sm text-muted-foreground font-body mb-1">
                                  {field.label}
                                </p>
                                <p className="text-base font-semibold text-foreground">
                                  {field.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Reset Password Button */}
                        <div className="flex justify-center mt-6 pt-6 border-t border-border">
                          <Button
                            variant="outline"
                            onClick={handleResetPassword}
                            disabled={resetPasswordLoading}
                            className="w-full max-w-[300px] flex items-center gap-2"
                          >
                            {resetPasswordLoading
                              ? t("profile.sending")
                              : t("profile.reset_password")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="bookings">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {bookingsLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <Skeleton
                            key={i}
                            className="w-full h-32 rounded-2xl"
                          />
                        ))}
                      </div>
                    ) : bookings.length > 0 ? (
                      <div className="space-y-4">
                        {bookings.map((booking, index) => (
                          <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Card className="rounded-2xl shadow-md bg-white overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                  {/* Tour Image */}
                                  <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                                    <Image
                                      src={
                                        booking.tourImage || "/placeholder.svg"
                                      }
                                      alt={booking.tourName || "Tour"}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>

                                  {/* Booking Details */}
                                  <div className="flex-1 p-6">
                                    <div className="flex items-start justify-between mb-4">
                                      <div>
                                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                                          {booking.tourName || "Tour Booking"}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-2">
                                          <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                              booking.status === "confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : booking.status === "cancelled"
                                                  ? "bg-red-100 text-red-700"
                                                  : "bg-yellow-100 text-yellow-700"
                                            }`}
                                          >
                                            {booking.status
                                              .charAt(0)
                                              .toUpperCase() +
                                              booking.status.slice(1)}
                                          </span>
                                        </div>
                                      </div>
                                      {booking.tourId && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          asChild
                                        >
                                          <Link
                                            href={`/trips/${booking.tourId}`}
                                          >
                                            {t("profile.view_tour")}
                                          </Link>
                                        </Button>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar size={16} />
                                        <div>
                                          <p className="text-xs">
                                            {t("profile.start_date")}
                                          </p>
                                          <p className="text-sm font-semibold text-foreground">
                                            {formatDate(booking.startDate)}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users size={16} />
                                        <div>
                                          <p className="text-xs">
                                            {t("profile.participants")}
                                          </p>
                                          <p className="text-sm font-semibold text-foreground">
                                            {booking.participants}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 text-muted-foreground">
                                        <DollarSign size={16} />
                                        <div>
                                          <p className="text-xs">
                                            {t("profile.total_price")}
                                          </p>
                                          <p className="text-sm font-semibold text-foreground">
                                            ${booking.price}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <Card className="p-12 rounded-2xl shadow-md bg-white">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                          <Calendar
                            size={48}
                            className="text-muted-foreground mb-4"
                          />
                          <h3 className="font-display text-xl font-bold text-foreground mb-2">
                            {t("profile.no_bookings_title")}
                          </h3>
                          <p className="text-muted-foreground font-body mb-6">
                            {t("profile.no_bookings_desc")}
                          </p>
                          <Button asChild>
                            <Link href="/trips">
                              {t("profile.explore_tours")}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="liked">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {likedToursLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                          <Card key={i} className="rounded-2xl overflow-hidden">
                            <Skeleton className="w-full h-48" />
                            <CardContent className="p-4">
                              <Skeleton className="h-6 w-3/4 mb-2" />
                              <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : likedTours.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {likedTours.map((tour, index) => {
                          const name = getLocalizedString(tour.name, locale);
                          const title = getLocalizedString(tour.title, locale);
                          const images = tour.images || [];
                          const mainImage = images[0] || "/placeholder.svg";

                          return (
                            <motion.div
                              key={tour.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                                <Link href={`/trips/${tour.id}`}>
                                  <div className="relative h-48 w-full">
                                    <Image
                                      src={mainImage}
                                      alt={name || title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <CardContent className="p-4">
                                    <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2">
                                      {name || title}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                      <span className="font-display text-xl font-bold text-coral">
                                        ${tour.price || "0"}
                                      </span>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                      >
                                        <Link href={`/trips/${tour.id}`}>
                                          {t("profile.view_details")}
                                        </Link>
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Link>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <Card className="p-12 rounded-2xl shadow-md bg-white">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                          <Heart
                            size={48}
                            className="text-muted-foreground mb-4"
                          />
                          <h3 className="font-display text-xl font-bold text-foreground mb-2">
                            {t("profile.no_liked_tours_title")}
                          </h3>
                          <p className="text-muted-foreground font-body mb-6">
                            {t("profile.no_liked_tours_desc")}
                          </p>
                          <Button asChild>
                            <Link href="/trips">
                              {t("profile.explore_tours")}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("profile.confirm_logout")}</DialogTitle>
            <DialogDescription>
              {t("profile.confirm_logout_message")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
            >
              {t("profile.cancel")}
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              {t("profile.logout_button")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("profile.edit_profile_title")}</DialogTitle>
            <DialogDescription>
              {t("profile.edit_profile_description")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("profile.full_name")}</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("profile.email_address")}</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                placeholder="Enter your email"
              />
              <p className="text-xs text-muted-foreground">
                If you change your email, a verification link will be sent to
                the new address.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">{t("profile.country")}</Label>
              <Select
                value={editForm.country}
                onValueChange={(value) => {
                  const selectedCountry = countries.find(
                    (c) => c.code === value,
                  );
                  setEditForm({ ...editForm, country: value, phone: "" });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name} ({country.dialCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("profile.phone_number")}</Label>
              <Input
                id="phone"
                type="tel"
                value={editForm.phone}
                onChange={(e) => {
                  const selectedCountry = countries.find(
                    (c) => c.code === editForm.country,
                  );
                  const mask = selectedCountry?.mask || "+998 (##) ###-##-##";
                  const formatted = formatPhoneNumber(e.target.value, mask);
                  setEditForm({ ...editForm, phone: formatted });
                }}
                placeholder={
                  countries.find((c) => c.code === editForm.country)?.mask ||
                  "+998 (93) 506-70-98"
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {t("profile.cancel")}
            </Button>
            <Button onClick={handleSaveSettings} disabled={saving}>
              {saving ? t("profile.sending") : t("profile.save_changes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
