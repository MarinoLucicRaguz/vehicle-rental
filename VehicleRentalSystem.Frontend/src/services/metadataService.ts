import { get } from "@/lib/apiClient";
import { EnumOptionsDTO } from "@/types/EnumTypes";
import { ServiceResponse } from "@/types/ServiceResponse";

export const metadataService = {
  async getReservationStatuses(): Promise<ServiceResponse> {
    return await get<ServiceResponse<EnumOptionsDTO[]>>("/api/metadata/reservation-statuses");
  },

  async getPaymentMethods(): Promise<ServiceResponse<EnumOptionsDTO[]>> {
    return await get<ServiceResponse<EnumOptionsDTO[]>>("/api/metadata/payment-methods");
  },
};
