import { getAllVehicles } from "@/app/actions/vehicle/getVehicles";
import { columns } from "@/components/vehicle/columns";
import { DataTable } from "@/components/vehicle/data-table";
import { VehicleList } from "@/components/vehicle/VehicleList";

export default async function Page() {
  const response = await getAllVehicles();
  console.log(response);
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={response || []} />
        </div>
      </div>
    </div>
  );
}
