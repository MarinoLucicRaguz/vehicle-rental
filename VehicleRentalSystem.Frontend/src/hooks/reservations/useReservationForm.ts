"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationInput, reservationSchema } from "@/schema/reservationSchema";
import { addReservationAction } from "@/app/actions/reservations/createReservation";

export function useReservationForm(onSuccess?: () => void) {
  const form = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      bookingNumber: undefined,
      reservationDate: undefined,
      startTime: undefined,
      endTime: undefined,
      discount: undefined,
      totalPrice: undefined,
      payed: false,
      paymentMethod: undefined,
      reservationStatus: undefined,
      contactName: undefined,
      contactPhone: undefined,
      contactEmail: undefined,
      notes:undefined,
      rentalTypeId: undefined,
      userId: undefined,
      locationId: undefined,
      vehicleIds: [],
    },
  });

  const { setError, reset } = form;
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ReservationInput> = async values => {
    setServerError(null);
    const result = await addReservationAction(values);
    if (result.success) {
      reset();
      if (onSuccess) onSuccess();
    } else {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field as keyof ReservationInput, {
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
