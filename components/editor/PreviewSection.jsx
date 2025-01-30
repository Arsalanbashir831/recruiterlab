"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkedInPreview } from "./previews/LinkedInPreview";
import { Laptop, Smartphone } from "lucide-react";

export function PreviewSection({ post }) {
	return (
		<ScrollArea className='h-full'>
			<div className='p-4'>
				<Tabs defaultValue='mobile' className='w-full'>
					<TabsList className='gap-2 bg-transparent w-full'>
						<TabsTrigger
							value='mobile'
							className='data-[state=active]:bg-primary data-[state=active]:text-white bg-white text-gray-700 border shadow-sm'>
							<Smartphone />
						</TabsTrigger>
						<TabsTrigger
							value='desktop'
							className='data-[state=active]:bg-primary data-[state=active]:text-white bg-white text-gray-700 border shadow-sm'>
							<Laptop />
						</TabsTrigger>
					</TabsList>
					<TabsContent value='mobile'>
						<div className='max-w-[400px] mx-auto'>
							<LinkedInPreview post={post} isMobile={true} />
						</div>
					</TabsContent>
					<TabsContent value='desktop'>
						<div className='max-w-[680px] mx-auto'>
							<LinkedInPreview post={post} isMobile={false} />
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</ScrollArea>
	);
}
