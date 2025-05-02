import { getAllVehicleTypes } from "@/app/actions/vehicleType/getVehicleTypes";
import { RentalAddForm } from "@/components/rentalTypes/RentalTypeAddForm";
import { VehicleType } from "@/types/VehicleTypeTypes";

export default async function Page() {
  const resp = await getAllVehicleTypes();
  const vehicleTypes: VehicleType[] = Array.isArray(resp.data) ? resp.data : [];
  return (
    <div className="w-full max-w-sm ml-auto mr-auto">
      <RentalAddForm vehicleTypes={vehicleTypes} />
    </div>
  );
}
