"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForumsTab } from "@/components/community/forums-tab";
import { EventsTab } from "@/components/community/events-tab";
import { StudyGroupsTab } from "@/components/community/study-groups-tab";
import { AIPracticeTab } from "@/components/community/ai-practice-tab";
import {
  Search,
  Filter,
  Bot,
  Bell,
  MessageSquare,
  Calendar,
  Users,
} from "lucide-react";

export const TabsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [_, setActiveTab] = useState("forums");

  return (
    <div className="container py-12 mx-auto text-black sm:px-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap gap-4 px-4 mb-8">
        <div className="relative flex-grow">
          <Search
            className={`absolute transform -translate-y-1/2 bg-transparent left-3 top-1/2 ${
              searchQuery ? "text-white" : "text-[#9096a0]"
            }`}
          />
          <Input
            type="search"
            placeholder="Search in community..."
            className="pl-10 h-full text-white border outline-none peer bg-dark-blue-5 border-dark-blue-4 placeholder:text-[#9096a0] ring-0 focus:border-light-blue-1 ring-offset-[-1px] !ring-light-blue-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="clear" className="flex items-center gap-1">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="clear" className="flex items-center gap-1">
            <Bot className="w-4 h-4" />
            AI Level
          </Button>
          <Button variant="clear" className="flex items-center gap-1">
            <Bell className="w-4 h-4" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs
        defaultValue="forums"
        className="px-4 mb-12 bg-transparent"
        onValueChange={setActiveTab}
      >
        <TabsList className="flex items-baseline justify-start mb-8 border-b border-b-neutral-4">
          {[
            {
              title: "Forums",
              value: "forums",
              icon: <MessageSquare className="w-4 h-4 mr-2" />,
            },
            {
              title: "Events",
              value: "events",
              icon: <Calendar className="w-4 h-4 mr-2" />,
            },
            {
              title: "Study Groups",
              value: "groups",
              icon: <Users className="w-4 h-4 mr-2" />,
            },
            {
              title: "AI Practice",
              value: "practice",
              icon: <Bot className="w-4 h-4 mr-2" />,
            },
          ].map(({ title, value, icon }) => (
            <TabsTrigger
              key={title}
              title={title}
              value={value}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white bg-white text-black border-b border-gray-300"
            >
              {icon}
              <span className="inline-block capitalize">{title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="forums">
          <ForumsTab />
        </TabsContent>
        <TabsContent value="events">
          <EventsTab />
        </TabsContent>
        <TabsContent value="groups">
          <StudyGroupsTab />
        </TabsContent>
        <TabsContent value="practice">
          <AIPracticeTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
