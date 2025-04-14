"use server";

import { cookies } from "next/headers";
import { authService } from "@/services/authService";
import { loginSchema } from "@/schema/authSchemas";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const parseResult = loginSchema.safeParse(data);
  if (!parseResult.success) {
    return { errors: parseResult.error.flatten().fieldErrors };
  }

  const { username, password } = parseResult.data;
  let loginSuccess = false;
  try {
    const response = await authService.login({ username, password });
    if (!response.success) {
      return { error: response.message || "Login failed." };
    }
    const token = response.data;
    if (token) {
      const cookieStore = await cookies();
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60,
      });
      loginSuccess = true;
    } else {
      throw new Error("An error occurred during login.");
    }
  } catch (error: any) {
    return { error: error.message || "An error occurred during login." };
  } finally {
    if (loginSuccess) redirect("/");
  }
}
