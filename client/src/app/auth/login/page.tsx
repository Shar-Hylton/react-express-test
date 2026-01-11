"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {validateEmail, validatePassword} from "@/lib/validation";

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

type UserData = {
  email:string,
  password:string
}


export default function Login() {
  const [form, setForm] = useState<UserData>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const isEnabled = isValid.email && isValid.password && !isLoading;

  const router = useRouter();

  const userLogin = async (data:UserData) => {
    setError("");
    setNotification("");

    if (!form.email.trim()) {
      setError("Enter your email");
      setIsLoading(false);
      return;
    }
    if (!form.password.trim()) {
      setError("Enter your password");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Submitting login request");
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      console.log("Response received:", response.status);

      if (!response.ok) {
        // server sends `errors` (array) or a message; normalize it
        const errMsg =
          resData?.errors[0]?.msg ?? "Request failed";
        setError(errMsg);
        return;
      }

      setForm({ ...form, email: "" });
      router.push("/");
      // setIsValid({...isValid, password: false});
      setNotification(resData?.msg);
    } catch (error) {
      console.error(error);
      // setPassword("");
      setError("System Failure, try again later. ");
      setIsValid({...isValid, password: false});
    } finally {
      setForm({ ...form, password: "" });
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid.email || !isValid.password) {
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);
    userLogin({...form});
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      {notification && (
        <ul className="text-green-500 mb-8 list-disc">
          <li>{notification}</li>
        </ul>
      )}
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
                    password: validatePassword(e.target.value),
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
        </CardContent>
      </Card>
    </div>
  );
}