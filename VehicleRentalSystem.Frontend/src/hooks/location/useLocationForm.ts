"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LocationInput, locationSchema } from "@/schema/locationSchema";
import { addLocationAction } from "@/app/actions/location/createLocation";

export function useLocationForm(onSuccess?: () => void) {
  const form = useForm<LocationInput>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
    },
  });

  const { setError, reset } = form;
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LocationInput> = async values => {
    setServerError(null);
    const result = await addLocationAction(values);
    if (result.success) {
      reset();
      if (onSuccess) onSuccess();
    } else {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field as keyof LocationInput, {
            type: "server",
            message: Array.isArray(messages) ? messages.join(", ") : messages,
          });
        });
      } else if (result.error) {
        setServerError(result.error);
      }
    }
  };

  return { form, onSubmit, serverError };
}
