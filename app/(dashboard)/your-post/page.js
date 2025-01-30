"use client";

import { usePosts } from "@/contexts/PostsContext";
import { PostCard } from "@/components/your-post/PostCard";

export default function YourPosts() {
	const { posts } = usePosts();

	return (
		<div className='min-h-screen bg-gray-100 p-6'>
			<div className='max-w-7xl mx-auto'>
				<h1 className='text-4xl font-bold mb-8'>My Posts</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{posts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</div>
	);
}
