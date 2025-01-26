"use client";

import React, { useState } from "react";
import { PostDetailsDialog } from "@/components/your-post/PostDialogueComponent";
import { PostCard } from "@/components/your-post/PostCards";


export default function PostList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      image: "/testImg.jpg",
      title: "Frontend Developer",
      description: "This role involves building interactive user interfaces.",
    },
    {
      id: 2,
      image: "/testImg.jpg",
      title: "Backend Engineer",
      description: "Develop robust server-side logic and database schemas.",
    },
    {
        id: 3,
        image: "/testImg.jpg",
        title: "Frontend Developer",
        description: "This role involves building interactive user interfaces.",
      },
      {
        id: 4,
        image: "/testImg.jpg",
        title: "Backend Engineer",
        description: "Develop robust server-side logic and database schemas.",
      },
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="m-5 ">
      {/* Render Post Cards */}
      <div className="flex justify-center flex-wrap gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
            description={post.description}
            onClick={() => handlePostClick(post)}
          />
        ))}
      </div>

      {/* Render Dialog */}
      {selectedPost && (
        <PostDetailsDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          post={selectedPost}
        />
      )}
    </div>
  );
}
