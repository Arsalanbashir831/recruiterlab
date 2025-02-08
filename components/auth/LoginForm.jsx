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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"; 
import { useToast } from "@/hooks/use-toast";
import { GoogleLogin } from "@react-oauth/google";
import Spinner from "../common/Spinner";


export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [forgotEmail, setForgotEmail] = useState(""); 
  const [forgotLoading, setForgotLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    localStorage.clear();
    
    try {
      const response = await apiCaller(Authentication.login, "POST", { email, password });

      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);

      toast({ title: "Success", description: "Logged in successfully!" });

      router.push("/");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);

    try {
      await apiCaller(Authentication.requestPasswordReset, "POST", { email: forgotEmail });

      toast({ title: "Success", description: "OTP has been sent to your email!" });
      router.push(`/auth/verification?email=${forgotEmail}&type=forgot`);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send reset email.",
        variant: "destructive",
      });
    } finally {
      setForgotLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    setLoading(true)
    console.log("Google Login Successful:", response);
    localStorage.clear();
  
    try {
      const res = await apiCaller(Authentication.googleAuth, "POST", { id_token: response.credential });
  
      if (res.access && res.refresh) {
        console.log("Login Successful:", res);
        localStorage.setItem("accessToken", res.access);
        localStorage.setItem("refreshToken", res.refresh);
  
        toast({ title: "Success", description: "Logged in successfully!" });
        router.push("/");
      } else {
        throw new Error(res.error || "Google Login failed");
      }
    } catch (error) {
      console.error("Error:", error.message || "Google Login failed");
    
  
      toast({ title: "Error", description: error.message || "Google Login failed", variant: "destructive" });
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                          Enter your email to receive OTP.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleForgotPassword} className="space-y-4">
                        <Label htmlFor="forgot-email">Email</Label>
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="m@example.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                        />
                        <Button type="submit" className="w-full" disabled={forgotLoading}>
                          {forgotLoading ? <Spinner className="w-5 h-5" /> : "Send OTP"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* Submit Button */}
              {loading ? <>
                <Spinner/>
              </>:<>
              <Button type="submit" className="w-full" disabled={loading}>
                Login
              </Button>

              {/* Google Login */}
              <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={() => console.log('Login Failed')} />
              </>}
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/auth/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
