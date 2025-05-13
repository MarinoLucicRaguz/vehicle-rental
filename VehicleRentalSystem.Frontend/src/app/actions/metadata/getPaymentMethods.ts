"use server";

import { metadataService } from "@/services/metadataService";
import { EnumOptionsDTO } from "@/types/EnumTypes";
import { ServiceResponse } from "@/types/ServiceResponse";

export async function getPaymentMethods(): Promise<ServiceResponse<EnumOptionsDTO[]>> {
  try {
    const response = await metadataService.getPaymentMethods();
    return response;
  } catch (error) {
    return { success: false, message: "Dogodila se pogreška. Molimo vas osvježite stranicu.", statusCode: 500, data: [] };
  }
}
