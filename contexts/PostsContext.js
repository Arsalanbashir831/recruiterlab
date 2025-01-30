"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PostsContext = createContext();

export function PostsProvider({ children }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const savedPosts = localStorage.getItem("posts");
		if (savedPosts) {
			setPosts(JSON.parse(savedPosts));
		}
	}, []);

	const savePost = (post) => {
		const updatedPosts = [...posts, post];
		setPosts(updatedPosts);
		localStorage.setItem("posts", JSON.stringify(updatedPosts));
	};

	const updatePost = (id, updatedPost) => {
		const updatedPosts = posts.map((post) =>
			post.id === id ? { ...post, ...updatedPost } : post
		);
		setPosts(updatedPosts);
		localStorage.setItem("posts", JSON.stringify(updatedPosts));
	};

	const deletePost = (id) => {
		const updatedPosts = posts.filter((post) => post.id !== id);
		setPosts(updatedPosts);
		localStorage.setItem("posts", JSON.stringify(updatedPosts));
	};

	return (
		<PostsContext.Provider value={{ posts, savePost, updatePost, deletePost }}>
			{children}
		</PostsContext.Provider>
	);
}

export const usePosts = () => useContext(PostsContext);
