"use server";

import { LocationInput, locationSchema } from "@/schema/locationSchema";
import { locationService } from "@/services/locationService";

export async function addLocationAction(data: LocationInput) {
  const parseResult = locationSchema.safeParse(data);
  if (!parseResult.success) {
    return { success: false, errors: parseResult.error.flatten().fieldErrors };
  }
  try {
    const result = await locationService.create(parseResult.data);
    if (!result.success) {
      return { success: false, error: result.message || "Nepoznata pogreška prilikom dodavanja lokacije." };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Nepoznata pogreška prilikom dodavanja lokacije." };
  }
}
