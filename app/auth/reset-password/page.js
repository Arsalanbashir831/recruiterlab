"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic"; // Dynamically import component
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import apiCaller from "@/helper/apiCaller";
import { useToast } from "@/hooks/use-toast";

// ✅ Wrap the component inside Suspense
const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
};

// ✅ Separate Component to use `useSearchParams()`
const ResetPasswordComponent = () => {
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [loading, setLoading] = useState(false); // Loading state for submit
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const otp = searchParams.get("otp");
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match!", variant: "destructive" });
      setLoading(false);
      return;
    }

    try {
      await apiCaller("/users/reset-password/", "POST", {
        otp,
        email,
        new_password: newPassword,
      });

      toast({ title: "Success", description: "Password reset successful! Redirecting..." });

      setTimeout(() => router.push("/auth"), 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to reset password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div>
              <Label htmlFor="new-password" className="block text-sm font-medium">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label htmlFor="confirm-password" className="block text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            {/* Submit Button */}
            <CardFooter className="flex justify-center mt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// 📌 Dynamically Import for Next.js Optimization
export default dynamic(() => Promise.resolve(ResetPasswordPage), { ssr: false });
