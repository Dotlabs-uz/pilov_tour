import { Client, Account, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY || "",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || "",
  tourCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TOURS_COLLECTION_ID || "",
  articleCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_ARTICLE_COLLECTION_ID || "",
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
  reviewCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID || "",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId); 

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { account, database, storage, client };
export { ID } from "appwrite";
