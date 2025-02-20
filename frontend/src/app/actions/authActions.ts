"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const login = async (prevState: any, formData: FormData) => {
  const cookieStore = await cookies();
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  };

  try {
    const req = await fetch(`${process.env.API}/api/auth/login`, reqOptions);
    const response = await req.json();

    cookieStore.set("token", response.token, {
      httpOnly: true, // More secure, prevents JS access
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    });

    return NextResponse.redirect(
      new URL("/home", process.env.NEXT_PUBLIC_BASE_URL)
    );
  } catch (error: any) {
    return { message: error.message || "Network error" };
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return NextResponse.redirect("/login");
};
