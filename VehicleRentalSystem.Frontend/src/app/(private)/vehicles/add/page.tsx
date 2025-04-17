import { VehicleAddForm } from "@/components/vehicle/VehicleAddForm";
import { locationService } from "@/services/locationService";
import { Location } from "@/types/LocationTypes";

export default async function Page() {
  const resp = await locationService.getAll();
  const locations: Location[] = Array.isArray(resp.data) ? resp.data : [];
  return (
    <div className="w-full max-w-sm ml-auto mr-auto">
      <VehicleAddForm locations={locations} />;
    </div>
  );
}
