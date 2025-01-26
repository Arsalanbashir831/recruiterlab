"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function PostDetailsDialog({ isOpen, onClose, post }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(post.title);
    alert("Job title copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{post.title}</DialogTitle>
        </DialogHeader>

        {/* Image */}
        <div className="mb-4">
          <img
            src={post.image}
            alt={post.title}
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{post.description}</p>

        {/* AI-Generated Content */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">AI-Generated Content</h4>
          <p className="text-gray-600">
            "This position involves creating user-friendly interfaces using the latest frontend
            frameworks, ensuring a seamless user experience."
          </p>
        </div>

        {/* Copy Button */}
        <div className="flex justify-end">
          <Button onClick={handleCopy} className="bg-blue-500 text-white">
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
