import { get } from "@/lib/apiClient";
import { ServiceResponse } from "@/types/ServiceResponse";
import { VehicleType } from "@/types/VehicleTypeTypes";

export const vehicleTypeService = {
  async getAll(): Promise<ServiceResponse<VehicleType[]>> {
    return await get<ServiceResponse<VehicleType[]>>("/api/vehicletype");
  },
};
