"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentSection } from "./ContentSection";
import { PreviewSection } from "./PreviewSection";
import { Copy } from "lucide-react";
import { formatContent } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function ContentEditor({
	post,
	onRegenerate,
	onToggleEdit,
	onContentChange,
	onSave,
	disabled,
}) {
	const [activeTab, setActiveTab] = useState("content");
	const { toast } = useToast();

	const handleCopy = () => {
		const content = formatContent(post);
		navigator.clipboard.writeText(content);
		toast({
			title: "Content copied to clipboard",
			description: "You can now paste it anywhere",
		});
	};

	return (
		<div className='flex flex-col h-full min-h-0'>
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className='flex-1 flex flex-col min-h-0'>
				{/* Top Bar */}
				<div className='flex items-center justify-between border-b p-4'>
					<TabsList className='gap-2 bg-transparent'>
						<TabsTrigger
							value='content'
							className='data-[state=active]:bg-primary data-[state=active]:text-white bg-white text-gray-700 border shadow-sm'>
							Content
						</TabsTrigger>
						<TabsTrigger
							value='preview'
							className='data-[state=active]:bg-primary data-[state=active]:text-white bg-white text-gray-700 border shadow-sm'>
							Preview
						</TabsTrigger>
					</TabsList>

					<div className='flex gap-2'>
						<Button
							variant='outline'
							size='sm'
							className='gap-2'
							onClick={handleCopy}>
							<Copy className='h-4 w-4' />
							Copy
						</Button>
					</div>
				</div>

				{/* CONTENT TAB */}
				<TabsContent
					value='content'
					className='flex-1 min-h-0 flex flex-col overflow-hidden data-[state=inactive]:hidden'>
					{/* Title Section: Moved inside content tab */}
					<div className='border-b p-4'>
						<input
							type='text'
							value={post.title}
							placeholder='Enter title...'
							className='w-full text-xl font-semibold outline-none bg-transparent'
							readOnly
						/>
					</div>

					{/* Scrollable area */}
					<ScrollArea className='h-full'>
						<div className='p-4'>
							{Object.values(post.sections).map((section) => (
								<ContentSection
									key={section.id}
									section={section}
									onRegenerate={onRegenerate}
									onToggleEdit={onToggleEdit}
									onContentChange={onContentChange}
									onSave={onSave}
									disabled={disabled}
								/>
							))}
						</div>
					</ScrollArea>
				</TabsContent>

				{/* PREVIEW TAB */}
				<TabsContent
					value='preview'
					className='flex-1 min-h-0 flex flex-col overflow-hidden data-[state=inactive]:hidden'>
					{/* Title is NOT repeated here, so no tall space  */}
					<PreviewSection post={post} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
