"use server";

import { VehicleInput, vehicleSchema } from "@/schema/vehicleSchema";
import { vehicleService } from "@/services/vehicleService";

export async function addVehicleAction(data: VehicleInput) {
  const parseResult = vehicleSchema.safeParse(data);
  if (!parseResult.success) {
    return { success: false, errors: parseResult.error.flatten().fieldErrors };
  }
  try {
    const result = await vehicleService.create(parseResult.data);
    if (!result.success) {
      return { success: false, error: result.message || "Nepoznata pogreška prilikom dodavanja vozila." };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Nepoznata pogreška prilikom dodavanja vozila." };
  }
}
