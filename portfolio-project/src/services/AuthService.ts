"use server";
import { DashboardOverview, UserData } from "@/types";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const SignUpUser = async (userData: FieldValues) => {
  console.log(userData);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (userData: UserData) => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    // ✅ If success, save token to localStorage or cookies (client-side)
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const verifyUser = async (id: string) => {
  try {
    const res = await fetch(
      // `https://latest-food-backend.vercel.app/user/verify?order_id=${id}`,
      `${process.env.NEXT_PUBLIC_BASE_API}/user/verify?order_id=${id}`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["loginUser"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const dashbaordOverview = async (): Promise<DashboardOverview> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/admin/metadata`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["loginUser", "post", "category"],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    console.log(decodedData);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
  revalidateTag("loginUser");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/refreshToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("refreshToken")!.value
          }`,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
