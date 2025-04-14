export interface Vehicle {
  Id: number;
  VehicleType: string;
  Make: string;
  Model: string;
  Registration: string;
  Year: number;
  PeopleCapacity: number | null;
  FuelCapacity: number | null;
  FuelConsumption: number | null;
  Description: number | null;
  Status: boolean;
}
