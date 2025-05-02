"use server";

import { rentalTypeService } from "@/services/rentalTypeService";
import { RentalType } from "@/types/RentalTypeTypes";
import { ServiceResponse } from "@/types/ServiceResponse";

export async function getAllRentalTypes(): Promise<ServiceResponse<RentalType[]>> {
  try {
    const response = await rentalTypeService.getAll();
    return response;
  } catch (error) {
    return { success: false, message: "Dogodila se pogreška. Molimo vas osvježite stranicu.", statusCode: 500, data: [] };
  }
}
