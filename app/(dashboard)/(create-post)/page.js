'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';
import { useToast } from '@/hooks/use-toast';

const Page = () => {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState(null);
  const [generatedPost, setGeneratedPost] = useState('');

  const form = useForm({
    defaultValues: {
      jobTitle: '',
      experience: '',
      requirements: '',
      image: null,
    },
  });

  const onSubmit = (data) => {
    // Simulating AI-generated content (replace with actual API call)
    const post = `
      Job Title: ${data.jobTitle || 'N/A'}
      Experience Required: ${data.experience || 'N/A'}
      Requirements: ${data.requirements || 'N/A'}
    `;
    setGeneratedPost(post);

    toast({
      title: 'Job Post Generated',
      description: 'Your job post has been successfully generated!',
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      form.setValue('image', file);
    }
  };

  const handleCopy = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost);
      toast({
        title: 'Copied to Clipboard',
        description: 'The job post has been copied to your clipboard.',
      });
    }
  };

  const handleRegenerate = () => {
    // Simulate a new post generation
    setGeneratedPost(`Job Title: Senior Software Engineer
    Experience Required: 5+ years
    Requirements: Extensive experience with TypeScript, React, and AWS.`);

    // Show toast for regeneration
    toast({
      title: 'Job Post Regenerated',
      description: 'A new job post has been successfully generated.',
    });
  };

  return (
    <div className="flex items-center justify-center flex-col gap-5 bg-gray-100 p-6">
      {/* Job Form */}
      <Card className="w-full max-w-full shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">Recruiter Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Job Title Field */}
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    {...form.register('jobTitle', { required: true })}
                    placeholder="e.g., Software Developer, Marketing Executive"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Experience Field */}
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input
                    {...form.register('experience', { required: true })}
                    placeholder="e.g., 2+ years, 5+ years"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Job Requirements Field */}
              <FormItem>
                <FormLabel>Basic Job Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    {...form.register('requirements', { required: true })}
                    placeholder="e.g., Strong programming skills, team management experience"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Image Upload Field */}
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={handleImageChange} />
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Image Preview */}
              {previewImage && (
                <div className="mt-4">
                  <Label className="block text-sm font-medium">Preview</Label>
                  <Image
                    width={100}
                    height={100}
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 w-full max-h-40 object-cover rounded"
                  />
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Generate Job Post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* AI Generated Post */}
      <Card className="w-full max-w-full shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-left text-lg font-semibold">AI Generated Post</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm px-2"
              >
                <FiCopy /> Copy
              </Button>
              <Button
                variant="outline"
                onClick={handleRegenerate}
                className="flex items-center gap-1 text-sm px-2"
              >
                <FiRefreshCw /> Regenerate
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={generatedPost}
            disabled
            rows={6}
            placeholder="Your AI-generated post will appear here..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
