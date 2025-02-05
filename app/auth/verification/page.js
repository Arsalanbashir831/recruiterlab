"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { Authentication } from "@/routes/routes";
import apiCaller from "@/helper/apiCaller";
import { useToast } from "@/hooks/use-toast";


const Page = () => {
  const [otp, setOtp] = useState(""); // Store OTP as a string
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast(); // Initialize toast for notifications

  const type = searchParams.get("type"); 
  const email = searchParams.get("email"); 

  // Handle OTP Input Change
  const handleChange = (value) => {
    if (!/^\d*$/.test(value) || value.length > 6) return; // Allow only numbers, max length 6
    setOtp(value);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (otp.length !== 6) {
      toast({ title: "Error", description: "Please enter a 6-digit OTP.", variant: "destructive" });
      setLoading(false);
      return;
    }

    try {
      if (type === "new") {
        await apiCaller(Authentication.otpVerification, "POST", { email, otp }, "json");
        toast({ title: "Success", description: "Email verified successfully!" });

        // Redirect user after successful verification
        setTimeout(() => router.push("/"), 1500);
      } else {
        // Redirect to reset password page if type is not "new"
        router.push(`/auth/reset-password?otp=${otp}&email=${email}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "OTP verification failed.",
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
          <CardTitle className="text-center text-lg font-semibold">Email Verification</CardTitle>
          <CardContent>Check your email for the verification code.</CardContent>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputOTP value={otp} onChange={handleChange} maxLength={6}>
              <div className="flex justify-center gap-2 my-4">
                <InputOTPGroup>
                  {[...Array(3)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {[...Array(3)].map((_, index) => (
                    <InputOTPSlot key={index + 3} index={index + 3} />
                  ))}
                </InputOTPGroup>
              </div>
            </InputOTP>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
