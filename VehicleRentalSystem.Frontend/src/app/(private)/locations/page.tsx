import { DataTable } from "@/components/datatable/data-table";
import { getAllLocations } from "@/app/actions/location/getLocations";
import { LocationColumns } from "@/components/location/LocationColumns";

export default async function Page() {
  const response = await getAllLocations();
  return (
    <div className="w-full">
      <DataTable columns={LocationColumns} data={response.data || []} />
    </div>
  );
}
