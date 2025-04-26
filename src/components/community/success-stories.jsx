import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { successStories } from "@/data/mock-data-community";
export const SuccessStories = () => {
  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Success Stories with Aurora AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how Aurora AI is transforming the way people learn English with real stories from students who have
            significantly improved.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {successStories.map((story) => (
            <Card key={story.id} className="bg-card">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-4 bg-dark-blue-4">
                    <AvatarImage
                      src={story.avatar}
                      alt={story.name}
                      className="text-xs italic text-center align-middle"
                    />
                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{story.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">English Student • {story.location}</p>
                  <p className="text-muted-foreground italic">&quot;{story.testimonial}&quot;</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="bg-card text-foreground hover:bg-muted">
            View More Stories
          </Button>
        </div>
      </div>
    </div>
  );
};