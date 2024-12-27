<<<<<<< HEAD
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

=======
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { format } from "date-fns";
import MessageCard from "./MessageCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import type { Message } from "@/types/models";
import { useToast } from "@/components/ui/use-toast";

const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();
  const { ref, inView } = useInView();

  const fetchMessages = async (pageNum: number) => {
    try {
      setLoading(true);
      const { data, count } = await api.messages.list(pageNum);
      setMessages(prev => pageNum === 1 ? data : [...prev, ...data]);
      setHasMore(messages.length < count);
    } catch (err) {
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(1);
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prev => prev + 1);
      fetchMessages(page + 1);
    }
  }, [inView, hasMore, loading]);

  const handleLike = async (messageId: string) => {
    try {
      await api.messages.like(messageId);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, likes_count: (msg.likes_count || 0) + 1 }
            : msg
        )
      );
      toast({
        description: "Message liked successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to like message",
        variant: "destructive",
      });
    }
  };

  const handleRepost = async (messageId: string) => {
    try {
      await api.messages.repost(messageId);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, reposts_count: (msg.reposts_count || 0) + 1 }
            : msg
        )
      );
      toast({
        description: "Message reposted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to repost message",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Failed to load messages. Please try again.</p>
      </div>
    );
  }

>>>>>>> 12e6c8fa4bb6ed453c741848e1b37f4f6a3639b7
  return (
    <ScrollArea className="h-[822px] w-full bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-4 py-4">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            avatar={message.user?.avatar_url}
            username={message.user?.username}
            timestamp={format(new Date(message.created_at), 'MMM d, h:mm a')}
            content={message.content}
<<<<<<< HEAD
            likes={message.likes}
            replies={message.replies}
            reposts={message.reposts}
            onLike={() => onLike?.(message.id)}
            onReply={() => onReply?.(message.id)}
            onRepost={() => onRepost?.(message.id)}
            onShare={() => onShare?.(message.id)}
=======
            likes={message.likes_count}
            replies={message.replies_count}
            reposts={message.reposts_count}
            onLike={() => handleLike(message.id)}
            onRepost={() => handleRepost(message.id)}
>>>>>>> 12e6c8fa4bb6ed453c741848e1b37f4f6a3639b7
          />
        ))}
        {loading && (
          <>
            <MessageSkeleton />
            <MessageSkeleton />
            <MessageSkeleton />
          </>
        )}
        <div ref={ref} style={{ height: 20 }} />
      </div>
    </ScrollArea>
  );
};

<<<<<<< HEAD
=======
const MessageSkeleton = () => (
  <div className="w-[600px] p-4 bg-white rounded-lg" data-testid="message-skeleton">
    <div className="flex gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-16 w-full mb-4" />
        <div className="flex justify-between items-center max-w-[400px]">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  </div>
);

>>>>>>> 12e6c8fa4bb6ed453c741848e1b37f4f6a3639b7
export default MessageList;
