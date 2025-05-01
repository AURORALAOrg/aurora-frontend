import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme

export const HeroSection = () => {
  const { theme } = useTheme(); // Access the current theme

  const backgroundStyles =
    theme === "dark" ? "bg-black text-white" : "bg-white text-black"; // Dynamic background and text color

  return (
    <div className={`py-12 ${backgroundStyles}`}>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-4 text-4xl font-bold">AI Learning Community</h1>
          <p className="max-w-2xl mb-8 text-xl">
            Connect with students from around the world, share experiences, and
            maximize your English learning with Aurora, our specialized AI.
          </p>
          <div className="flex gap-4">
            <Button
              variant="community"
              className="hover:border-light-blue-1"
            >
              Start Practicing
            </Button>
            <Button variant="clear">Explore Tools</Button>
          </div>
        </div>
      </div>
    </div>
  );
};