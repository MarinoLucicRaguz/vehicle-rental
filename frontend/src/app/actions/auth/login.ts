"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authService } from "@/services/authService";
import { loginSchema } from "@/schema/authSchemas";
import { LoginDTO } from "@/types/authtype";

export async function loginAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const parseResult = loginSchema.safeParse(data);
  if (!parseResult.success) {
    return { errors: parseResult.error.flatten().fieldErrors };
  }

  const { username, password } = parseResult.data;

  try {
    const { token } = await authService.login({
      username: username,
      password: password,
    });
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60,
    });
    return NextResponse.redirect("/home");
  } catch (error: any) {
    return { error: error.message || "An error occurred during login." };
  }
}
