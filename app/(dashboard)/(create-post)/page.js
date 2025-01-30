"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePosts } from "@/contexts/PostsContext";
import SelectStyleButton from "@/components/common/SelectStyleButton";

export default function CreatePost() {
	const router = useRouter();
	const { savePost } = usePosts();
	const [content, setContent] = useState("");
	const [style, setStyle] = useState("");

	const handleGenerate = () => {
		// Generate initial sections based on content
		const lines = content.split("\n").filter((line) => line.trim());
		const title = lines[0] || "Untitled Post";
		const description = lines.slice(1, 3).join(" ");

		const newPost = {
			id: Date.now().toString(36) + Math.random().toString(36).substr(2),
			content,
			style,
			title,
			description,
			createdAt: new Date().toISOString(),
			sections: [
				{
					id: "1",
					content: "Most leaders focus on authority and control.",
					isEditing: false,
				},
				{
					id: "2",
					content: "But true leadership happens in the shadows.",
					isEditing: false,
				},
				{
					id: "3",
					content: "Leadership isn't what most people think it is.",
					isEditing: false,
				},
			],
			messages: [
				{ role: "user", content },
				{
					role: "assistant",
					content: "Here's your generated content based on your input:",
				},
			],
		};

		savePost(newPost);
		router.push(`/c/${newPost.id}`);
	};

	return (
		<div className='min-h-screen bg-gray-100 p-6 flex items-center justify-center'>
			<Card className='w-full max-w-3xl'>
				<CardContent className='p-6 space-y-4'>
					<Textarea
						placeholder='Drop your idea, article, notes or paste a URL here...'
						className='text-lg'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>

					<div className='flex items-center gap-4'>
						<SelectStyleButton style={style} onSelectStyle={setStyle} />

						<Button
							onClick={handleGenerate}
							className='ml-auto bg-green-500 hover:bg-green-600'
							size='lg'>
							Generate
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
