"use server";

import { ReservationInput, reservationSchema } from "@/schema/reservationSchema";
import { reservationService } from "@/services/reservationService";

export async function addReservationAction(data: ReservationInput) {
  const parseResult = reservationSchema.safeParse(data);
  if (!parseResult.success) {
    return { success: false, errors: parseResult.error.flatten().fieldErrors };
  }
  try {
    const result = await reservationService.create(parseResult.data);
    if (!result.success) {
      return { success: false, error: result.message || "Nepoznata pogreška prilikom dodavanja rezervacije." };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Nepoznata pogreška prilikom dodavanja rezervacije." };
  }
}
