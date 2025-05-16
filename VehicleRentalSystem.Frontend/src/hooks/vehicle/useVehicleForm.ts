"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleInput, vehicleSchema } from "@/schema/vehicleSchema";
import { useState } from "react";
import { addVehicleAction } from "@/app/actions/vehicle/createVehicle";

export function useVehicleForm(onSuccess?: () => void) {
  const form = useForm<VehicleInput>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vehicleTypeId: undefined,
      registration: "",
      make: "",
      model: "",
      year: undefined,
      peopleCapacity: undefined,
      fuelCapacity: undefined,
      fuelConsumption: undefined,
      description: "",
      status: true,
      locationId: undefined,
    },
  });

  const { setError, reset } = form;
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<VehicleInput> = async values => {
    setServerError(null);
    const result = await addVehicleAction(values);
    if (result.success) {
      reset();
      if (onSuccess) onSuccess();
    } else {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field as keyof VehicleInput, {
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
