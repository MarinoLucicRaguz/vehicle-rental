import { z } from "zod";

export const reservationSchema = z.object({
  bookingNumber: z.string(),
  reservationDate: z.date({ message: "Odaberite datum rezervacije" }),
  startTime: z.date({ message: "Unesite početno vrijeme rezervacije" }),
  endTime: z.date({ message: "Odaberite ostale podatke" }),
  totalPrice: z.coerce.number().int(),
  discount: z.coerce.number().min(0, { message: "Minimalni popust je 0%" }).max(100, { message: "Maksimalni popust je 100%" }).int(),
  payed: z.boolean(),
  paymentMethod: z.coerce.number({ message: "Odaberite način plaćanja" }).int(),
  reservationStatus: z.coerce.number({ message: "Odaberite status rezervacije" }).int(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  notes: z.string().optional(),
  userId: z.coerce.number().int(),
  rentalTypeId: z.coerce.number({ message: "Odaberite tip najma" }).int(),
  locationId: z.coerce.number({ message: "Odaberite lokaciju najma" }).int(),
  locationName: z.string(),
  vehicleIds: z.array(z.number()).min(1, { message: "Odaberite barem jedno vozilo" }),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
