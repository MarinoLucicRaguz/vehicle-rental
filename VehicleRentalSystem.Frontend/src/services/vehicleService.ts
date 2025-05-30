import { get, post } from "@/lib/apiClient";
import { VehicleInput } from "@/schema/vehicleSchema";
import { ServiceResponse } from "@/types/ServiceResponse";
import { Vehicle, VehicleAvailablePeriodDTO } from "@/types/VehicleTypes";

export const vehicleService = {
  async create(data: VehicleInput): Promise<ServiceResponse> {
    return await post<ServiceResponse>("/api/vehicle", data);
  },

  async getAll(): Promise<ServiceResponse<Vehicle[]>> {
    return await get<ServiceResponse<Vehicle[]>>("/api/vehicle");
  },

  async getAvailableInPeriod(period: VehicleAvailablePeriodDTO): Promise<ServiceResponse<Vehicle[]>> {
    const qs = new URLSearchParams({ startTime: period.startTime.toISOString(), endTime: period.endTime.toISOString() }).toString();
    return await get<ServiceResponse<Vehicle[]>>(`/api/vehicle/GetAvailableVehicleInPeriod?${qs}`);
  },
};
