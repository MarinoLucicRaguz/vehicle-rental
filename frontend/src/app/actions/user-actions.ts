"use server";

import { cookies } from "next/headers";

//enableat NODE_TLS_REJECT_UNAUTHORIZED=0
//  u produkciji

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

    cookieStore.set("token", response.token);

    return { message: "Logged in successfully" };
  } catch (error: any) {
    return { message: error.message || "Network error" };
  }
};
