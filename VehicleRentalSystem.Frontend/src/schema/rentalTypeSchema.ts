import { z } from "zod";

export const rentalTypeSchema = z.object({
  name: z.string().nonempty("Naziv je obavezan."),
  description: z.string().nonempty("Opis je obavezan."),
  price: z.number().nonnegative("Cijena je obavezna."),
  duration: z.number().nonnegative("Duljina trajanja je obavezna."),
  durationUnit: z.string(),
  isPerPerson: z.boolean(),
  isActive: z.boolean(),
  fuelIncluded: z.boolean(),
  maxPassengers: z.number().nullable(),
  availableVehicleTypeIds: z.array(z.number()),
});

export type RentalTypeInput = z.infer<typeof rentalTypeSchema>;
