import { VehicleType } from "./VehicleTypeTypes";

export interface RentalType {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    durationUnit: string;
    isPerPerson: boolean;
    isActive: boolean;
    fuelIncluded: boolean;
    maxPassengers: number | null;
    availableVehicleType: VehicleType[] | [];
}