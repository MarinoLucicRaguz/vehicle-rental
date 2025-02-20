"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/app/actions/auth/login";
import { LoginInput, loginSchema } from "@/schema/authSchemas";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: LoginInput) => {
    setServerError("");
    // Create a FormData object from the validated data
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const result = await loginAction(formData);
    // Since loginAction may return either a redirect response or an error object,
    // we check if the result has an "error" or "message" property.
    if ("error" in result && result.error) {
      setServerError(result.error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <input
            {...register("username")}
            type="text"
            id="username"
            placeholder="Username"
            required
          />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}>
            Sign in
          </button>
        </div>
        {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      </form>
    </div>
  );
}
