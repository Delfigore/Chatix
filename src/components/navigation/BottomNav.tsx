import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, Bell, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BottomNavProps {
  activeTab?: "home" | "search" | "notifications" | "profile";
  onTabChange?: (tab: string) => void;
}

const BottomNav = ({
  activeTab = "home",
  onTabChange = () => {},
}: BottomNavProps) => {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-200 px-4">
      <div className="max-w-screen-xl mx-auto h-full">
        <div className="flex justify-around items-center h-full">
          {navItems.map(({ id, icon: Icon, label }) => (
            <TooltipProvider key={id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === id ? "default" : "ghost"}
                    size="icon"
                    className={`w-12 h-12 rounded-full ${
                      activeTab === id
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => onTabChange(id)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
