"use client";

import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Reservation } from "@/types/ReservationTypes";
import { Location } from "@/types/LocationTypes";

export const ReservationColumns: ColumnDef<Reservation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={v => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={v => row.toggleSelected(!!v)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bookingNumber",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Broj rezervacije
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("bookingNumber")}</div>,
    meta: { displayName: "Broj rezervacije" },
  },
  {
    accessorKey: "reservationDate",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Datum rezervacije
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("reservationDate");
      return <div>{format(date, "dd.MM.yyyy", { locale: hr })}</div>;
    },
    meta: { displayName: "Datum rezervacije" },
  },
  {
    accessorKey: "startTime",
    header: "Početak",
    cell: ({ row }) => {
      const dt: Date = row.getValue("startTime");
      return <div>{format(dt, "HH:mm", { locale: hr })}</div>;
    },
  },
  {
    accessorKey: "endTime",
    header: "Kraj",
    cell: ({ row }) => {
      const dt: Date = row.getValue("endTime");
      return <div>{format(dt, "HH:mm", { locale: hr })}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Ukupna cijena",
    cell: ({ row }) => <div>{row.getValue("totalPrice")} €</div>,
  },
  {
    accessorKey: "deposit",
    header: "Depozit",
    cell: ({ row }) => <div>{row.getValue("deposit")} €</div>,
  },
  {
    accessorKey: "payed",
    header: "Plaćeno",
    cell: ({ row }) => <div>{row.getValue("payed") ? "Da" : "Ne"}</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Način plaćanja",
    cell: ({ row }) => <div>{row.getValue("paymentMethod")}</div>,
  },
  {
    accessorKey: "reservationStatus",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("reservationStatus")}</div>,
  },
  {
    accessorKey: "contactName",
    header: "Kontakt",
    cell: ({ row }) => <div>{row.getValue("contactName") || "–"}</div>,
  },
  {
    accessorKey: "contactPhone",
    header: "Telefon",
    cell: ({ row }) => <div>{row.getValue("contactPhone") || "–"}</div>,
  },
  {
    accessorKey: "contactEmail",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("contactEmail") || "–"}</div>,
  },
  {
    accessorKey: "notes",
    header: "Napomene",
    cell: ({ row }) => <div>{row.getValue("notes") || "–"}</div>,
  },
  // {
  //   accessorKey: "rentalType.name",
  //   header: "Tip najma",
  //   cell: ({ row }) => {
  //     // @ts-ignore – dot-path
  //     return <div>{row.getValue("rentalType")?.name}</div>;
  //   },
  // },
  {
    accessorKey: "vehicles",
    header: "Vozila",
    cell: ({ row }) => {
      const vehicles = row.getValue("vehicles") as { registration: string }[];
      return <div>{vehicles.map(v => v.registration).join(", ")}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Lokacija",
    cell: ({ row }) => {
      return <div>{(row.getValue("location") as Location).name}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const reservation = row.original;
      console.log(reservation)
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Otvori meni</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akcije</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Prikaži detalje</DropdownMenuItem>
            <DropdownMenuItem>Uredi rezervaciju</DropdownMenuItem>
            <DropdownMenuItem>Izbriši rezervaciju</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
