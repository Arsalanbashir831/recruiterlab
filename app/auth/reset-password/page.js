"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const Page = () => {
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [loading, setLoading] = useState(false); // Loading state for submit
const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    // Validate that the passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }
router.push('/auth')

    // Simulate API call to reset password
  
  };

  return (
    <div className="flex items-center justify-center p-6">
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
                onChange={(e) => setNewPassword(e.target.value)} // Update new password state
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
                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
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

export default Page;
