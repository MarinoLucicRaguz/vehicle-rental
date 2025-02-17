"use client";
import { login } from "@/app/actions/user-actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
        <div>
          <input
            name="username"
            type="text"
            id="username"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <div>
            <button type="submit">Sign in</button>
          </div>
          <p>{state?.message}</p>
        </div>
      </form>
    </div>
  );
}
