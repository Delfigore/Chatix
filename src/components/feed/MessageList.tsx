import React from "react";
import MessageCard from "./MessageCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  avatar: string;
  username: string;
  timestamp: string;
  content: string;
  likes: number;
  replies: number;
  reposts: number;
}

interface MessageListProps {
  messages?: Message[];
}

const MessageList = ({ messages = defaultMessages }: MessageListProps) => {
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
          />
        ))}
      </div>
    </ScrollArea>
  );
};

const defaultMessages: Message[] = [
  {
    id: "1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    username: "Alice",
    timestamp: "2m ago",
    content:
      "Just launched my new project! 🚀 Super excited to share it with everyone!",
    likes: 24,
    replies: 8,
    reposts: 3,
  },
  {
    id: "2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    username: "Bob",
    timestamp: "15m ago",
    content: "Beautiful day for coding outside ☀️ #developerlife",
    likes: 15,
    replies: 4,
    reposts: 1,
  },
  {
    id: "3",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    username: "Charlie",
    timestamp: "1h ago",
    content: "Who else is learning React? Let's connect and share tips! 💡",
    likes: 56,
    replies: 23,
    reposts: 7,
  },
];

export default MessageList;
