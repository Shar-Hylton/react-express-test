"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/lib/validation";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { TiArrowBackOutline } from "react-icons/ti";

type UserData = {
  email:string,
  password:string
}

export default function Login() {
  const [form, setForm] = useState<UserData>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const { userLogin } = useAuth();

  const isEnabled = isValid.email && isValid.password && !isLoading;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValid.email || !isValid.password) {
      setTouched({ email: true, password: true });
      return;
    }

    if (!form.password.trim()) {
     setError("Enter your password");
      return;
    }

    if (!form.email.trim()) {
      setError("Enter your email");
      return; 
    }
    
    const result = await userLogin({ ...form });

    if (!result || !result.success) {
      setError(result?.message || "Failed to log in. Please try again");
      setForm({ ...form, password: "" });
      setIsValid({ ...isValid, password: false });
      setIsLoading(false);
      return;
    }

    setForm({ email: "", password: "" });
    setIsLoading(false);

    sessionStorage.setItem("toast", result.message);
    router.replace("/notes");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      
      {error && (
        <ul className="text-red-500 mt-8 mb-8 list-disc">
          <li>{error}</li>
        </ul>
      )}
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/80 backdrop-blur hover:border-zinc-600 transition ease-linear duration-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white text-center underline-offset-4 underline">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-zinc-400 text-center">
            Log In To Your Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* email */}
            <div>
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setIsValid({
                    ...isValid,
                    email: validateEmail(e.target.value),
                  });
                  setError("");
                }}
                onBlur={() => {
                  setTouched({ ...touched, email: true });
                }}
                className="bg-zinc-950 mt-2 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
              {touched.email && !isValid.email && (
                <p className="text-sm mt-1 ml-2 text-red-500">
                  Enter valid email
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setIsValid({
                    ...isValid,
                    password: validatePassword(e.target.value).success,
                  });
                  setError("");
                }}
                onBlur={() => {
                  setTouched({ ...touched, password: true });
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
              {touched.password && !isValid.password && (
                <p className="text-sm text-red-500">Invalid Password!</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isEnabled}
              className="w-full bg-white mt-2 text-black cursor-pointer hover:bg-zinc-400/70 transition ease-linear duration-300"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Validating Credentials...</span>
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          {/* Register link */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-white underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
          <Link
              href="/"
              className="flex justify-center text-white underline-offset-4 hover:underline mt-4"
            >
              <TiArrowBackOutline size={24}/>{" "} Go Back
            </Link>
        </CardContent>
      </Card>
       
    </div>
  );
}
