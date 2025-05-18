"use server";

import { locationService } from "@/services/locationService";
import { Location } from "@/types/LocationTypes";
import { ServiceResponse } from "@/types/ServiceResponse";

export async function getAllLocations(): Promise<ServiceResponse<Location[]>> {
  try {
    const response = await locationService.getAll();
    return response;
  } catch {
    return { success: false, message: "Dogodila se pogreška. Molimo vas osvježite stranicu.", statusCode: 500, data: [] };
  }
}
