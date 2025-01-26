'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Page = () => {
  return (
    <div className="flex  items-center justify-center  p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            {/* New Password Field */}
            <div>
              <Label htmlFor="new-password" className="block text-sm font-medium">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
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
                required
                className="mt-2"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full">Reset Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
