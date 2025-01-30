"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatInput({ onSend, disabled }) {
	const [input, setInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!input.trim() || disabled) return;
		onSend(input);
		setInput("");
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2 p-4'>
			<Input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder='Ask any changes...'
				className='flex-1 bg-white rounded-lg border-0'
			/>
			<Button
				type='submit'
				size='icon'
				disabled={disabled || !input.trim()}
				className='h-10 w-10 rounded-lg bg-[#6B8E5D] hover:bg-[#5d7a50]'>
				<SendHorizontal className='h-5 w-5' />
			</Button>
		</form>
	);
}
