import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRegisterForm } from "@/hooks/auth/useRegisterForm";
import Link from "next/link";

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, serverError } = useRegisterForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Enter your username..." required {...register("username")} />
                {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password..." required {...register("password")} />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Repeat your password..." required {...register("confirmPassword")} />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
              </div>
              <Button type="submit" className="w-full">
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
            {serverError && <div className="mt-2 text-center text-red-500 text-sm">{serverError}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
