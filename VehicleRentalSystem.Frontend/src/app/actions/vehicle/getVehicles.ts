"use server";

import { vehicleService } from "@/services/vehicleService";
import { ServiceResponse } from "@/types/ServiceResponse";
import { Vehicle } from "@/types/VehicleTypes";

export async function getAllVehicles(): Promise<ServiceResponse<Vehicle[]>> {
  try {
    const response = await vehicleService.getAll();
    return response;
  } catch {
    return { success: false, message: "Dogodila se pogreška. Molimo vas osvježite stranicu.", statusCode: 500, data: [] };
  }
}
