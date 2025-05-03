import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { studyGroups } from "@/data/mock-data-community";
import {
  Users,
  BookOpen,
  Mic,
  ChevronRight,
  BarChart2,
  Zap,
} from "lucide-react";

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
                  <CardTitle className="text-white">{group.name}</CardTitle>
                </div>
                <CardDescription className="text-neutral-1/50">
                  {group.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex flex-wrap gap-2">
                  <div className="flex w-full gap-4">
                    <Badge
                      variant="outline"
                      className="border-none rounded pointer-events-none bg-light-blue-4 text-light-blue-1"
                    >
                      {group.language}
                    </Badge>
                    <div className="flex items-center text-sm text-neutral-1/50">
                      <Users className="w-4 h-4 mr-1" />
                      {group.members} members
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-none rounded pointer-events-none text-neutral-2 bg-neutral-4"
                  >
                    {group.level}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-none rounded pointer-events-none text-neutral-2 bg-neutral-4"
                  >
                    {group.meetingFrequency}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  variant="clear"
                  className="w-full border border-transparent bg-light-blue-1 hover:bg-transparent"
                >
                  Join Group
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button
            variant="clear"
            className="w-full border border-transparent bg-light-blue-1 hover:bg-transparent"
          >
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
            {[
              {
                icon: <Users className="size-4 text-light-blue-1" />,
                title: "Collaborative Learning",
                theme: "bg-[#164253]",
                subtitle: "Learn with others and stay motivated",
              },
              {
                icon: <BarChart2 className="size-4 text-[#12926d]" />,
                title: "Consistent Progress",
                theme: "bg-[#194143]",
                subtitle: "Maintain a regular study rhythm",
              },
              {
                icon: <BookOpen className="size-4 text-[#8759ef]" />,
                title: "Shared AI Practice",
                theme: "bg-[#312e59]",
                subtitle: "Share techniques and tips for using Aurora",
              },
              {
                icon: <Zap className="size-4 text-[#ed9a0b]" />,
                title: "Group Challenges",
                theme: "bg-[#473c2a]",
                subtitle: "Participate in weekly challenges with Aurora AI",
              },
            ].map(({ title, subtitle, icon, theme }, index) => (
              <div
                key={`${title}-${index}`}
                className={"flex items-center gap-3 rounded-lg"}
              >
                <span
                  className={`flex items-center justify-center rounded-lg bg-[#114d60] size-10 aspect-square ${theme}`}
                >
                  {icon}
                </span>
                <div>
                  <h4 className="text-sm font-medium">{title}</h4>
                  <p className="text-xs text-neutral-1/70">{subtitle}</p>
                </div>
              </div>
            ))}
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
                    <h4 className="text-sm font-medium">Tech Vocabulary</h4>
                    <p className="text-xs text-neutral-1/50">
                      87 members • English
                    </p>
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
                    <h4 className="text-sm font-medium">
                      Advanced Pronunciation
                    </h4>
                    <p className="text-xs text-neutral-1/50">
                      64 members • English
                    </p>
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
