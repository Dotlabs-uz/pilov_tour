// import { ID, Models, OAuthProvider, Query } from "appwrite";
// import { account, database, appwriteConfig } from "@/app/(public)/appwrite";

// // lib/auth.ts
// export const fetchOrCreateUser =
//   async (): Promise<Models.User<Models.Preferences> | null> => {
//     try {
//       const currentUser = await account.get();

//       // Если пользователя ещё нет в коллекции, создаём
//       const existing = await database.listDocuments(
//         appwriteConfig.databaseId,
//         appwriteConfig.userCollectionId,
//         [Query.equal("email", currentUser.email)]
//       );

//       if (existing.documents.length === 0) {
//         await database.createDocument(
//           appwriteConfig.databaseId,
//           appwriteConfig.userCollectionId,
//           ID.unique(),
//           {
//             email: currentUser.email,
//             name: currentUser.name || "",
//             avatar: currentUser.prefs?.oauth2?.avatar || "",
//           }
//         );
//       }

//       return currentUser;
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       return null;
//     }
//   };

// const getGooglePicture = async (accessToken: string) => {
//   try {
//     const response = await fetch(
//       "https://people.googleapis.com/v1/people/me?personFields=photos",
//       { headers: { Authorization: `Bearer ${accessToken}` } }
//     );
//     if (!response.ok) throw new Error("Failed to fetch Google profile picture");

//     const { photos } = await response.json();
//     return photos?.[0]?.url || null;
//   } catch (error) {
//     console.error("Error fetching Google picture:", error);
//     return null;
//   }
// };

// export const storeUserData = async () => {
//   try {
//     const user = await account.get();
//     if (!user) throw new Error("User not found");

//     // Получаем текущую сессию, чтобы взять токен OAuth
//     const session = await account.getSession("current");
//     let avatar = "/default-avatar.png";

//     if (session?.providerAccessToken) {
//       const googleAvatar = await getGooglePicture(session.providerAccessToken);
//       if (googleAvatar) avatar = googleAvatar;
//     }

//     // Проверяем, есть ли юзер в коллекции
//     const existing = await database.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("email", user.email)]
//     );

//     if (existing.documents.length === 0) {
//       // Создаём новый документ пользователя в коллекции
//       await database.createDocument(
//         appwriteConfig.databaseId,
//         appwriteConfig.userCollectionId,
//         ID.unique(),
//         {
//           userId: user.$id,
//           email: user.email,
//           name: user.name || "",
//           avatar,
//         }
//       );
//     }
//   } catch (error) {
//     console.error("Error storing user data:", error);
//   }
// };

// export const loginWithGoogle = async () => {
//   try {
//     await account.createOAuth2Session(
//       OAuthProvider.Google,
//       `${window.location.origin}/`,
//       `${window.location.origin}/404`
//     );
//   } catch (error) {
//     console.error("Error during OAuth2 session creation:", error);
//   }
// };

// export const logoutUser = async () => {
//   try {
//     await account.deleteSession("current");
//   } catch (error) {
//     console.error("Error during logout:", error);
//   }
// };
