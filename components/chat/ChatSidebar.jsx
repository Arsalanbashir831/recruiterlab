import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export function ChatSidebar({ messages, onSendMessage, disabled }) {
	return (
		<div className='flex h-full flex-col border-r bg-white'>
			<div className='flex-1 overflow-hidden relative'>
				<ChatMessages messages={messages} />
			</div>
			<div className='mt-auto border-t bg-gray-200'>
				<ChatInput onSend={onSendMessage} disabled={disabled} />
			</div>
		</div>
	);
}
