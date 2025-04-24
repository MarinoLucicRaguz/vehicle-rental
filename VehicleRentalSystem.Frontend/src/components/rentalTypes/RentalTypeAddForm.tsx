"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRentalTypeForm } from "@/hooks/rentalType/useRentalTypeForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { VehicleType } from "@/types/VehicleTypeTypes";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface RentalTypeAddProps extends React.ComponentPropsWithoutRef<"div"> {
  vehicleTypes: VehicleType[];
}

const timeOptions = [
  { value: "minutes", label: "Minuta" },
  { value: "hours", label: "Sat" },
  { value: "days", label: "Dan" },
  { value: "week", label: "Tjedan" },
];

export function RentalAddForm({ vehicleTypes, className, ...props }: RentalTypeAddProps) {
  const { form, onSubmit, serverError } = useRentalTypeForm();
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Novi tip najma</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => router.back()} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naziv najma</FormLabel>
                    <FormControl>
                      <Input placeholder="Unesite naziv" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opis</FormLabel>
                    <FormControl>
                      <Input placeholder="Unesite opis" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cijena</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Unesite cijenu"
                          {...field}
                          value={field.value ?? ""}
                          onChange={e => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vrijeme</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Unesite vrijeme"
                          {...field}
                          value={field.value ?? ""}
                          onChange={e => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.duration?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="durationUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>J. Vremena </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberite lokaciju vozila" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeOptions.map(time => (
                            <SelectItem className="text-black" value={time.value} key={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isPerPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cijena po osobi</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={true} />
                            </FormControl>
                            <FormLabel className="font-normal">Da</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={false} />
                            </FormControl>
                            <FormLabel className="font-normal">Ne</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>{form.formState.errors.isPerPerson?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fuelIncluded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gorivo uključeno</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={true} />
                            </FormControl>
                            <FormLabel className="font-normal">Da</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={false} />
                            </FormControl>
                            <FormLabel className="font-normal">Ne</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>{form.formState.errors.isPerPerson?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="availableVehicleTypeIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dostupno za vozilo</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">{field.value?.length ? `Odabrano (${field.value.length})` : "Odaberi tip vozila"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Tipovi vozila</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {vehicleTypes.map(vehicle => {
                            const isChecked = field.value?.includes(vehicle.id);
                            return (
                              <DropdownMenuCheckboxItem
                                key={vehicle.id}
                                checked={isChecked}
                                onCheckedChange={checked => {
                                  const newValue = checked
                                    ? [...(field.value || []), vehicle.id]
                                    : (field.value || []).filter(id => id !== vehicle.id);
                                  field.onChange(newValue);
                                }}
                              >
                                {vehicle.name}
                              </DropdownMenuCheckboxItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage>{form.formState.errors.availableVehicleTypeIds?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <CardFooter className="grid grid-cols-2 pt-4 gap-4">
                <Button type="submit" variant="save" disabled={form.formState.isSubmitting}>
                  Spremi
                </Button>
                <Button type="reset" variant="destructive">
                  Nazad
                </Button>
              </CardFooter>
              <div className="text-center m-auto">{serverError && <p className="text-red-500">{serverError}</p>}</div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
