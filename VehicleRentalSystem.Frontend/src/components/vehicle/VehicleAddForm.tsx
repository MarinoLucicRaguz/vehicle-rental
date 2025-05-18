"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useVehicleForm } from "@/hooks/vehicle/useVehicleForm";
import { useRouter } from "next/navigation";
import { Location } from "@/types/LocationTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { VehicleType } from "@/types/VehicleTypeTypes";

export interface VehicleAddProps extends React.ComponentPropsWithoutRef<"div"> {
  vehicleTypes: VehicleType[];
  locations: Location[];
}

export function VehicleAddForm({ vehicleTypes, locations, className, ...props }: VehicleAddProps) {
  const { form, onSubmit, serverError } = useVehicleForm();
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Novo vozilo</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => router.back()} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vehicleTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Tip vozila </FormLabel>
                      <Select value={field.value ? field.value.toString() : ""} onValueChange={val => field.onChange(Number(val))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberite tip vozila" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicleTypes.map(vehicleType => (
                            <SelectItem className="text-black" value={vehicleType.id.toString()} key={vehicleType.id}>
                              {vehicleType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registracija</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite registraciju" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.registration?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Lokacija </FormLabel>
                    <Select value={field.value ? field.value.toString() : ""} onValueChange={val => field.onChange(Number(val))}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberite lokaciju vozila" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map(location => (
                          <SelectItem className="text-black" value={location.id.toString()} key={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marka</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite marku vozila" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.make?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite model vozila" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.model?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Godina</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Unesite godinu"
                          {...field}
                          value={field.value ?? ""}
                          onChange={e => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.year?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="peopleCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kapacitet osoba</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Unesite kapacitet osoba"
                          {...field}
                          value={field.value ?? ""}
                          onChange={e => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.peopleCapacity?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fuelCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kapacitet goriva</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Unesite kapacitet goriva" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.fuelCapacity?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fuelConsumption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potrošnja goriva</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Unesite potrošnju goriva" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.fuelConsumption?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opis</FormLabel>
                    <FormControl>
                      <Input placeholder="Unesite opis vozila" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.description?.message}</FormMessage>
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
