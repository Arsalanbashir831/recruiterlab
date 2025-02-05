import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import Spinner from "../common/Spinner";

export function ChatSidebar({ messages, onSendMessage, disabled , isLoading }) {
	return (
		<div className='flex h-full flex-col border-r bg-white'>
			<div className='flex-1 overflow-hidden relative'>
				{isLoading ? <> <Spinner/> </>:<>
					<ChatMessages messages={messages.map((msg) => msg.prompt || "No response available")} />
				</>}
				
			</div>
			<div className='mt-auto border-t bg-gray-200'>
				<ChatInput onSend={onSendMessage} disabled={disabled} />
			</div>
		</div>
	);
}
