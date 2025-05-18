import { getAllLocations } from "@/app/actions/location/getLocations";
import { getAllVehicleTypes } from "@/app/actions/vehicleType/getVehicleTypes";
import { VehicleAddForm } from "@/components/vehicle/VehicleAddForm";

export default async function Page() {
  const locations = await getAllLocations();
  const vehicleTypes = await getAllVehicleTypes();
  return (
    <div className="w-full max-w-sm ml-auto mr-auto">
      <VehicleAddForm vehicleTypes={vehicleTypes.data || []} locations={locations.data || []} />;
    </div>
  );
}
