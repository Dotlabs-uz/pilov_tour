"use client";

import HeaderforOther from "@/components/custom/Header-otherPages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IoMdCloudUpload } from "react-icons/io";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { account, appwriteConfig, database } from "../appwrite";
import { useEffect, useState } from "react";4
import { ID, Query } from "appwrite";
import { CustomUser, DatabaseUser } from "@/components/custom/Header";
import { useRouter } from "next/navigation";
import Subscribe from "@/components/custom/Subcribe";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<CustomUser | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);

  useEffect(() => {
    const fetchuser = async () => {
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
              email: currentUser.email || "",
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
      } catch (e) {
        console.log(e, "something went wrong");
        setUser(null);
        setDbUser(null);
      }
    };

    fetchuser();
  }, [router]);

  const fields = [
    {
      label: "Name",
      value: user?.name || user?.email,
      icon: <FaUser className="text-gray-600" />,
    },
    {
      label: "Email",
      value: user?.email,
      icon: <FaEnvelope className="text-gray-600" />,
    },
    {
      label: "Phone number",
      value: user?.phone,
      icon: <FaPhone className="text-gray-600" />,
    },
  ];

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
              src={user?.avatar || "/avatar-default.svg"}
              alt="avatar"
              className="rounded-full border-4 border-white w-28 h-28 shadow-md"
            />
            <h2 className="text-xl font-semibold mt-2">
              {user?.name || user?.email}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Subscribe/>
    </div>
  );
};

export default Profile;
