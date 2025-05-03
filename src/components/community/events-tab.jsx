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
import { upcomingEvents } from "@/data/mock-data-community";
import {
  Users,
  Calendar,
  Share2,
  ChevronRight,
  MessageSquare,
  LaptopIcon,
  BookOpen,
} from "lucide-react";

export const EventsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-8 text-white lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Button
            variant="link"
            className="text-light-blue-1 hover:border-transparent"
          >
            View calendar <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className="transition-shadow hover:shadow-md bg-dark-blue-5 border-neutral-4"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg text-white">
                      {event.title}
                    </CardTitle>
                    <CardDescription>
                      {event.date} • {event.time}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="default"
                    className="border-none pointer-events-none bg-light-blue-1"
                  >
                    {event.type === "online" ? "Online" : "In-person"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-none rounded pointer-events-none bg-light-blue-4 text-light-blue-1"
                  >
                    {event.language}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-none rounded pointer-events-none text-neutral-2 bg-neutral-4"
                  >
                    {event.level}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {event.participants} participants
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex gap-2">
                  <Button
                    variant="clear"
                    size="sm"
                    className="px-0 border-none text-neutral-6"
                  >
                    <Calendar />
                    Add to calendar
                  </Button>
                  <Button
                    variant="clear"
                    size="sm"
                    className="px-0 border-none text-neutral-6"
                  >
                    <Share2 />
                    Share
                  </Button>
                </div>
                <Button
                  className="bg-light-blue-1 hover:border-light-blue-1 hover:text-light-blue-1 hover:bg-transparent"
                  size="sm"
                >
                  Register
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button variant="clear" className="w-full border border-transparent bg-light-blue-1 hover:bg-transparent">View All Events</Button>
        </div>
      </div>

      <div>
        <Card className="text-white bg-dark-blue-5 border-neutral-4">
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                icon: <LaptopIcon className="size-4 text-light-blue-1" />,
                title: "Learning Webinars",
                subtitle: "Learn advanced techniques with experts",
              },
              {
                icon:  <BookOpen className="size-4 text-light-blue-1" />,
                title: "AI Demonstrations",
                subtitle: "Discover Aurora&apos;s new features",
              },
              {
                icon:<Users className="size-4 text-light-blue-1" />,
                title: "Group Practice Sessions",
                subtitle: "Practice with other students and AI",
              },
              {
                icon:  <MessageSquare className="size-4 text-light-blue-1" />,
                title: "Q&A Sessions",
                subtitle: "Resolve your doubts about using Aurora AI",
              },
            ].map(({ title, subtitle, icon }, index) => (
              <div
                key={`${title}-${index}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-dark-blue-1 hover:bg-[#173244]"
              >
                <span className="flex items-center justify-center rounded-lg bg-[#114d60] size-10 aspect-square">
                  {icon}
                </span>
                <div>
                  <h4 className="text-sm font-medium">{title}</h4>
                  <p className="text-xs text-neutral-1/70">{subtitle}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6 text-white bg-dark-blue-5 border-neutral-4">
          <CardHeader>
            <CardTitle>Featured Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center justify-center text-center text-white rounded-lg aspect-square size-16 bg-[#4f47e6]">
                  <div className="text-sm">JUN</div>
                  <div className="text-xl font-bold">15</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Aurora AI Summit 2023</h4>
                  <p className="text-xs text-neutral-1/50">
                    Virtual conference on the future of AI learning
                  </p>
                  <Badge variant="outline" className="mt-1 border-none rounded pointer-events-none text-neutral-2 bg-neutral-4">
                    Main event
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center justify-center text-center text-white rounded-lg aspect-square size-16 bg-green">
                  <div className="text-sm">JUL</div>
                  <div className="text-xl font-bold">08</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium">AI Practice Marathon</h4>
                  <p className="text-xs text-neutral-1/50">
                    12 hours of intensive practice with Aurora
                  </p>
                  <Badge variant="outline" className="border-none rounded pointer-events-none text-neutral-2 bg-neutral-4">
                    All levels
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
