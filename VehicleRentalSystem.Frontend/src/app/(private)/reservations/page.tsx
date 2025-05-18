import { getAllReservations } from "@/app/actions/reservations/getReservations";
import { DataTable } from "@/components/datatable/data-table";
import { ReservationColumns } from "@/components/reservations/ReservationColumns";

export default async function Page() {
  const response = await getAllReservations();
  return (
    <div className="w-full">
      <DataTable columns={ReservationColumns} data={response.data || []} />
    </div>
  );
}
