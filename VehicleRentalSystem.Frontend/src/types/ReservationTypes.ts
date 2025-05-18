import { Location } from "./LocationTypes";
import { RentalType } from "./RentalTypeTypes";
import { Vehicle } from "./VehicleTypes";

export interface Reservation {
    id: number,
    bookingNumber: string,
    reservationDate: Date,
    startTime: Date,
    endTime: Date,
    totalPrice: number,
    deposit: number,
    discount: number | null,
    payed: boolean,
    paymentMethod: string, //enums
    reservationStatus: string, //enums
    contactName: string | null,
    contactPhone: string | null,
    contactEmail: string | null,
    notes: string,
    userId: number,
    // user: User
    rentalTypeId: number,
    rentalType: RentalType,
    vehicles: Vehicle[],
    locationId: number,
    location: Location
}