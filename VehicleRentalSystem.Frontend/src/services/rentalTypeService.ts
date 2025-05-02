import { get, post } from "@/lib/apiClient";
import { RentalTypeInput } from "@/schema/rentalTypeSchema";
import { RentalType } from "@/types/RentalTypeTypes";
import { ServiceResponse } from "@/types/ServiceResponse";

export const rentalTypeService = {
  async create(data: RentalTypeInput): Promise<ServiceResponse> {
    return await post<ServiceResponse>("/api/rentaltype", data);
  },

  async getAll(): Promise<ServiceResponse<RentalType[]>> {
    return await get<ServiceResponse<RentalType[]>>("/api/rentaltype");
  },
};
