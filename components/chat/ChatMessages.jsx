"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "./ChatBubble";

export function ChatMessages({ messages }) {
	const scrollRef = useRef(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);
	
	

	return (
		<ScrollArea className='h-[calc(100vh-8rem)]'>
			<div className='flex flex-col gap-4 p-4'>
				{messages?.map((message, i) => (
					<ChatBubble
						key={i}
						message={message}
						isAI={message.role === "assistant"}
					/>
				))}
				<div ref={scrollRef} />
			</div>
		</ScrollArea>
	);
}
