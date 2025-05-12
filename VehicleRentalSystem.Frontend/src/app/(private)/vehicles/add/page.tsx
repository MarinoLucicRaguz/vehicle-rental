import { getAllLocations } from "@/app/actions/location/getLocations";
import { VehicleAddForm } from "@/components/vehicle/VehicleAddForm";

export default async function Page() {
  const locations = await getAllLocations();
  return (
    <div className="w-full max-w-sm ml-auto mr-auto">
      <VehicleAddForm locations={locations.data || []} />;
    </div>
  );
}
