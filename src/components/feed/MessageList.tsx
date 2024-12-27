import { type FC } from "react";
import MessageCard from "./MessageCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@/types";

interface MessageListProps {
  messages?: Message[];
  onLike?: (messageId: string) => void;
  onReply?: (messageId: string) => void;
  onRepost?: (messageId: string) => void;
  onShare?: (messageId: string) => void;
}

const MessageList: FC<MessageListProps> = ({
  messages = [],
  onLike,
  onReply,
  onRepost,
  onShare,
}) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="h-[822px] w-full bg-gray-50 px-4 flex items-center justify-center">
        <p className="text-gray-500">No messages yet. Be the first to post!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[822px] w-full bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-4 py-4">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            avatar={message.avatar}
            username={message.username}
            timestamp={message.timestamp}
            content={message.content}
            likes={message.likes}
            replies={message.replies}
            reposts={message.reposts}
            onLike={() => onLike?.(message.id)}
            onReply={() => onReply?.(message.id)}
            onRepost={() => onRepost?.(message.id)}
            onShare={() => onShare?.(message.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
