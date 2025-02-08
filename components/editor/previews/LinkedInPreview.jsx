"use client";

import { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Repeat2, Send } from "lucide-react";
import { formatContent } from "@/lib/utils";
import { AuthContext } from "@/contexts/AuthContext";

export function LinkedInPreview({ post, isMobile }) {
	const [expanded, setExpanded] = useState(false);
	const {userInfo}= useContext(AuthContext)
	const content = formatContent(post);
	const truncatedContent = content.slice(0, 150);
	const avatarInitial = userInfo?.username?.charAt(0).toUpperCase() || "?";

	const exceedsLimit = content.length > 100;

	return (
		<div className={`border rounded-lg bg-white ${isMobile ? "text-sm" : ""}`}>
			{/* Post Header */}
			<div className='p-4 border-b'>
				<div className='flex items-center gap-3'>
					<Avatar className='h-12 w-12'>
						<AvatarImage src='/placeholder.svg' />
						<AvatarFallback>{avatarInitial}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className='font-semibold'>{userInfo?.username}</h3>
						<p className='text-sm text-muted-foreground'>
							user profile headline
						</p>
					</div>
				</div>
			</div>

			{/* Post Content */}
			<div className='p-4 flex flex-col'>
				<h2 className='text-xl font-semibold mb-4'>{post.title}</h2>

				<div className='whitespace-pre-wrap'>
					{expanded ? content : truncatedContent}
					{!expanded && exceedsLimit && "..."}
				</div>

				{exceedsLimit && (
					<Button
						variant='link'
						className='p-0 mt-1 self-end'
						onClick={() => setExpanded((prev) => !prev)}>
						{expanded ? "...see less" : "...see more"}
					</Button>
				)}
			</div>

			{/* Engagement Metrics */}
			<div className='px-4 py-2 border-t border-b text-sm text-muted-foreground'>
				<div className='flex items-center gap-1'>
					👍 😊 🎉<span className='ml-1'>10 comments • 50 reposts</span>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='p-2 grid grid-cols-4 gap-1'>
				<Button variant='ghost' size='sm' className='w-full'>
					<Heart className='h-4 w-4 mr-2' />
					Like
				</Button>
				<Button variant='ghost' size='sm' className='w-full'>
					<MessageSquare className='h-4 w-4 mr-2' />
					Comment
				</Button>
				<Button variant='ghost' size='sm' className='w-full'>
					<Repeat2 className='h-4 w-4 mr-2' />
					Repost
				</Button>
				<Button variant='ghost' size='sm' className='w-full'>
					<Send className='h-4 w-4 mr-2' />
					Send
				</Button>
			</div>
		</div>
	);
}
