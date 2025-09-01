import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const QuickActions = ({ awardPoints }) => {
  return (
    <Card className="bg-[#0F1624] border-[#00b8d4]">
      <CardHeader>
        <CardTitle className="text-white">Quick Test Actions</CardTitle>
        <CardDescription className="text-gray-400">
          Test different point-earning scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => awardPoints("CORRECT_ANSWER")}
            variant="outline"
            className="bg-transparent border-[#34d399] text-[#34d399] hover:bg-[#34d399] hover:text-[#0F1624]"
          >
            +10 Correct Answer
          </Button>
          <Button
            onClick={() => awardPoints("LESSON_COMPLETION")}
            variant="outline"
            className="bg-transparent border-[#00b8d4] text-[#00b8d4] hover:bg-[#00b8d4] hover:text-[#0F1624]"
          >
            +50 Lesson Complete
          </Button>
          <Button
            onClick={() => awardPoints("STREAK_BONUS")}
            variant="outline"
            className="bg-transparent border-[#D97706] text-[#D97706] hover:bg-[#D97706] hover:text-white"
          >
            +25 Streak Bonus
          </Button>
          <Button
            onClick={() => awardPoints("PERFECT_LESSON")}
            variant="outline"
            className="bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-[#0F1624]"
          >
            +100 Perfect Lesson
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
