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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const userLogin = async () => {
    setError("")
    if(!email.trim() || !password.trim()){
      return;
    }

    try {
      console.log("Submitting login request")
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      console.log("Response received:", response.status);

      if (!response.ok) {
        // server sends `errors` (array) or a message; normalize it
        const errMsg = data?.error || (Array.isArray(data?.errors) ? data.errors[0]?.msg : null) || data?.msg || 'Request failed';
        setError(errMsg);
        setPassword("");
        return;
      };

      setPassword("");
      setEmail("")
      setNotification("Login Successful")
    } catch (error) {
      console.error(error);
      setPassword("");
      setError("System Failure, try again later. ");
    }
  };

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault();
    userLogin();

  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      {notification && <div className="text-green-500 mb-8">{notification}</div>}
      {error && <div className="text-red-500 mb-8">{error}</div>}
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
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value); 
                  setError("")
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("")
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white mt-2 text-black cursor-pointer hover:bg-zinc-500 transition ease-linear duration-500"
            >
              Log In
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
