import React, { useState } from "react";
import MessageList from "./feed/MessageList";
import ComposeModal from "./compose/ComposeModal";
import BottomNav from "./navigation/BottomNav";
import SideDrawer from "./navigation/SideDrawer";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

interface HomeProps {
  username?: string;
  avatar?: string;
}

const Home = ({
  username = "John Doe",
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
}: HomeProps) => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <main className="pb-[60px]">
        {/* Message Feed */}
        <MessageList />

        {/* Floating Compose Button */}
        <div className="fixed bottom-20 right-4 md:right-8">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={() => setIsComposeOpen(true)}
          >
            <MessageSquarePlus className="h-6 w-6" />
          </Button>
        </div>

        {/* Compose Modal */}
        <ComposeModal
          open={isComposeOpen}
          onClose={() => setIsComposeOpen(false)}
          onSubmit={(content, media) => {
            console.log("New post:", { content, media });
            setIsComposeOpen(false);
          }}
        />
      </main>

      {/* Navigation */}
      <BottomNav
        activeTab={activeTab as "home" | "search" | "notifications" | "profile"}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "profile") {
            setIsSideDrawerOpen(true);
          }
        }}
      />

      {/* Side Drawer */}
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        username={username}
        avatar={avatar}
      />
    </div>
  );
};

export default Home;
