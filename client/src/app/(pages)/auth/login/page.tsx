'use client'

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userLogin = async () => {
    try{
      const response = await fetch("http://localhost:8000/auth/login",{
        method:'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({username, password})
      });
      const data = await response.json();

      if (!response.ok) setError(data.error);
      

    }catch(error){
      console.error(error);
      setError("System Failure, try again later. ");
    }
  }




  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/80 backdrop-blur">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white text-center">Welcome Back</CardTitle>
          <CardDescription className="text-zinc-400 text-center">
            Log In To Your Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/auth/login" method="POST" className="space-y-5">
            {/* Username */}
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
                onChange={(e) => setUsername(e.target.value)}
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
                }}
                className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600"
              />

            </div>
            <Button
              type="submit"
              className="w-full bg-white text-black cursor-pointer hover:bg-zinc-500 transition ease-linear duration-500"
              onClick={userLogin}
            >
              Log In
            </Button>
          </form>
                {/* Register link */}
            <p className="mt-6 text-center text-sm text-zinc-400">
                Don&apos;t have an account?{' '}
                <Link
                href="/register"
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
