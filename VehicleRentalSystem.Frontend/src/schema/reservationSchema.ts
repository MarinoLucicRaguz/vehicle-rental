import { z } from "zod";

export const reservationSchema = z.object({
  bookingNumber: z.string().nullable(),
  reservationDate: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  totalPrice: z.coerce.number().int(),
  discount: z.coerce.number().int(),
  payed: z.boolean(),
  paymentMethod: z.coerce.number().int(),
  reservationStatus: z.coerce.number().int(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  notes: z.string().optional(),
  userId: z.coerce.number().int(),
  rentalTypeId: z.coerce.number().int(),
  locationId: z.coerce.number().int(),
  vehicleIds: z.array(z.number()),
});

export type ReservationInput = z.infer<typeof reservationSchema>;    