"use client";

import type React from "react";

import { useState } from "react";
import {
  BarChart2,
  Book,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Gamepad,
  GraduationCap,
  Headphones,
  Home,
  MessageCircle,
  MessageSquare,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import Image from "next/image";
import sIcon from "@/assets/S-icon-Photoroom.png";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  headerHeight: number;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  page: string;
}

interface CategoryItem {
  icon: React.ReactNode;
  label: string;
}

export default function Sidebar({
  isOpen,
  onClose,
  headerHeight,
}: SidebarProps) {
  const [currentPage, setCurrentPage] = useState("home");
  const [level, setLevel] = useState("Choose Your Level");
  const [isLearningExpanded, setIsLearningExpanded] = useState(false);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    // In Next.js, you would use router.push here
    console.log(`Navigating to ${page}`);
    onClose();
  };

  const categories: CategoryItem[] = [
    { icon: <Book className="w-5 h-5" />, label: "Grammar" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Vocabulary" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Speaking" },
    { icon: <Headphones className="w-5 h-5" />, label: "Listening" },
    { icon: <FileText className="w-5 h-5" />, label: "Reading" },
    { icon: <Gamepad className="w-5 h-5" />, label: "Games" },
  ];

  const topNavItems: NavItem[] = [
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Analytics",
      page: "analytics",
    },
    { icon: <Users className="w-5 h-5" />, label: "Community", page: "people" },
  ];

  return (
    <div
      className={cn(
        "fixed left-0 z-50 transform transition-transform bg-background w-64 h-full shadow-lg border-r border-border",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      style={{ top: headerHeight }}
    >
      <ScrollArea className="h-full">
        <div className="p-4 flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 relative">
              <Image
                src={sIcon || "/placeholder.svg"}
                alt="S Logo"
                width={55}
                height={55}
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            <Button
              variant={currentPage === "/" ? "secondary" : "default"}
              className="justify-start bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => handleNavClick("/")}
            >
              <Home className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">Home</span>
            </Button>

            <Collapsible
              open={isLearningExpanded}
              onOpenChange={setIsLearningExpanded}
              className="mb-2"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="default"
                  className="justify-between w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Learning content
                    </span>
                  </div>
                  {isLearningExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-2 ml-2">
                <div className="px-3 mb-4">
                  <h2 className="text-xs font-semibold mb-2 text-muted-foreground">
                    LEVEL
                  </h2>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="w-full bg-blue-600 text-white border-blue-700">
                      <SelectValue placeholder="Choose Your Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Choose Your Level">
                        Choose Your Level
                      </SelectItem>
                      <SelectItem value="A1">A1</SelectItem>
                      <SelectItem value="A2">A2</SelectItem>
                      <SelectItem value="B1">B1</SelectItem>
                      <SelectItem value="B2">B2</SelectItem>
                      <SelectItem value="C1">C1</SelectItem>
                      <SelectItem value="C2">C2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="px-3">
                  <h2 className="text-xs font-semibold mb-2 text-muted-foreground">
                    CATEGORIES
                  </h2>
                  <div className="flex flex-col gap-1">
                    {categories.map((item, index) => (
                      <Button
                        key={index}
                        variant="default"
                        className="justify-start bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() =>
                          handleNavClick(`category-${item.label.toLowerCase()}`)
                        }
                      >
                        {item.icon}
                        <span className="text-sm ml-3">{item.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {topNavItems.map((item, index) => (
              <Button
                key={index}
                variant={currentPage === "/" ? "secondary" : "default"}
                className="justify-start bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => handleNavClick(item.page)}
              >
                {item.icon}
                <span className="text-sm font-medium ml-3">{item.label}</span>
              </Button>
            ))}
          </nav>

          <div className="py-16 space-y-3 flex flex-col">
            <Button
              variant="default"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <Link href="/aurora-chat" passHref>
                <div className="flex items-center w-full">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Talk with Aurora</span>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
