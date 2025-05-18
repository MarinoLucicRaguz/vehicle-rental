import { getAllVehicleTypes } from "@/app/actions/vehicleType/getVehicleTypes";
import { RentalAddForm } from "@/components/rentalTypes/RentalTypeAddForm";

export default async function Page() {
  const vehicleTypes = await getAllVehicleTypes();
  return (
    <div className="w-full max-w-sm ml-auto mr-auto">
      <RentalAddForm vehicleTypes={vehicleTypes.data || []} />
    </div>
  );
}
