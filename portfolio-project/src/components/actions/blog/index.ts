"use server";
import { Blog } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

//  get all posts
export const getAllBlog = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/blog`, {
      method: "GET",
      next: {
        tags: ["blog"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getMe = async () => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(`http://localhost:5000/api/v1/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["blog"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getSingleBlog = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/blog/${id}`, {
      method: "GET",
      next: {
        tags: ["blog"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// create post
export const createBlog = async (postData: any): Promise<Blog> => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(postData);

  try {
    const res = await fetch(`http://localhost:5000/api/v1/blog`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await res.json();
    revalidateTag("post");
    console.log(result);
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
// create post
export const UpdateBlog = async (postData: any, id: string): Promise<any> => {
  console.log(postData, id);
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(`http://localhost:5000/api/v1/blog/blogs/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await res.json();
    console.log(result);
    revalidateTag("post");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
export const deleteBlog = async (id: string) => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(`http://localhost:5000/api/v1/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
      next: {
        tags: ["blog"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
