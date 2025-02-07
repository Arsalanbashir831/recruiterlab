"use client";

import { useState, useEffect, use } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePosts } from "@/contexts/PostsContext";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ContentEditor } from "@/components/editor/ContentEditor";
import { useAiGeneration } from "@/contexts/AiGenerationContext";
import apiCaller from "@/helper/apiCaller";
import { Post } from "@/routes/routes";
import { useRefresh } from "@/contexts/refreshContext";
import Spinner from "@/components/common/Spinner";

export default function PostPage({ params }) {
	const resolvedParams = use(params);
	const { toast } = useToast();
	const { updatePost } = usePosts();
	const { generatedContent, setGeneratedContent } = useAiGeneration();
	const [post, setPost] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [editedSections, setEditedSections] = useState({});
	const [promptsMessage, setPromptsMessage] = useState([]);
	const { refresh, setRefresh } = useRefresh();
	console.log("Generated AI Content:", generatedContent);

	const fetchPostPromptsMessage = async () => {
		setIsLoading(true);
		const response = await apiCaller(
			Post.getPrompts(resolvedParams.id),
			"GET",
			null,
			"json",
			true
		);
		if (response) {
			setPromptsMessage(response);
			console.log(response);
			setIsLoading(false);
		}
	};
	// Fetch post data from API
	const fetchPostData = async () => {
		try {
			const data = await apiCaller(
				Post.getPostById(resolvedParams.id),
				"GET",
				null,
				"json",
				true
			);
			setIsLoading(true);
			if (data) {
				setGeneratedContent(data);

				// Map API response to post structure
				const mappedPost = {
					id: data.id,
					title: data.title || "Untitled",
					createdAt: data.created_at,
					updatedAt: data.updated_at,
					user: data.user,
					userContent: data.user_content?.prompt || "",
					sections: {
						hook: {
							id: "hook",
							type: "hook",
							content:
								data.ai_generated_content?.hook || "Are you ready to start?",
							style: "insightful",
							isEditing: false,
						},
						body: {
							id: "body",
							type: "body",
							content:
								data.ai_generated_content?.body || "Content goes here...",
							style: "insightful",
							isEditing: false,
						},
						call_to_action: {
							id: "call_to_action",
							type: "CTA",
							content:
								data.ai_generated_content?.call_to_action ||
								"Call to action goes here...",
							style: "insightful",
							isEditing: false,
						},
					},
					images: data.images || [],
					messages: [],
				};

				setPost(mappedPost);
			}
		} catch (error) {
			console.error("Error fetching post data:", error);
			toast({
				title: "Error",
				description: "Failed to load post data.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPostData();
		fetchPostPromptsMessage();
	}, [resolvedParams.id, refresh]);

	/**
	 * Toggle edit mode for a section.
	 */
	const handleToggleEdit = (sectionId) => {
		if (!post) return;

		setPost((prev) => ({
			...prev,
			sections: {
				...prev.sections,
				[sectionId]: {
					...prev.sections[sectionId],
					isEditing: !prev.sections[sectionId].isEditing,
				},
			},
		}));
	};

	/**
	 * Handle content change inside a section.
	 */
	const handleContentChange = (sectionId, newContent) => {
		if (!post) return;

		setPost((prev) => ({
			...prev,
			sections: {
				...prev.sections,
				[sectionId]: {
					...prev.sections[sectionId],
					content: newContent,
				},
			},
		}));

		// Track edited sections to send minimal data in API call
		setEditedSections((prev) => ({
			...prev,
			[sectionId]: newContent,
		}));
	};

	/**
	 * Save changes to the backend and exit edit mode.
	 */
	const handleSave = async (sectionId) => {
		if (!post || isLoading) return;
		setIsLoading(true);

		try {
			const updatedContent = editedSections[sectionId];
			if (!updatedContent) {
				setIsLoading(false);
				return;
			}

			// Map sectionId to the correct API attribute name
			const sectionMapping = {
				hook: "hook",
				body: "body",
				call_to_action: "call_to_action",
			};

			// Create payload dynamically based on sectionId while preserving other attributes
			const payload = {
				ai_generated_content: {
					hook: post.sections.hook.content, // Keep existing content
					body: post.sections.body.content,
					call_to_action: post.sections.call_to_action.content,
					[sectionMapping[sectionId]]: updatedContent, // Update only the edited section
				},
			};

			// Call API to update the entire post with modified data
			await apiCaller(Post.updatePost(post.id), "PUT", payload, "json", true);

			// Update local state after saving
			const updatedSections = {
				...post.sections,
				[sectionId]: {
					...post.sections[sectionId],
					isEditing: false,
				},
			};

			const updatedPost = { ...post, sections: updatedSections };
			setPost(updatedPost);
			updatePost(post.id, updatedPost);

			// Remove saved section from tracking
			setEditedSections((prev) => {
				const newSections = { ...prev };
				delete newSections[sectionId];
				return newSections;
			});

			toast({
				title: "Changes Saved",
				description: "Your changes have been saved successfully.",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to save changes.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleRegenerate = async (sectionId, selectedStyle) => {
		if (!post || isLoading) return;
		setIsLoading(true);

		try {
			// API payload structure
			const payload = {
				prompt: selectedStyle, // Selected style (e.g., "insightful", "personal experience")
				section: sectionId, // Section to regenerate (hook, body, cta)
			};

			// Call API to regenerate the specific section
			const aiResponse = await apiCaller(
				Post.regeneratePostSection(post.id),
				"POST",
				payload,
				"json",
				true
			);

			if (aiResponse && aiResponse.ai_content) {
				// Update the section with newly generated AI content
				const updatedSections = {
					...post.sections,
					[sectionId]: {
						...post.sections[sectionId],
						content: aiResponse.ai_content, // Use new AI-generated content
					},
				};

				const updatedPost = { ...post, sections: updatedSections };
				setPost(updatedPost);
				updatePost(post.id, updatedPost);

				toast({
					title: "Section Regenerated",
					description: "The section has been successfully regenerated.",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to regenerate content.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};
	const handleSendMessage = async (message) => {
		if (!post) return;
		setIsLoading(true);
		try {
			// Call API to send a message
			const response = await apiCaller(
				Post.chatPrompt(resolvedParams.id),
				"POST",
				{ prompt: message },
				"json",
				true
			);

			if (response) {
				const updatedMessages = [...post.messages, response];

				setPost((prev) => ({ ...prev, messages: updatedMessages }));
				setRefresh(!refresh);
			}
		} catch (error) {
			console.error("Error sending message:", error);
			toast({
				title: "Error",
				description: "Failed to send message.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleTitleChange = async (title) => {
		console.log(title);
		await apiCaller(
			Post.updatePost(resolvedParams.id),
			"PUT",
			{ title: title },
			"json",
			true
		);
	};

	if (!post)
		return (
			<div className='flex items-center justify-center h-screen'>
				Loading post...
			</div>
		);

	return (
		<div className='flex h-[calc(100vh-0rem)] gap-6 p-6 bg-gray-100'>
			<div className='w-[350px] overflow-hidden rounded-lg border bg-background'>
				<ChatSidebar
					isLoading={isLoading}
					onSendMessage={handleSendMessage}
					messages={promptsMessage}
					disabled={isLoading}
				/>
			</div>

			<div className='flex-1 overflow-hidden rounded-lg border bg-background'>
				{isLoading ? (
					<>
						{" "}
						<Spinner />{" "}
					</>
				) : (
					<>
						<ContentEditor
							post={post}
							onToggleEdit={handleToggleEdit}
							onContentChange={handleContentChange}
							onSave={handleSave}
							disabled={isLoading}
							onRegenerate={handleRegenerate}
							onTitleChange={handleTitleChange}
						/>
					</>
				)}
			</div>
		</div>
	);
}
