import { type FC } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface MessageCardProps {
  avatar?: string;
  username?: string;
  timestamp?: string;
  content?: string;
  likes?: number;
  replies?: number;
  reposts?: number;
  onLike?: () => void;
<<<<<<< HEAD
  onReply?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
=======
  onRepost?: () => void;
>>>>>>> 12e6c8fa4bb6ed453c741848e1b37f4f6a3639b7
}

const MessageCard: FC<MessageCardProps> = ({
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  username = "JohnDoe",
  timestamp = "5m ago",
  content = "This is a sample message showing how the card looks with some default content.",
<<<<<<< HEAD
  likes = 42,
  replies = 12,
  reposts = 5,
  onLike,
  onReply,
  onRepost,
  onShare,
}) => {
=======
  likes = 0,
  replies = 0,
  reposts = 0,
  onLike,
  onRepost,
}: MessageCardProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    try {
      setIsSubmitting(true);
      await api.messages.reply(content, replyContent);
      setReplyContent("");
      toast({
        description: "Reply posted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to post reply",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${username}'s message`,
        text: content,
        url: window.location.href,
      });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        toast({
          title: "Error",
          description: "Failed to share message",
          variant: "destructive",
        });
      }
    }
  };

>>>>>>> 12e6c8fa4bb6ed453c741848e1b37f4f6a3639b7
  return (
    <Card className="w-[600px] p-4 bg-white hover:bg-gray-50 transition-colors">
      <div className="flex gap-4">
        <Avatar className="h-12 w-12">
<<<<<<< HEAD
          <img
            src={avatar}
            alt={`${username}'s avatar`}
            className="object-cover"
=======
          <img 
            src={avatar} 
            alt={username} 
            className="object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback";
            }}
>>>>>>> 12e6c8fa4bb6ed453c741848e1b37f4f6a3639b7
          />
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{username}</span>
            <span className="text-gray-500 text-sm">{timestamp}</span>
          </div>

          <p className="text-gray-800 mb-4 whitespace-pre-wrap break-words">
            {content}
          </p>

          <div className="flex justify-between items-center max-w-[400px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={onLike}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{likes}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Like</TooltipContent>
              </Tooltip>
            </TooltipProvider>

<<<<<<< HEAD
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={onReply}
=======
            <Dialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{replies}</span>
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Reply</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reply to {username}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{content}</p>
                  </div>
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    onClick={handleReplySubmit}
                    disabled={isSubmitting || !replyContent.trim()}
>>>>>>> 12e6c8fa4bb6ed453c741848e1b37f4f6a3639b7
                  >
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={onRepost}
                  >
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-sm">{reposts}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Repost</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
<<<<<<< HEAD
                  <Button variant="ghost" size="sm" onClick={onShare}>
=======
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleShare}
                  >
>>>>>>> 12e6c8fa4bb6ed453c741848e1b37f4f6a3639b7
                    <Share className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MessageCard;
