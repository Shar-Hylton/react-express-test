"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateUsername,
} from "@/lib/validation";

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
import { Spinner } from "@/components/ui/spinner";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<{
    email?: boolean;
    username?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    username?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const validPasswordMsg = [
    "Must be atleast 8 characters",
    "Must contain atleast 1 uppercase letter",
    "Must contain atleast 1 number",
    "Must contain atleast 1 special character (@,$,#...)",
  ];

  const router = useRouter();

  const userRegister = async () => {
    setError("");
    setNotification("");

    if (!form.username.trim()) {
      setError("Enter your username");
      setIsLoading(false);
      return;
    }
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

    if (!form.confirmPassword.trim()) {
      setError("Enter confirm password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        const errMsg =
          data?.error ||
          (Array.isArray(data?.errors) ? data.errors[0]?.msg : null) ||
          data?.msg ||
          "Request failed";
        setError(errMsg);
        // setIsBtnEnabled(false);
        return;
      }
      // setIsBtnEnabled(false);
      setForm({ ...form, email: "", username: "" });
      setNotification("Register Successful");
      router.push("/")
      console.log("log in successful");
    } catch (error) {
      console.error(error);
      setError("System Failure, try again later. ");
    } finally {
      setForm({ ...form, password: "", confirmPassword: "" });
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.confirmPassword && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    userRegister?.();
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      {notification && (
        <div className="text-green-500 mb-8">{notification}</div>
      )}
      {error && (
        <ul className="text-red-500 mb-8 list-disc">
          <li>{error}</li>
        </ul>
      )}
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/80 backdrop-blur hover:border-zinc-600 transition ease-linear duration-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white text-center underline-offset-4 underline">
            Welcome
          </CardTitle>
          <CardDescription className="text-zinc-400 text-center">
            Register for an Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* email */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                value={form.username}
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                  setIsValid({
                    ...isValid,
                    username: validateUsername(e.target.value),
                  });
                  setError("");
                }}
                onBlur={() => {
                  setTouched({ ...touched, username: true });
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
              {touched.username && !isValid.username && (
                <p className="text-sm text-red-500">
                  Must be more than 3 characters
                </p>
              )}
            </div>

            {/* email */}
            <div className="space-y-2">
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
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
              {touched.email && !isValid.email && (
                <p className="text-sm ml-2 text-red-500">Invalid email</p>
              )}
            </div>

            {/* Password */}
            <div>
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
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600 mt-2"
                required
              />
              {touched.password && !isValid.password && (
                <div className="mt-1 ml-2">
                  <p className="text-sm text-red-500">Enter strong password!</p>
                  <ul>
                    {validPasswordMsg.map((msg, index) => (
                      <li
                        key={index}
                        className="text-sm text-red-500 ml-4 list-disc"
                      >
                        {msg}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-zinc-300">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="confirm password"
                value={form.confirmPassword}
                onChange={(e) => {
                  setForm({ ...form, confirmPassword: e.target.value });
                  setIsValid({
                    ...isValid,
                    confirmPassword: validateConfirmPassword(
                      form.password,
                      e.target.value
                    ),
                  });
                  setError("");
                }}
                onBlur={() => {
                  setTouched({ ...touched, confirmPassword: true });
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
              {form.confirmPassword &&
                touched.confirmPassword &&
                !isValid.confirmPassword && (
                  <p className="text-sm ml-2 text-red-500">
                    Passwords Mismatch
                  </p>
                )}
            </div>
            <Button
              type="submit"
              disabled={ !isValid.email || !isValid.username || !isValid.password || !isValid.confirmPassword || isLoading}
              className="w-full mt-2 bg-white text-black cursor-pointer hover:bg-zinc-400/70 transition"
            >
              {isLoading ? (
                <>
                  <Spinner className="" />{" "}
                  <span>Validating Credentials...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          {/* Register link */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Have an account?{" "}
            <Link
              href="/auth/login"
              className="text-white underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
