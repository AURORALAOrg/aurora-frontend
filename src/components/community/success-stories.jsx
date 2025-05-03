import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { successStories } from "@/data/mock-data-community";

export const SuccessStories = () => {
  return (
    <div className="py-12 text-white">
      <div className="container px-4 mx-auto">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">
            Success Stories with Aurora AI
          </h2>
          <p className="max-w-2xl mx-auto text-white">
            Discover how Aurora AI is transforming the way people learn English
            with real stories from students who have significantly improved.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {successStories.map((story) => (
            <Card
              key={story.id}
              className="text-white bg-dark-blue-5 border-neutral-4"
            >
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
                  <h3 className="text-lg font-bold">{story.name}</h3>
                  <p className="mb-4 text-sm text-gray-500">
                    English Student • {story.location}
                  </p>
                  <p className="italic text-white">
                    &quot;{story.testimonial}&quot;
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="clear"
            className="border-light-blue-1 text-light-blue-1 transition-all duration-200 hover:scale-[1.01]"
          >
            View More Stories
          </Button>
        </div>
      </div>
    </div>
  );
};
