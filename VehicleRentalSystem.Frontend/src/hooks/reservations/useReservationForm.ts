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
      bookingNumber: "",
      reservationDate: undefined,
      startTime: undefined,
      endTime: undefined,
      discount: 0,
      totalPrice: 0,
      payed: false,
      paymentMethod: 0,
      reservationStatus: 0,
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      notes:"",
      rentalTypeId: undefined,
      userId: 1,
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
