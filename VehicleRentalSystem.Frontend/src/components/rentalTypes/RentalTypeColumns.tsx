"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheckBig, CircleX, MoreHorizontal } from "lucide-react";
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
import { RentalType } from "@/types/RentalTypeTypes";
import { VehicleType } from "@/types/VehicleTypeTypes";

export const RentalTypeColumns: ColumnDef<RentalType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Naziv
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    meta: {
      displayName: "Naziv",
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Opis
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
    meta: {
      displayName: "Opis",
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Cijena
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("price") || "-"}</div>,
    meta: {
      displayName: "Cijena",
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Duljina trajanja
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("duration") || "-"}</div>,
    meta: {
      displayName: "Duljina trajanja",
    },
  },
  {
    accessorKey: "durationUnit",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Jedinica najma
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("durationUnit")}</div>,
    meta: {
      displayName: "Jedinica najma",
    },
  },
  // {
  //   accessorKey: "maxPassengers",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Max. putnika
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div>{row.getValue("maxPassengers")}</div>,
  //   meta: {
  //     displayName: "Max. putnika",
  //   },
  // },
  {
    accessorKey: "isPerPerson",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Po osobi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("isPerPerson") === true ? <CircleCheckBig /> : <CircleX />}</div>,
    meta: {
      displayName: "Cijena po osobi",
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Aktivno
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("isActive") === true ? <CircleCheckBig /> : <CircleX />}</div>,
    meta: {
      displayName: "Aktivno",
    },
  },
  {
    accessorKey: "fuelIncluded",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Gorivo uključeno
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("fuelIncluded") === true ? <CircleCheckBig /> : <CircleX />}</div>,
    meta: {
      displayName: "Gorivo uključeno",
    },
  },
  {
    accessorKey: "availableVehicleType",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tipovi vozila
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vehicleTypes = row.getValue("availableVehicleType") as VehicleType[];
      return <div>{vehicleTypes && vehicleTypes.length > 0 ? vehicleTypes.map(vt => vt.name).join(", ") : "-"}</div>;
    },
    meta: {
      displayName: "Tipovi vozila",
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vehicle = row.original;

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
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(vehicle.Id)}>Copy vehicle ID</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Prikaži detalje</DropdownMenuItem>
            <DropdownMenuItem>Uredi najam</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
