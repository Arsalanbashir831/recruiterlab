"use client";
import {useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SelectStyleButton from "@/components/common/SelectStyleButton";
import apiCaller from "@/helper/apiCaller";
import { Post } from "@/routes/routes";
import { usePrompt } from "@/contexts/PromptContext";
import { useAiGeneration } from "@/contexts/AiGenerationContext";
import Spinner from "@/components/common/Spinner";


export default function CreatePost() {
	const router = useRouter();
 const {setPrompt} = usePrompt()
 const {setGeneratedContent} = useAiGeneration()
	const [content, setContent] = useState("");
	const [style, setStyle] = useState("insightful");
const [loading , setLoading] = useState(false)
	const handleGenerate = async() => {
		setLoading(true)
		const lines = content.split("\n").filter((line) => line.trim());
		setPrompt(content)
		const postResponse = await apiCaller(Post.createPost, "POST", {user_content:{'prompt':content},title:"untitled"}, "json", true);
		if (postResponse) {
			const aiGenerationResponse = await apiCaller(Post.generateAIContent(postResponse?.id), "POST", {tone:style}, "json", true);
			if (aiGenerationResponse) {
				console.log(aiGenerationResponse);
				setLoading(false)
				setGeneratedContent(aiGenerationResponse)
				router.push(`/c/${postResponse?.id}`);
		}

		
		}}

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
					<SelectStyleButton 
	style={style} 
	onSelectStyle={setStyle} 
	styleOptions={{
		insightful: "Insightful Take",
		numbered: "Numbered List",
		personal: "Personal Experience",
	}}
/>

<Button
  onClick={handleGenerate}
  disabled={loading}
  className={`ml-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out
    ${loading ? "cursor-not-allowed opacity-70" : ""}`}
  size="lg"
>
  {loading ? "Generating..." : "Generate"}
</Button>

					</div>
				</CardContent>
			</Card>
		</div>
	);
}
