"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { usePosts } from "@/contexts/PostsContext";

import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ContentEditor } from "@/components/editor/ContentEditor";

export default function PostPage() {
	const params = useParams();
	const router = useRouter();
	const { toast } = useToast();
	const { posts, updatePost } = usePosts();

	const [post, setPost] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const currentPost = posts.find((p) => p.id === params.id);
		if (!currentPost) {
			return router.push("/your-post");
		}

		// Ensure post has all required sections and a default style
		const updatedPost = {
			...currentPost,
			title: currentPost.messages[0]?.content || "Untitled Post",
			sections: {
				hook: {
					id: "hook",
					type: "hook",
					content:
						currentPost.sections?.hook?.content || "Hook content goes here...",
					style: currentPost.sections?.hook?.style || "insightful",
					isEditing: false,
				},
				body: {
					id: "body",
					type: "body",
					content:
						currentPost.sections?.body?.content || "Body content goes here...",
					style: currentPost.sections?.body?.style || "insightful",
					isEditing: false,
				},
				cta: {
					id: "cta",
					type: "CTA",
					content:
						currentPost.sections?.cta?.content || "Call to action goes here...",
					style: currentPost.sections?.cta?.style || "insightful",
					isEditing: false,
				},
			},
		};

		setPost(updatedPost);
	}, [params.id, posts, router]);

	/**
	 * Handle style selection and content regeneration for a specific section.
	 */
	const handleRegenerate = async (sectionId, newStyle) => {
		if (!post || isLoading) return;
		setIsLoading(true);

		try {
			const updatedSections = {
				...post.sections,
				[sectionId]: {
					...post.sections[sectionId],
					style: newStyle,
					content: `Regenerated ${sectionId} content in ${newStyle} style...`,
				},
			};
			const updatedPost = { ...post, sections: updatedSections };
			setPost(updatedPost);
			updatePost(post.id, updatedPost);

			toast({
				title: "Section Regenerated",
				description: "The section has been regenerated successfully.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Toggle edit mode for a particular section (pencil button -> "Save" or "Edit").
	 */
	const handleToggleEdit = (sectionId) => {
		if (!post) return;

		setPost((prev) => {
			const updatedSections = { ...prev.sections };
			updatedSections[sectionId] = {
				...updatedSections[sectionId],
				isEditing: !updatedSections[sectionId].isEditing,
			};
			return { ...prev, sections: updatedSections };
		});
	};

	/**
	 * Handle direct content changes inside a section textarea.
	 */
	const handleContentChange = (sectionId, newContent) => {
		if (!post) return;

		setPost((prev) => {
			const updatedSections = { ...prev.sections };
			updatedSections[sectionId] = {
				...updatedSections[sectionId],
				content: newContent,
			};
			return { ...prev, sections: updatedSections };
		});
	};

	/**
	 * Persist changes and exit edit mode.
	 */
	const handleSave = (sectionId) => {
		if (!post || isLoading) return;
		setIsLoading(true);

		try {
			const updatedSections = { ...post.sections };
			updatedSections[sectionId] = {
				...updatedSections[sectionId],
				isEditing: false,
			};
			const updatedPost = { ...post, sections: updatedSections };
			setPost(updatedPost);
			updatePost(post.id, updatedPost);

			toast({
				title: "Changes Saved",
				description: "Your changes have been saved successfully.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Send a new message in the chat (and simulate an AI response).
	 */
	const handleSendMessage = async (message) => {
		if (!post || isLoading) return;
		setIsLoading(true);

		try {
			const userMessage = { role: "user", content: message };
			const updatedMessages = [...post.messages, userMessage];

			// Update local state first
			setPost({ ...post, messages: updatedMessages });

			// Simulate AI Response
			setTimeout(() => {
				const aiResponse = {
					role: "assistant",
					content: "Here's my response to your message...",
				};

				const withAiResponse = [...updatedMessages, aiResponse];
				const updatedPost = { ...post, messages: withAiResponse };

				setPost(updatedPost);
				updatePost(post.id, updatedPost);

				setIsLoading(false);
			}, 1000);
		} catch (error) {
			setIsLoading(false);
			toast({
				title: "Error",
				description: "Failed to send message. Please try again.",
				variant: "destructive",
			});
		}
	};

	if (!post) return null;

	return (
		<div className='flex h-[calc(100vh-0rem)] gap-6 p-6 bg-gray-100'>
			<div className='w-[350px] overflow-hidden rounded-lg border bg-background'>
				<ChatSidebar
					messages={post.messages}
					onSendMessage={handleSendMessage}
					disabled={isLoading}
				/>
			</div>

			<div className='flex-1 overflow-hidden rounded-lg border bg-background'>
				<ContentEditor
					post={post}
					onRegenerate={handleRegenerate}
					onToggleEdit={handleToggleEdit}
					onContentChange={handleContentChange}
					onSave={handleSave}
					disabled={isLoading}
				/>
			</div>
		</div>
	);
}
