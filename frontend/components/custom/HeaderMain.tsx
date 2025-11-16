"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ID, Models, Query } from "appwrite";
import { account, appwriteConfig, database } from "@/app/(public)/appwrite";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export interface CustomUser extends Models.User<Models.Preferences> {
    avatar?: string;
}

export interface DatabaseUser {
    $id: string;
    name: string;
    email: string;
    avatar?: string;
    [key: string]: any;
}


export default function HeaderMain() {
    const t = useTranslations("Header");
    const router = useRouter();
    const [user, setUser] = useState<CustomUser | null>(null);
      const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await account.get();

                const existing = await database.listDocuments(
                    appwriteConfig.databaseId,
                    appwriteConfig.userCollectionId,
                    [Query.equal("email", currentUser.email)]
                );

                let userFromDb: DatabaseUser;

                if (existing.documents.length === 0) {
                    const newUser = (await database.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.userCollectionId,
                        ID.unique(),
                        {
                            email: currentUser.email,
                            name: currentUser.name || "",
                            avatar: currentUser.prefs?.oauth2?.avatar || "",
                        }
                    )) as unknown as DatabaseUser;

                    userFromDb = newUser;
                } else {
                    userFromDb = existing.documents[0] as unknown as DatabaseUser;
                }

                setDbUser(userFromDb);

                const combinedUser: CustomUser = {
                    ...currentUser,
                    avatar: userFromDb.avatar,
                };

                setUser(combinedUser);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
                setDbUser(null);
            }
        };

        fetchUser();
    }, [router]);

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

                <div>
                    <Image
                        src="/Pilav_BestSeller.png"
                        alt="Best Seller"
                        width={160}
                        height={50}
                        className="object-contain"
                    />
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    {user ? (
                        <div
                            onClick={() => router.push("/profile")}
                            className="cursor-pointer flex items-center gap-2"
                        >
                            <Avatar className="bg-white p-1">
                                <AvatarImage src={user.avatar || "/avatar-default.svg"} />
                                <AvatarFallback>
                                    {user.name?.[0]?.toUpperCase() ||
                                        user.email?.[0]?.toUpperCase() ||
                                        "CN"}
                                </AvatarFallback>
                            </Avatar>
                            <p className="text-lg">{user.name || user.email}</p>
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
