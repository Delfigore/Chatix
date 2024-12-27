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

interface MessageCardProps {
  avatar?: string;
  username?: string;
  timestamp?: string;
  content?: string;
  likes?: number;
  replies?: number;
  reposts?: number;
  onLike?: () => void;
  onReply?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
}

const MessageCard: FC<MessageCardProps> = ({
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  username = "JohnDoe",
  timestamp = "5m ago",
  content = "This is a sample message showing how the card looks with some default content.",
  likes = 42,
  replies = 12,
  reposts = 5,
  onLike,
  onReply,
  onRepost,
  onShare,
}) => {
  return (
    <Card className="w-[600px] p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex gap-4">
        <Avatar className="h-12 w-12">
          <img
            src={avatar}
            alt={`${username}'s avatar`}
            className="object-cover"
          />
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{username}</span>
            <span className="text-gray-500 text-sm">{timestamp}</span>
          </div>

          <p className="text-gray-800 mb-4">{content}</p>

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

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={onReply}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{replies}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reply</TooltipContent>
              </Tooltip>
            </TooltipProvider>

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
                  <Button variant="ghost" size="sm" onClick={onShare}>
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
