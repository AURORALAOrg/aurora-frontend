import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const LessonCard = ({
  lessonNumber,
  title,
  description,
  isCompleted,
  isActive,
  score,
  totalExercises,
  onStart
}) => {
  return (
    <Card
      className={`bg-gray-800 border-gray-700 transition-all duration-200 ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-xl mb-2">
              Lesson {lessonNumber}: {title}
            </CardTitle>
            <p className="text-gray-300 text-sm">{description}</p>
          </div>
          <div className="flex  items-end space-y-2">
            {isCompleted && (
             <Badge
             variant="default"
             className="bg-green-600 text-white flex items-center space-x-1"
           >
             <span>✓</span>
             <span>Completed</span>
           </Badge>
           
            )}
            {isActive && !isCompleted && (
              <Badge
              variant="default"
              className="bg-blue-600 text-white flex items-center space-x-1"
            >
              <span>⏳</span>
              <span>In</span>
              <span>Progress</span>
            </Badge>
            
            )}
            {!isActive && !isCompleted && (
              <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                Locked
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isCompleted && score !== undefined && totalExercises && (
          <div className="mb-4 p-3 bg-gray-700 rounded-lg">
            <p className="text-green-400 font-semibold">
              Score: {score}/{totalExercises} (
              {Math.round((score / totalExercises) * 100)}%)
            </p>
          </div>
        )}

        <Button
          onClick={onStart}
          disabled={!isActive && !isCompleted}
          className={`w-full ${
            isCompleted
              ? 'bg-green-600 hover:bg-green-700'
              : isActive
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          {isCompleted
            ? 'Review Lesson'
            : isActive
            ? 'Start Lesson'
            : 'Complete Previous Lessons'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
