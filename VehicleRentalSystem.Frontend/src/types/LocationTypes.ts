import { Vehicle } from "./VehicleTypes";
import { VehicleType } from "./VehicleTypeTypes";

export interface Location {
  Id: number;
  Name: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  PhoneNumber: string | null;
  Vehicles: Vehicle[] | null;
  VehicleType: VehicleType[] | null;
}
