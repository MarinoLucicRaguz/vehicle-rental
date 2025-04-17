export interface Vehicle {
  id: number;
  vehicleType: string;
  make: string;
  model: string;
  registration: string;
  year: number;
  peopleCapacity: number | null;
  fuelCapacity: number | null;
  fuelConsumption: number | null;
  description: number | null;
  status: boolean;
}
