import { getAllVehicles } from "@/app/actions/vehicle/getVehicles";
import { VehicleColumns } from "@/components/vehicle/VehicleColumns";
import { DataTable } from "@/components/datatable/data-table";

export default async function Page() {
  const response = await getAllVehicles();
  return (
    <div className="w-full">
      <DataTable columns={VehicleColumns} data={response.data || []} />
    </div>
  );
}
