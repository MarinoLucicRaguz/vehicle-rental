import { Vehicle } from "./VehicleTypes";
import { VehicleType } from "./VehicleTypeTypes";

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string | null;
  vehicles: Vehicle[] | null;
  vehicleType: VehicleType[] | null;
}
