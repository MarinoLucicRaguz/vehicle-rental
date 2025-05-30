"use server";
import { cookies } from "next/headers";

export async function getServerToken() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  return token;
}
