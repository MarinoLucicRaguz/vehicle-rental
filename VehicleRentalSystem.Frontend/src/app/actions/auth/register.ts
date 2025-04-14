"use server";

import { authService } from "@/services/authService";
import { registerSchema } from "@/schema/authSchemas";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const parseResult = registerSchema.safeParse(data);
  if (!parseResult.success) {
    return { errors: parseResult.error.flatten().fieldErrors };
  }

  const { username, password, confirmPassword } = parseResult.data;
  let registrationSuccess = false;

  try {
    const response = await authService.register({ username, password, confirmPassword });
    if (!response.success) {
      return { error: response.message || "Registration failed." };
    }
    registrationSuccess = true;
  } catch (error: any) {
    return { error: error.message || "An error occurred during login." };
  } finally {
    if (registrationSuccess) redirect("/login");
  }
}
