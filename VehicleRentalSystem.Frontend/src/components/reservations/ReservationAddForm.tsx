"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useRouter } from "next/navigation";
import { Location } from "@/types/LocationTypes";
import { Vehicle } from "@/types/VehicleTypes";
import { RentalType } from "@/types/RentalTypeTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useReservationForm } from "@/hooks/reservations/useReservationForm";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Check } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { TimePicker } from "../ui/time-picker";
import { useWatch } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EnumOptionsDTO } from "@/types/EnumTypes";
import { vehicleService } from "@/services/vehicleService";

export interface ReservationAddProps extends React.ComponentPropsWithoutRef<"div"> {
  locations: Location[];
  rentalTypes: RentalType[];
  paymentOptions: EnumOptionsDTO[];
  reservationStatuses: EnumOptionsDTO[];
}

function calculateEndTime(start: Date, rentalType: RentalType): Date {
  const end = new Date(start);
  switch (rentalType.durationUnit) {
    case "minutes":
      end.setMinutes(end.getMinutes() + rentalType.duration);
      break;
    case "hours":
      end.setHours(end.getHours() + rentalType.duration);
      break;
    case "days":
      end.setDate(end.getDate() + rentalType.duration);
      break;
    case "weeks":
      end.setDate(end.getDate() + rentalType.duration * 7);
      break;
    default:
      console.warn("Nepoznata jedinica trajanja");
  }
  return end;
}

export function ReservationAddForm({ locations, rentalTypes, paymentOptions, reservationStatuses, className, ...props }: ReservationAddProps) {
  const { form, onSubmit, serverError } = useReservationForm();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const router = useRouter();

  const reservationDate = useWatch({ control: form.control, name: "reservationDate" });
  const startTime = useWatch({ control: form.control, name: "startTime" });
  const rentalTypeId = useWatch({ control: form.control, name: "rentalTypeId" });
  const endTime = useWatch({ control: form.control, name: "endTime" });

  useEffect(() => {
    if (!startTime || !rentalTypeId) return;

    const rentalType = rentalTypes.find(rt => rt.id === Number(rentalTypeId));
    if (!rentalType) return;

    const mergedStart = new Date(startTime);
    if (reservationDate) {
      mergedStart.setFullYear(reservationDate.getFullYear(), reservationDate.getMonth(), reservationDate.getDate());
    }

    const newEnd = calculateEndTime(mergedStart, rentalType);

    const prevStart = form.getValues("startTime");
    if (!prevStart || new Date(prevStart).getTime() !== mergedStart.getTime()) {
      form.setValue("startTime", mergedStart, { shouldValidate: false, shouldDirty: true });
    }
    const prevEnd = form.getValues("endTime");
    if (!prevEnd || new Date(prevEnd).getTime() !== newEnd.getTime()) {
      form.setValue("endTime", newEnd, { shouldValidate: false, shouldDirty: true });
    }
  }, [reservationDate, startTime, rentalTypeId, rentalTypes, form]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = { startTime: form.getValues("startTime"), endTime: form.getValues("endTime") };
        const availableVehicles = await vehicleService.getAvailableInPeriod(data);
        setVehicles(availableVehicles.data ?? []);
      } catch (error) {
        //nesto s errorom
      }
    };

    fetchVehicles();
  }, [startTime, endTime]);

  const vehicleSummary = (ids: number[]): string => {
    if (!ids || ids.length === 0) return "Odaberite vozila";
    if (ids.length === 1) {
      const v = vehicles.find(veh => veh.id === ids[0]);
      return v ? `${v.make} ${v.model}` : "1 vozilo";
    }
    return `${ids.length} vozila`;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Nova rezervacija</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => router.back()} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="bookingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Šifra rezervacije</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Šifra rezervacije" {...field} />
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Odaberite datum</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={{ before: new Date() }} />
                        </PopoverContent>
                      </Popover>
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
                        <TimePicker textVisible={false} date={field.value} setDate={field.onChange} tpDisabled={false} />
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
                      <FormLabel>Kraj rezervacije (HH:mm)</FormLabel>
                      <FormControl>
                        <Input value={field.value ? format(new Date(field.value), "HH:mm") : ""} readOnly disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="rentalTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tip najma</FormLabel>
                    <Select value={field.value ? field.value.toString() : ""} onValueChange={val => field.onChange(Number(val))}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberite tip najma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rentalTypes.map(rt => (
                          <SelectItem key={rt.id} value={rt.id.toString()}>
                            {rt.name} - {rt.duration} {rt.durationUnit}
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
                    <Select value={field.value ? field.value.toString() : ""} onValueChange={val => field.onChange(Number(val))}>
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
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel>Vozila</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className={cn("w-full pl-3 text-left font-normal")}>
                            {vehicleSummary(field.value || [])}
                            <Check className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 p-2" align="start">
                        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                          {vehicles.map(vehicle => {
                            const checked = field.value?.includes(vehicle.id) || false;
                            return (
                              <Label key={vehicle.id} className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 rounded-md p-1">
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={isChecked => {
                                    const current = field.value || [];
                                    if (isChecked) {
                                      field.onChange([...current, vehicle.id]);
                                    } else {
                                      field.onChange(current.filter(id => id !== vehicle.id));
                                    }
                                  }}
                                />
                                {vehicle.registration} - {vehicle.make}
                              </Label>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Način plaćanja</FormLabel>
                      <Select value={String(field.value)} onValueChange={val => field.onChange(Number(val))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberite način plaćanja" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentOptions.map(opt => (
                            <SelectItem key={opt.id} value={String(opt.id)}>
                              {opt.displayName}
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
                  name="reservationStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status rezervacije</FormLabel>
                      <Select value={String(field.value)} onValueChange={val => field.onChange(Number(val))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberite status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {reservationStatuses.map(opt => (
                            <SelectItem key={opt.id} value={String(opt.id)}>
                              {opt.displayName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

              <CardFooter className="grid grid-cols-2 gap-4 pt-4">
                <Button type="submit" variant="save" disabled={form.formState.isSubmitting}>
                  Spremi
                </Button>
                <Button type="reset" variant="destructive">
                  Nazad
                </Button>
              </CardFooter>

              {serverError && <p className="m-auto text-center text-red-500">{serverError}</p>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
