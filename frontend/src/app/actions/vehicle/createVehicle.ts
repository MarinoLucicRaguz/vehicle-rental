"use server";

import { vehicleSchema } from "@/schema/vehicleSchemas";
import { vehicleService } from "@/services/vehicleService";

export async function addVehicleAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const parseResult = vehicleSchema.safeParse(data);
  if (!parseResult.success) {
    return { success: false, errors: parseResult.error.flatten().fieldErrors };
  }
  try {
    const result = await vehicleService.create(parseResult.data);
    if (!result.success) {
      return { success: false, error: result.message || "Failed to create vehicle." };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred during vehicle creation." };
  }
}
