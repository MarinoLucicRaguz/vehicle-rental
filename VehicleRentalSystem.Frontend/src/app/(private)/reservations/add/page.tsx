import { getAllLocations } from "@/app/actions/location/getLocations";
import { getPaymentMethods } from "@/app/actions/metadata/getPaymentMethods";
import { getReservationStatuses } from "@/app/actions/metadata/getReservationStatuses";
import { getAllRentalTypes } from "@/app/actions/rentalType/getRentalTypes";
import { ReservationAddForm } from "@/components/reservations/ReservationAddForm";

export default async function Page() {
  const [locData, rentalTypeData, paymentMethods, reservationStatuses] = await Promise.all([
    getAllLocations(),
    getAllRentalTypes(),
    getPaymentMethods(),
    getReservationStatuses(),
  ]);
  return (
    <div className="w-full max-w-lg ml-auto mr-auto mt-5">
      <ReservationAddForm
        locations={locData.data || []}
        rentalTypes={rentalTypeData.data || []}
        paymentOptions={paymentMethods.data || []}
        reservationStatuses={reservationStatuses.data || []}
      />
    </div>
  );
}
