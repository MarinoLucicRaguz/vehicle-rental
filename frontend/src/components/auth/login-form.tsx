import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import Link from "next/link";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, serverError } = useLoginForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
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
                <Input id="password" type="password" placeholder="Enter your password" required {...register("password")} />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Signing in…" : "Sign in"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
            {serverError && <div className="mt-2 text-center text-red-500 text-sm">{serverError}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
