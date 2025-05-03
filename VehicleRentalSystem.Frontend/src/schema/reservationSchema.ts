import { z } from "zod";

export const reservationSchema = z.object({
  bookingNumber: z.string(),
  reservationDate: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  totalPrice: z.number(),
  discount: z.number(),
  payed: z.boolean(),
  paymentMethod: z.string(),
  reservationStatus: z.string(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  notes: z.string(),
  userId: z.coerce.number().int(),
  rentalTypeId: z.coerce.number().int(),
  locationId: z.coerce.number().int(),
  vehicleIds: z.array(z.number()),
});

export type ReservationInput = z.infer<typeof reservationSchema>;    