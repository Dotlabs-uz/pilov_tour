"use client";

import { useEffect, useState } from "react";
import { appwriteConfig, database } from "../appwrite";

const Blogs = () => {
  const [articles, setArticles] = useState<any>("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.articleCollectionId
        );
        console.log({ response });

        setArticles(response as unknown);
      } catch (e) {
        console.log(e, "Something went wrong");
      }
    };
    fetchArticles();
  }, []);

  console.log(articles);

  return (
    <>
      <div></div>
    </>
  );
};

export default Blogs;
