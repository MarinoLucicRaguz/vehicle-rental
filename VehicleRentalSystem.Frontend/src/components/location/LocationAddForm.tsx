"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useLocationForm } from "@/hooks/location/useLocationForm";
import { Button } from "../ui/button";

export function LocationAddForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { form, onSubmit, serverError } = useLocationForm();
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Nova lokacija</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => router.back()} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naziv</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite naziv lokacije" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite adresu" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.address?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grad</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite grad" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.city?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Županija</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite županiju" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.state?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poštanski broj</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite poštanski broj" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.zipCode?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Država</FormLabel>
                      <FormControl>
                        <Input placeholder="Unesite državu" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.country?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="grid grid-cols-2 pt-4 gap-4">
                <Button type="submit" variant="save" disabled={form.formState.isSubmitting}>
                  Spremi
                </Button>
                <Button type="reset" variant="destructive">
                  Nazad
                </Button>
              </CardFooter>
            </form>
            <div className="text-center m-auto">{serverError && <p className="text-red-500">{serverError}</p>}</div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
