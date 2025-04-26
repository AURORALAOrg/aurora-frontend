import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { popularDiscussions, communityAchievements } from "@/data/mock-data-community";
import { MessageCircle, Heart, Share2, ChevronRight } from "lucide-react";

export const ForumsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-8 text-white lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Discussions</h2>
          <Button variant="link" className="text-light-blue-1 hover:border-transparent">
            View all <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {popularDiscussions.map((discussion) => (
            <Card
              key={discussion.id}
              className="transition-shadow hover:shadow-md bg-dark-blue-5 border-neutral-4"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={discussion.authorAvatar}
                        alt={discussion.author}
                      />
                      <AvatarFallback>
                        {discussion.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-white">
                        {discussion.title}
                      </CardTitle>
                      <CardDescription>
                        By {discussion.author} • {discussion.timeAgo}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-500">
                    {discussion.language}
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="pt-2 flex justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {discussion.replies} replies
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {discussion.likes} likes
                  </div>
                </div>
                <Button
                  variant="clear"
                  size="sm"
                  className="text-white border-transparent"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full bg-[#3b82f6] text-white hover:bg-blue-600">
            Start New Discussion
          </Button>
        </div>
      </div>

      <div>
        <Card className="text-white bg-dark-blue-5 border-neutral-4">
          <CardHeader>
            <CardTitle>Your Progress with Aurora AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {communityAchievements.map((achievement) => {
              const IconComponent = achievement.icon;

              return (
                <div key={achievement.id} className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    {IconComponent && <IconComponent className="h-6 w-6 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <span className="text-sm text-muted-foreground">{achievement.progress}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="w-full bg-border rounded-full h-2 mt-2">
                      <div
                        className="h-2 rounded-full bg-light-blue-1"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
          <CardFooter>
            <Button
              variant="clear"
              className="w-full border border-transparent bg-light-blue-1 hover:bg-transparent"
            >
              View All Achievements
            </Button>
          </CardFooter>
        </Card>

        <Card className="mt-6 text-white bg-dark-blue-5 border-neutral-4">
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                #AuroraAI
              </Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                #AdaptiveLearning
              </Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                #PerfectPronunciation
              </Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                #EnglishWithAI
              </Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                #SimulatedConversation
              </Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                #MemorizationTechniques
              </Badge>
              <Badge variant="secondary" className="bg-blue-50 text-blue-500">
                #DailyPractice
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};