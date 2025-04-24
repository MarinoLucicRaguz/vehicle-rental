"use server";

import { vehicleTypeService } from "@/services/vehicleTypeService";
import { ServiceResponse } from "@/types/ServiceResponse";
import { VehicleType } from "@/types/VehicleTypeTypes";

export async function getAllVehicleTypes(): Promise<ServiceResponse<VehicleType[]>> {
  try {
    const response = await vehicleTypeService.getAll();
    return response;
  } catch (error) {
    return { success: false, message: "Dogodila se pogreška. Molimo vas osvježite stranicu.", statusCode: 500, data: [] };
  }
}
