"use client";

import { useEffect, useState } from "react";
import { appwriteConfig, database, ID } from "../appwrite";

const Blogs = () => {
  const [blogs, setBlogs] = useState<any>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.blogCollectionId,
        );
        setBlogs(response as unknown);
      } catch (e) {
        console.log(e, "Something went wrong");
      }
    };
    fetchBlogs();
  }, []);

  console.log(blogs);

  return (
    <>
      <div></div>
    </>
  );
};

export default Blogs;
