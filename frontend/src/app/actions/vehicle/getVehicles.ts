"use server";

import { vehicleService } from "@/services/vehicleService";
import { ServiceResponse } from "@/types/ServiceResponse";
import { Vehicles } from "@/types/VehicleTypes";

export async function getAllVehicles(): Promise<ServiceResponse<Vehicles[]>> {
  try {
    const response = await vehicleService.getAll();
    return response;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return {
      success: false,
      message: "Failed to fetch vehicles",
      data: [],
    };
  }
}
