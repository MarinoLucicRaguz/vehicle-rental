import { get, post } from "@/lib/apiClient";
import { LocationInput } from "@/schema/locationSchema";
import { Location } from "@/types/LocationTypes";
import { ServiceResponse } from "@/types/ServiceResponse";

export const locationService = {
  async create(data: LocationInput): Promise<ServiceResponse> {
    return await post<ServiceResponse>("/api/location", data);
  },

  async getAll(): Promise<ServiceResponse<Location[]>> {
    return await get<ServiceResponse<Location[]>>("/api/location");
  },
};
