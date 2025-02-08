"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import apiCaller from "@/helper/apiCaller";
import { Authentication } from "@/routes/routes";
import { useToast } from "@/hooks/use-toast";
import Spinner from "../common/Spinner";


export function SignupForm({ className, ...props }) {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const { toast } = useToast(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.clear();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      // Call Signup API
      await apiCaller(Authentication.register, "POST", formData, "multipart", false);

      // Success message
      toast({
        title: "Success",
        description: "Signup successful! Redirecting...",
      });

      setTimeout(() => router.push(`/auth/verification?type=new&email=${email}`), 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your details below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Username Field */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <Input
                  id="confirmpassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Spinner className="w-5 h-5" /> : "Signup"}
              </Button>
            </div>

            {/* Login Link */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/auth" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
