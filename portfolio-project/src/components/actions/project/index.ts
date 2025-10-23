"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
const BASE_API = "http://localhost:5000/api/v1";

// 🟢 Get All
export async function getProjects() {
  const res = await fetch(`http://localhost:5000/api/v1/project`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

// 🟢 Create
export async function createProject(formData: any) {
  console.log(formData, "formData");

  try {
    const res = await fetch(`${BASE_API}/project`, {
      method: "POST",
      headers: {
        Authorization: `${(await cookies()).get("accessToken")?.value || ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("❌ Project creation failed:", data || res.statusText);
      throw new Error(
        data?.message || `Request failed with status ${res.status}`
      );
    }

    console.log("✅ Project created successfully:", data);
    revalidatePath("/dashboard/projects");
    return data;
  } catch (error) {
    console.error("🔥 createProject error:", error);
    throw error;
  }
}

// 🟢 Update
export async function updateProject(id: string, formData: any) {
  const res = await fetch(`${BASE_API}/project/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `${(await cookies()).get("accessToken")!.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to update project");
  revalidatePath("/dashboard/projects");
  return res.json();
}

// 🟢 Delete
export async function deleteProject(id: string) {
  const res = await fetch(`${BASE_API}/project/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${(await cookies()).get("accessToken")!.value}`,
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  revalidatePath("/dashboard/projects");
  return res.json();
}
