import { getAllLocations } from "@/app/actions/location/getLocations";
import { getAllRentalTypes } from "@/app/actions/rentalType/getRentalTypes";
import { getAllVehicles } from "@/app/actions/vehicle/getVehicles";
import { ReservationAddForm } from "@/components/reservations/ReservationAddForm";

export default async function Page() {
  const [locData, vecData, rentalTypeData, paymentMethods, reservationStatuses] = await Promise.all([getAllLocations(), getAllVehicles(), getAllRentalTypes(), getPayment]);
  return (
    <div className="w-full max-w-lg ml-auto mr-auto mt-5">
      <ReservationAddForm locations={locData.data || []} vehicles={vecData.data || []} rentalTypes={rentalTypeData.data || []} />
    </div>
  );
}
