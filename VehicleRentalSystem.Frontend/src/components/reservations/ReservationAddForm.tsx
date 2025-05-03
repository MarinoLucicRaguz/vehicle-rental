"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Location } from "@/types/LocationTypes";
import { Vehicle } from "@/types/VehicleTypes";
import { RentalType } from "@/types/RentalTypeTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useReservationForm } from "@/hooks/reservations/useReservationForm";

export interface ReservationAddProps extends React.ComponentPropsWithoutRef<"div"> {
  locations: Location[];
  vehicles: Vehicle[];
  rentalTypes: RentalType[];
}

export function ReservationAddForm({ locations, vehicles, rentalTypes, className, ...props }: ReservationAddProps) {
  const { form, onSubmit, serverError } = useReservationForm();
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Nova rezervacija</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => router.back()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bookingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broj rezervacije</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite broj rezervacije" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reservationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Datum rezervacije</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vrijeme početka</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vrijeme završetka</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Popust (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ukupna cijena</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="payed"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel>Plaćeno</FormLabel>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Način plaćanja</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite način plaćanja" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reservationStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status rezervacije</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite status" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ime kontakt osobe</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
{/* 
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bilješke</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Dodatne informacije" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="rentalTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tip najma</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberite tip najma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rentalTypes.map(rt => (
                          <SelectItem key={rt.id} value={rt.id.toString()}>
                            {rt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokacija</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberite lokaciju" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map(loc => (
                          <SelectItem key={loc.id} value={loc.id.toString()}>
                            {loc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vehicleIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vozila</FormLabel>
                    <Select
                      onValueChange={value => field.onChange([Number(value)])}
                      defaultValue={field.value?.[0]?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberite vozilo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicles.map(vehicle => (
                          <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                            {vehicle.make} {vehicle.model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
