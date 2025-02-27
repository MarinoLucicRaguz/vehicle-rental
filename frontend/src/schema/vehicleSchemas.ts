import { z } from "zod";

export const vehicleSchema = z.object({
  vehicleType: z.string().nonempty("Tip vozila je obavezan"),
  registration: z.string().nonempty("Registracija je obavezna"),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.preprocess(
    a => (typeof a === "string" && a.trim() !== "" ? Number(a) : a),
    z
      .number()
      .int("Godina mora biti cijeli broj.")
      .min(1886, "Godina mora biti nakon 1886.")
      .max(new Date().getFullYear() + 1, "Vozilo ne može biti previše u budućnosti.")
  ),
  personCapacity: z.preprocess(a => (typeof a === "string" && a.trim() !== "" ? Number(a) : a), z.number().optional()),
  fuelCapacity: z.preprocess(
    a => (typeof a === "string" && a.trim() !== "" ? Number(a) : a),
    z.number().nonnegative("Vozilo ne može imati negativan kapacitet goriva.").optional()
  ),
  fuelConsumption: z.preprocess(
    a => (typeof a === "string" && a.trim() !== "" ? Number(a) : a),
    z.number().nonnegative("Vozilo ne može imati negativnu potrošnju goriva.").optional()
  ),
  description: z.string().optional(),
  status: z.string().optional(),
  defaultLocationId: z.preprocess(a => (typeof a === "string" && a.trim() !== "" ? Number(a) : a), z.number().optional()),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;
