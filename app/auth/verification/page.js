'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [otp, setOtp] = useState(Array(6).fill('')); // State to store OTP values
  const [loading, setLoading] = useState(false); // Loading state for submit
  const router = useRouter();

  const handleChange = (index, value) => {
    if (isNaN(value) || value.length > 1) return; // Ensure only a single digit is entered

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Automatically move to the next input if not the last index
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpCode = otp.join(''); // Combine OTP values
    console.log('Entered OTP:', otpCode);
    router.push('/');
    
  };

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">Email Verification</CardTitle>
          <CardContent>Check your email for verification</CardContent>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <InputOTP maxLength={6}>
              <div className="flex justify-center gap-2 my-4">
                <InputOTPGroup>
                  {otp.slice(0, 3).map((value, index) => (
                    <InputOTPSlot
                      key={index}
                      id={`otp-${index}`}
                      index={index}
                      value={value}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {otp.slice(3, 6).map((value, index) => (
                    <InputOTPSlot
                      key={index + 3}
                      id={`otp-${index + 3}`}
                      index={index + 3}
                      value={value}
                      onChange={(e) => handleChange(index + 3, e.target.value)}
                    />
                  ))}
                </InputOTPGroup>
              </div>
            </InputOTP>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
