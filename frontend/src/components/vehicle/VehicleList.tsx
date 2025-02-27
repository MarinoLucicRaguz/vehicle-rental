"use client";

import { useState } from "react";
import { Table, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table";
import { Vehicles } from "@/types/VehicleTypes";

interface VehicleListProps extends React.ComponentPropsWithoutRef<"div"> {
  vehicles: Vehicles[] | undefined;
}

export function VehicleList({ vehicles, className, ...props }: VehicleListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <Table>
      <TableCaption>Popis vozila</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Registracija</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}
