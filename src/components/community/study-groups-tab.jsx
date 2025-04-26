import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { studyGroups } from "@/data/mock-data-community";
import { Users, TrendingUp, Bot, Sparkles, BookOpen, Mic, ChevronRight } from "lucide-react";

export const StudyGroupsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-8 text-white lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Study Groups</h2>
          <Button
            variant="link"
            className="text-light-blue-1 hover:border-transparent"
          >
            View all <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {studyGroups.map((group) => (
            <Card
              key={group.id}
              className="transition-shadow hover:shadow-md bg-dark-blue-5 border-neutral-4"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{group.name}</CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-black">
                    {group.language}
                  </Badge>
                </div>
                <CardDescription className="text-neutral-1/50">
                  {group.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {group.members} members
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-black">
                    {group.level}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-black">
                    {group.meetingFrequency}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full bg-[#3b82f6] text-white hover:bg-blue-600">
                  Join Group
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full bg-[#3b82f6] text-white hover:bg-blue-600">
            Create New Group
          </Button>
        </div>
      </div>

      <div>
        <Card className="text-white bg-dark-blue-5 border-neutral-4">
          <CardHeader>
            <CardTitle>Benefits of Study Groups</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-white">Collaborative Learning</h4>
                <p className="text-sm text-muted-foreground">Learn with others and stay motivated</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-white">Consistent Progress</h4>
                <p className="text-sm text-muted-foreground">Maintain a regular study rhythm</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Bot className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-white">Shared AI Practice</h4>
                <p className="text-sm text-muted-foreground">Share techniques and tips for using Aurora</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Sparkles className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-white">Group Challenges</h4>
                <p className="text-sm text-muted-foreground">Participate in weekly challenges with Aurora AI</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="clear" className="w-full border-none">
              Study Group Guide
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-6 text-white bg-dark-blue-5 border-neutral-4">
          <CardHeader>
            <CardTitle>Recommended Groups for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center rounded-lg bg-[#114d60] size-10 aspect-square`}
                  >
                    <BookOpen className="text-light-blue-1 size-4" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Tech Vocabulary</h4>
                    <p className="text-xs text-muted-foreground">87 members • English</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-4 py-1 h-fit border-light-blue-1 text-light-blue-1 hover:bg-light-blue-1 hover:border-light-blue-1"
                >
                  Join
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center rounded-lg bg-[#312e59] size-10 aspect-square`}
                  >
                    <Mic className="text-purple-600 size-4" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Advanced Pronunciation</h4>
                    <p className="text-xs text-muted-foreground">64 members • English</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-4 py-1 h-fit border-light-blue-1 text-light-blue-1 hover:bg-light-blue-1 hover:border-light-blue-1"
                >
                  Join
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};