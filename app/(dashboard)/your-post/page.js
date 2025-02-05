"use client";

import { PostCard } from "@/components/your-post/PostCard";
import { useRefresh } from "@/contexts/refreshContext";
import apiCaller from "@/helper/apiCaller";
import { Post } from "@/routes/routes";
import { useEffect, useState } from "react";

export default function YourPosts() {
  const [posts, setPosts] = useState([]);
  const {refresh , setRefresh}= useRefresh()

  const fetchPosts = async () => {
    try {
      const response = await apiCaller(Post.getPost, "GET", null, "json", true);
      if (response) {
        // Sort posts by `created_at` in descending order (latest first)
        const sortedPosts = response.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPosts(sortedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
