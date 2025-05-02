import { getAllRentalTypes } from "@/app/actions/rentalType/getRentalTypes";
import { DataTable } from "@/components/datatable/data-table";
import { RentalTypeColumns } from "@/components/rentalTypes/RentalTypeColumns";

export default async function Page() {
  const resp = await getAllRentalTypes();
  return (
    <div className="w-full">
      <DataTable columns={RentalTypeColumns} data={resp.data || []} />
    </div>
  );
}
