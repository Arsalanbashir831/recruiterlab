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
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import apiCaller from "@/helper/apiCaller";
import { Post } from "@/routes/routes";
import { useToast } from "@/hooks/use-toast";
import { usePosts } from "@/contexts/PostsContext";
import { useRefresh } from "@/contexts/refreshContext";

export function PostCard({ post }) {
	const router = useRouter();
	const { toast } = useToast();
const {refresh , setRefresh} = useRefresh()
	const [isDeleting, setIsDeleting] = useState(false);

	const handleEdit = () => {
		router.push(`/c/${post.id}`);
	};

	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		setIsDeleting(true);
		try {
			await apiCaller(Post.deletePost(post.id), "DELETE", null, "json", true);
			
			toast({
				title: "Post Deleted",
				description: "The post has been successfully deleted.",
			});
			
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to delete the post. Please try again.",
				variant: "destructive",
			});
		} finally {
			setRefresh(!refresh)
			setIsDeleting(false);
		}
	};

	return (
		<div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-md cursor-pointer hover:shadow-xl transition-shadow'>
			<div className='flex justify-between items-start'>
				<div className='space-y-2' onClick={() => router.push(`/c/${post.id}`)}>
					<h2 className='text-xl font-semibold line-clamp-1'>{post.title}</h2>
					<p className='text-gray-600 line-clamp-2'>{post.description}</p>
					<div className='flex items-center text-sm text-gray-500'>
						<span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
					</div>
				</div>

				<DropdownMenu>
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
						<DropdownMenuItem
							onClick={handleDelete}
							disabled={isDeleting}
							className='text-red-600 focus:text-red-600'>
							<Trash2 className='mr-2 h-4 w-4' />
							{isDeleting ? "Deleting..." : "Delete"}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
