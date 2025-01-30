"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, FileSignature, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { usePosts } from "@/contexts/PostsContext";

export function PostCard({ post }) {
	const router = useRouter();
	const { deletePost } = usePosts();
	const [isOpen, setIsOpen] = useState(false);

	const handleEdit = () => {
		router.push(`/c/${post.id}`);
	};

	const handleDelete = () => {
		deletePost(post.id);
	};

	return (
		<div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md cursor-pointer hover:shadow-xl transition-shadow'>
			<div className='flex justify-between items-start'>
				<div className='space-y-2' onClick={() => router.push(`/c/${post.id}`)}>
					<h2 className='text-xl font-semibold line-clamp-1'>{post.title}</h2>
					<p className='text-gray-600 line-clamp-2'>{post.description}</p>
					<div className='flex items-center text-sm text-gray-500'>
						<span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
					</div>
				</div>

				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon' className='h-8 w-8'>
							<MoreVertical className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-40'>
						<DropdownMenuItem onClick={handleEdit}>
							<Pencil className='mr-2 h-4 w-4' />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem>
							<FileSignature className='mr-2 h-4 w-4' />
							Rename
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={handleDelete}
							className='text-red-600 focus:text-red-600'>
							<Trash2 className='mr-2 h-4 w-4' />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
