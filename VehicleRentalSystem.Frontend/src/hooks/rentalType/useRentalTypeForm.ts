"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { RentalTypeInput, rentalTypeSchema } from "@/schema/rentalTypeSchema";
import { addRentalTypeAction } from "@/app/actions/rentalType/createRentalType";

export function useRentalTypeForm(onSuccess?: () => void) {
  const form = useForm<RentalTypeInput>({
    resolver: zodResolver(rentalTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      duration: undefined,
      durationUnit: "minutes",
      isPerPerson: false,
      isActive: true,
      fuelIncluded: true,
      maxPassengers: 0,
      availableVehicleTypeIds: [],
    },
  });

  const { setError, reset } = form;
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RentalTypeInput> = async values => {
    setServerError(null);
    const result = await addRentalTypeAction(values);
    if (result.success) {
      reset();
      if (onSuccess) onSuccess();
    } else {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field as keyof RentalTypeInput, {
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
