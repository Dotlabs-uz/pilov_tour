"use client";

import HeaderforOther from "@/components/custom/Header-otherPages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IoMdCloudUpload } from "react-icons/io";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Subscribe from "@/components/custom/Subcribe";
import { auth, db } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export interface DatabaseUser {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  createdAt?: any;
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchOrCreateUser(firebaseUser);
      } else {
        router.push("/login");
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

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const fields = [
    {
      label: "Name",
      value: dbUser?.name || user?.displayName || "—",
      icon: <FaUser className="text-gray-600" />,
    },
    {
      label: "Email",
      value: dbUser?.email || user?.email || "—",
      icon: <FaEnvelope className="text-gray-600" />,
    },
    {
      label: "Phone number",
      value: dbUser?.phone || user?.phoneNumber || "—",
      icon: <FaPhone className="text-gray-600" />,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <HeaderforOther />

      <div className="max-w-[1200px] mx-auto">
        <div className="relative w-[1200px] h-[350px] bg-[url('/profile-bg.png')] rounded-lg shadow-md">
          <Button
            size="sm"
            className="absolute cursor-pointer bottom-4 right-4 w-[180px] h-[48px] bg-[#8DD3BB] text-black shadow-md hover:bg-gray-100"
          >
            <IoMdCloudUpload />
            Upload new cover
          </Button>

          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <img
              src={dbUser?.avatar || user?.photoURL || "/avatar-default.svg"}
              alt="avatar"
              className="rounded-full border-4 border-white w-28 h-28 shadow-md object-cover"
            />
            <h2 className="text-xl font-semibold mt-2">
              {dbUser?.name || user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-500 text-sm">
              {dbUser?.email || user?.email}
            </p>
          </div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto w-full">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6 rounded-2xl bg-gray-100 p-1">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="payment">Payment methods</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card className="p-6 rounded-2xl shadow-md">
                <CardContent className="flex flex-col gap-4">
                  {fields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <div className="flex items-center gap-3">
                        {field.icon}
                        <div>
                          <p className="text-sm text-gray-500">{field.label}</p>
                          <p className="text-base font-medium">{field.value}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                      >
                        Change
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="p-6 rounded-2xl shadow-md text-center">
                <p className="text-gray-500">No history available yet.</p>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card className="p-6 rounded-2xl shadow-md text-center">
                <p className="text-gray-500">No payment methods added.</p>
              </Card>

              <div className="flex justify-center mt-5">
                <Button
                  onClick={logout}
                  className="w-[200px] h-[45px] bg-red-500 text-white hover:bg-red-600"
                >
                  Sign out
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Subscribe />
    </div>
  );
};

export default Profile;
