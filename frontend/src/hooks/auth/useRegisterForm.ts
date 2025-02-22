import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, registerSchema } from "@/schema/authSchemas";
import { useState } from "react";
import { registerAction } from "@/app/actions/auth/register";

export function useRegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      const result = await registerAction(formData);
      if (result && "error" in result && result.error) {
        setServerError(result.error);
      }
    } catch (error: any) {
      setServerError(error.message || "An unexpected error occurred");
    }
  };

  return { register, handleSubmit, onSubmit, errors, isSubmitting, serverError };
}
