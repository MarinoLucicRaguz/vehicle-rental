import { get, post } from "@/lib/apiClient";
import { VehicleInput } from "@/schema/vehicleSchemas";
import { ServiceResponse } from "@/types/ServiceResponse";
import { Vehicles } from "@/types/VehicleTypes";

export const vehicleService = {
  async create(data: VehicleInput): Promise<{ success: boolean; message?: string }> {
    return await post<{ success: boolean; message?: string }>("/api/vehicles", data);
  },

  async getAll(): Promise<ServiceResponse<Vehicles[]>> {
    return await get<ServiceResponse<Vehicles[]>>("/api/vehicles");
  },
};
