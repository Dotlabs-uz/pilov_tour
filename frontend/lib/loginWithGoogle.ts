import { account, appwriteConfig, database } from "@/app/(public)/appwrite";
import { ID, OAuthProvider, Query, } from "appwrite";

export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/404`
    );

    const currentUser = await account.get();

    const existing = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("email", currentUser.email)]
    );

    if (existing.documents.length === 0) {
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          userId: currentUser.$id,
          email: currentUser.email,
          name: currentUser.name || "",
        }
      );
    }
  } catch (e) {
    console.error("OAuth login error:", e);
  }
};
