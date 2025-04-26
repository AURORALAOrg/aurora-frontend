"use client";
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForumsTab } from "@/components/community/forums-tab";
import { EventsTab } from "@/components/community/events-tab";
import { StudyGroupsTab } from "@/components/community/study-groups-tab";
import { AIPracticeTab } from "@/components/community/ai-practice-tab";
import { Search, Filter, Bot, Bell, MessageSquare, Calendar, Users } from "lucide-react";

export const TabsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [setActiveTab] = useState("forums");

  return (
    <div className="container mx-auto px-4 py-12 bg-background text-foreground">
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap gap-4 px-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search in community..."
            className="pl-10 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-1 bg-background text-foreground border border-border hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button className="flex items-center gap-1 bg-background text-foreground border border-border hover:bg-muted">
            <Bot className="h-4 w-4" />
            AI Level
          </Button>
          <Button className="flex items-center gap-1 bg-background text-foreground border border-border hover:bg-muted">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="forums" className="mb-12" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-muted text-muted-foreground">
          <TabsTrigger
            value="forums"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted text-muted-foreground border border-border"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Forums
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted text-muted-foreground border border-border"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger
            value="groups"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted text-muted-foreground border border-border"
          >
            <Users className="h-4 w-4 mr-2" />
            Study Groups
          </TabsTrigger>
          <TabsTrigger
            value="practice"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted text-muted-foreground border border-border"
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Practice
          </TabsTrigger>
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