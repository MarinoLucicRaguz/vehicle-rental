"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useVehicleForm } from "@/hooks/vehicle/useVehicleForm";

export function VehicleAddForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { form, onSubmit, serverError } = useVehicleForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Dodaj vozilo</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {serverError && <p className="text-red-500">{serverError}</p>}
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tip vozila</FormLabel>
                    <FormControl>
                      <Input placeholder="Unesite tip vozila" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.vehicleType?.message}</FormMessage>
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
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Godina</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Unesite godinu" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.year?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapacitet osoba</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Unesite kapacitet osoba" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.personCapacity?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fuelCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapacitet goriva</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Unesite kapacitet goriva" {...field} />
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
                      <Input type="number" placeholder="Unesite potrošnju goriva" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.fuelConsumption?.message}</FormMessage>
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
                      <Input placeholder="Unesite opis vozila" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Unesite status vozila" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.status?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultLocationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokacija</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Unesite ID lokacije" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.defaultLocationId?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <CardFooter className="pt-4">
                <Button type="submit" variant="save" disabled={form.formState.isSubmitting}>
                  Spremi
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
