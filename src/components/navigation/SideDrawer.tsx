import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  BookmarkIcon,
  Settings,
  User,
  MessageCircle,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SideDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  username?: string;
  avatar?: string;
}

const SideDrawer = ({
  isOpen = true,
  onClose = () => {},
  username = "John Doe",
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
}: SideDrawerProps) => {
  const { signOut } = useAuth();
  const menuItems = [
    { icon: <User className="h-5 w-5" />, label: "Profile", href: "/profile" },
    {
      icon: <BookmarkIcon className="h-5 w-5" />,
      label: "Bookmarks",
      href: "/bookmarks",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "Messages",
      href: "/messages",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Notifications",
      href: "/notifications",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Help Center",
      href: "/help",
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 p-0">
          <Avatar className="h-10 w-10">
            <img src={avatar} alt={username} className="object-cover" />
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-white">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4 p-4">
            <Avatar className="h-12 w-12">
              <img src={avatar} alt={username} className="object-cover" />
            </Avatar>
            <div>
              <h3 className="font-semibold">{username}</h3>
              <p className="text-sm text-gray-500">
                @{username.toLowerCase().replace(" ", "_")}
              </p>
            </div>
          </div>

          <Separator />

          <nav className="flex-1 py-4">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-4 px-4 py-2 font-normal hover:bg-gray-100"
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          <Separator />

          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-4 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideDrawer;
