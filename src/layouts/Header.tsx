"use client";

import type React from "react";

import { useState } from "react";
import {
  Bell,
  Menu,
  Search,
  Settings,
  LogIn,
  LogOut,
  BookOpen,
  Lightbulb,
  Award,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import ConnectWalletButton from "@/components/ui/connect-wallet-button";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface HeaderProps {
  onMenuClick: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Course Available",
    message: "Introduction to Web3 Development is now available",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Assignment Due",
    message: "Your Blockchain Basics assignment is due tomorrow",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "3",
    title: "Achievement Unlocked",
    message: "You completed Smart Contract Security module",
    timestamp: "3 days ago",
    isRead: false,
  },
];

const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const learningOptions = [
    "grammar",
    "vocabulary",
    "speaking",
    "listening",
    "reading",
    "games",
    "courses",
    "practice",
    "challenges",
    "achievements",
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    // In a Next.js app, you would use router.push here
    console.log(`Navigating to ${page}`);
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) => ({ ...n, isRead: true }))
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowFiltered(true);
    const query = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);
    const filteredOptionsInArray = learningOptions.filter((option) =>
      option.toLowerCase().includes(query)
    );
    setFilteredOptions(filteredOptionsInArray);
  };

  const handleLogin = () => {
    console.log("Iniciando sesión...");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    setIsLoggedIn(false);
  };

  return (
    <header className="h-16 border-b border-border bg-background px-6 shadow-sm">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <Button
            size="icon"
            className="mr-4"
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center">
            <BookOpen className="h-7 w-7 text-primary mr-2" />
            <span className="text-xl font-bold text-primary hidden sm:inline">
              Aurora
            </span>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex ml-8 space-x-6">
            {["Courses", "Practice", "Resources", "Community"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  currentPage === item.toLowerCase()
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                )}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Search Input */}
        <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for courses, topics, skills..."
              className="pl-10 pr-3 py-2 rounded-full bg-muted"
              value={searchQuery}
              onChange={handleChange}
            />
          </div>
          {showFiltered && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-background border border-border rounded-lg shadow-lg cursor-pointer z-10">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    className="px-4 py-2 text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                    key={index}
                    onClick={() => {
                      setSearchQuery(option);
                      handleNavClick(option);
                      setShowFiltered(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-muted-foreground text-center">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Progress Indicator */}
          <div className="hidden md:flex items-center mr-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <div className="ml-2">
              <div className="text-xs text-muted-foreground">
                Daily Progress
              </div>
              <Progress value={75} className="w-24 h-2 mt-1" />
            </div>
          </div>

          {/* Achievements */}
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:flex rounded-full bg-primary/10 text-primary hover:bg-primary/20"
            onClick={() => handleNavClick("achievements")}
          >
            <Award className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-medium"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex justify-between items-center px-4 py-3 border-b bg-muted/50">
                <span className="font-semibold">Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto py-1"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "px-4 py-3 border-b hover:bg-muted/50 transition-colors cursor-pointer",
                        !notification.isRead ? "bg-muted/50" : ""
                      )}
                      onClick={() => handleNavClick("notifications")}
                    >
                      <div className="flex justify-between">
                        <p
                          className={cn(
                            "text-sm",
                            !notification.isRead
                              ? "font-semibold text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span className="h-2 w-2 bg-primary rounded-full"></span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground/70 mt-1 block">
                        {notification.timestamp}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-muted-foreground text-center">
                    No notifications
                  </div>
                )}
              </div>
              <div className="px-4 py-2 border-t bg-muted/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs w-full"
                  onClick={() => handleNavClick("notifications")}
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Settings */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-primary/10 text-primary hover:bg-primary/20"
            onClick={() => handleNavClick("settings")}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Profile / Login */}
          {!isLoggedIn ? (
            <Button
              variant="default"
              className="flex items-center gap-2 rounded-full"
              onClick={handleLogin}
            >
              <LogIn className="h-4 w-4" />
              <span className="text-sm font-medium">Login</span>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">User Name</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    user@example.com
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => handleNavClick("profile")}>
                    Your Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavClick("learning-path")}
                  >
                    Learning Path
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavClick("certificates")}
                  >
                    Certificates
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {address && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>Wallet:</span>
                        <span className="font-medium">
                          {truncateAddress(address)}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Wallet Connection - Only show if not on small screens and not logged in */}
          <div className="hidden sm:block">
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}
