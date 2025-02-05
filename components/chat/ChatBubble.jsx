export function ChatBubble({ message, isAI }) {
	
	console.log(message);
	
	return (
		<div className='flex flex-col gap-2'>
			{message.role === "user" && message.content === "leadership" && (
				<div className='rounded-xl border bg-[#F8F9FC] p-4'>
					<p className='text-sm text-gray-500'>null</p>
					<p className='text-sm'>leadership</p>
					<button className='text-sm text-gray-500 mt-2'>
						Show full message
					</button>
				</div>
			)}
			<div
				className={`relative flex w-full items-start gap-2 ${
					isAI ? "justify-start" : "justify-end"
				}`}>
				{isAI && (
					<div className='h-8 w-8 rounded-lg bg-green-500 flex items-center justify-center text-white'>
						S
					</div>
				)}
				<div
					className={`relative rounded-xl p-4 text-sm ${
						isAI ? "bg-white border shadow-sm" : "bg-[#F8F9FC] border"
					}`}>
					<div className='max-w-[240px] break-words'>{message}</div>
				</div>

				{!isAI && (
					<div className='h-8 w-8 rounded-lg bg-gray-500 flex items-center justify-center text-white'>
						U
					</div>
				)}
			</div>
		</div>
	);
}
