"use client";

import React, { useState } from "react";
import Link from "next/link";

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

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const userRegister = async () => {
    setError("");
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        const errMsg = data?.error || (Array.isArray(data?.errors) ? data.errors[0]?.msg : null) || data?.msg || 'Request failed';
        setError(errMsg);
        setPassword("");
        setConfirmPassword("");
        return;
      }
      setEmail("");
      setUserName("");
      setConfirmPassword("");
      setPassword("");
      setNotification("Register Successful");
      console.log("log in successful")
    } catch (error) {
      console.error(error);
      setPassword("");
      setConfirmPassword("");
      setError("System Failure, try again later. ");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    userRegister?.();
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      {notification && (
        <div className="text-green-500 mb-8">{notification}</div>
      )}
      {error && <div className="text-red-500 mb-8">{error}</div>}
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
          <form className="space-y-5" onSubmit={handleSubmit}>
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
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setError("");
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600 mt-2"
                required
              />
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
              {confirmPassword && password !== confirmPassword && (
                <div className="text-red-500 mb-8">Passwords Mismatch</div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-white mt-2 text-black cursor-pointer hover:bg-zinc-500 transition ease-linear duration-500"
            >
              Register
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
