"use server";

import { RentalTypeInput, rentalTypeSchema } from "@/schema/rentalTypeSchema";
import { rentalTypeService } from "@/services/rentalTypeService";

export async function addRentalTypeAction(data: RentalTypeInput) {
  console.log("test");
  const parseResult = rentalTypeSchema.safeParse(data);
  if (!parseResult.success) {
    return { success: false, errors: parseResult.error.flatten().fieldErrors };
  }
  try {
    const result = await rentalTypeService.create(parseResult.data);
    if (!result.success) {
      return { success: false, error: result.message || "Nepoznata pogreška prilikom dodavanja tipa najma." };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Nepoznata pogreška prilikom dodavanja  tipa najma." };
  }
}
