import { get, post } from "@/lib/apiClient";
import { ReservationInput } from "@/schema/reservationSchema";
import { Reservation } from "@/types/ReservationTypes";
import { ServiceResponse } from "@/types/ServiceResponse";

export const reservationService = {
  async create(data: ReservationInput): Promise<ServiceResponse> {
    return await post<ServiceResponse>("/api/reservation", data);
  },

  async getAll(): Promise<ServiceResponse<Reservation[]>> {
    return await get<ServiceResponse<Reservation[]>>("/api/reservation");
  },
};
