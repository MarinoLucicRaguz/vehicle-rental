"use server";

import { reservationService } from "@/services/reservationService";
import { Reservation } from "@/types/ReservationTypes";
import { ServiceResponse } from "@/types/ServiceResponse";

export async function getAllReservations(): Promise<ServiceResponse<Reservation[]>> {
  try {
    const response = await reservationService.getAll();
    return response;
  } catch (error) {
    return { success: false, message: "Dogodila se pogreška. Molimo vas osvježite stranicu.", statusCode: 500, data: [] };
  }
}
