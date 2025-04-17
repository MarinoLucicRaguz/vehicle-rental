import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().nonempty("Naziv je obavezan"),
  address: z.string().nonempty("Adresa je obavezna"),
  city: z.string().nonempty("Grad je obavezan"),
  state: z.string().nonempty("Regija je obavezna"),
  zipCode: z.string().nonempty("Poštanski broj je obavezan"),
  country: z.string().nonempty("Država je obavezna"),
  phoneNumber: z.string().optional(),
});

export type LocationInput = z.infer<typeof locationSchema>;
