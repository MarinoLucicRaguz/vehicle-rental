import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/schema/authSchemas";
import { loginAction } from "@/app/actions/auth/login";
import { useState } from "react";

export function useLoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      const result = await loginAction(formData);
      if (result && "error" in result && result.error) {
        setServerError(result.error);
      }
    } catch (error: any) {
      setServerError(error.message || "An unexpected error occurred");
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting, serverError };
}
