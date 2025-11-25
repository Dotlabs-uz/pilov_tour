"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/(public)/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface DatabaseUser {
    uid: string;
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    createdAt?: any;
}

export default function HeaderMain() {
    const t = useTranslations("Header");
    const router = useRouter();
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                await fetchOrCreateUser(firebaseUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

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

    return (
        <header className="w-full mx-auto bg-white shadow-sm">
            <div className="container mx-auto h-12 flex items-center justify-between">
                <p
                    onClick={() => router.push("/")}
                    className="text-2xl cursor-pointer flex font-bold text-[#8DD3BB] bg-[#C0C0C0] px-2 py-1 rounded-md"
                >
                    Pilav
                    <span className="text-white">
                        Tour <u>Agency</u>
                    </span>
                </p>

                {/* <div>
                    <Image
                        src="/Pilav_BestSeller.png"
                        alt="Best Seller"
                        width={160}
                        height={50}
                        className="object-contain"
                    />
                </div> */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div
                            onClick={() => router.push("/profile")}
                            className="cursor-pointer flex items-center gap-2"
                        >
                            <Avatar className="bg-white p-1">
                                <AvatarImage
                                    src={
                                        dbUser?.avatar || user?.photoURL || "/avatar-default.svg"
                                    }
                                />
                                <AvatarFallback>
                                    {user?.displayName || dbUser?.name}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-lg">{user?.displayName || dbUser?.name}</p>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">{t("login")}</Link>
                            <Button
                                onClick={() => router.push("/signup")}
                                className="w-[104px] h-[48px] hover:bg-gray-400 bg-white text-black rounded-lg cursor-pointer"
                            >
                                {t("signup")}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
