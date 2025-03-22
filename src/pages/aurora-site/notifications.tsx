"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
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

const NotificationCenter: React.FC = () => {
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  return (
    <div className="w-full h-screen p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div className="flex space-x-4 mb-4">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("unread")}
          variant={filter === "unread" ? "default" : "outline"}
          className={`px-4 py-2 rounded ${
            filter === "unread" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          Unread
        </Button>
        <Button
          onClick={() => setFilter("read")}
          variant={filter === "read" ? "default" : "outline"}
          className={`px-4 py-2 rounded ${
            filter === "read" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          Read
        </Button>
      </div>
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-100"
            >
              <CardContent className="p-0">
                <p className="font-semibold">{notification.title}</p>
                <p className="text-gray-600 text-sm">{notification.message}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {notification.timestamp}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
