import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import MessageList from "./feed/MessageList";
import ComposeModal from "./compose/ComposeModal";
import BottomNav from "./navigation/BottomNav";
import SideDrawer from "./navigation/SideDrawer";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Message } from "@/types";

const Home = () => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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
  ]);

  const { profile } = useAuth();
  const { toast } = useToast();

  const handleNewMessage = async (content: string, media: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      avatar:
        profile?.avatar_url ||
        "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
      username: profile?.username || "Anonymous",
      timestamp: "Just now",
      content,
      likes: 0,
      replies: 0,
      reposts: 0,
    };

    setMessages((prev) => [newMessage, ...prev]);
    toast({
      title: "Message posted",
      description: "Your message has been posted successfully.",
    });
  };

  const handleLike = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg,
      ),
    );
  };

  const handleReply = (messageId: string) => {
    setIsComposeOpen(true);
  };

  const handleRepost = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, reposts: msg.reposts + 1 } : msg,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="pb-[60px]">
        <MessageList
          messages={messages}
          onLike={handleLike}
          onReply={handleReply}
          onRepost={handleRepost}
        />

        <div className="fixed bottom-20 right-4 md:right-8">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={() => setIsComposeOpen(true)}
          >
            <MessageSquarePlus className="h-6 w-6" />
          </Button>
        </div>

        <ComposeModal
          open={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
          onSubmit={handleNewMessage}
        />
      </main>

      <BottomNav
        activeTab={activeTab as "home" | "search" | "notifications" | "profile"}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "profile") {
            setIsSideDrawerOpen(true);
          }
        }}
      />

      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        username={profile?.username}
        avatar={profile?.avatar_url}
      />
    </div>
  );
};

export default Home;
