// // lib/tourService.ts
// import { database, storage, ID } from "@/app/(public)/appwrite";
// import { appwriteConfig } from "@/app/(public)/appwrite";

// export interface TourData {
//   name: string;
//   description: string;
//   price: number;
//   location: string;
//   duration: string;
//   category: string;
//   included: string[];
//   notIncluded: string[];
// }

// export const createTour = async (tourData: TourData, imageFiles: File[]) => {
//   try {
//     // Загружаем изображения в Storage
//     const imageIds = await Promise.all(
//       imageFiles.map(async (file) => {
//         const response = await storage.createFile(
//           appwriteConfig.bucketId,
//           ID.unique(),
//           file
//         );
//         return response.$id;
//       })
//     );

//     // Создаем документ тура в базе данных
//     const document = await database.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.tourCollectionId!,
//       ID.unique(),
//       {
//         ...tourData,
//         images: imageIds,
//         createdAt: new Date().toISOString(),
//         isActive: true,
//         rating: 0,
//         reviewsCount: 0,
//       }
//     );

//     return document;
//   } catch (error) {
//     console.error("Error creating tour:", error);
//     throw error;
//   }
// };

// export const getImageUrl = (fileId: string): string => {
//   return storage.getFileView(appwriteConfig.bucketId, fileId);
// };

// export const getAllTours = async () => {
//   try {
//     const response = await database.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.tourCollectionId!
//     );
//     return response.documents;
//   } catch (error) {
//     console.error("Error fetching tours:", error);
//     throw error;
//   }
// };
