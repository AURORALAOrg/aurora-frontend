const ActivityChart = ({ data }) => {
  const maxPoints = data.length > 0 ? Math.max(...data.map(d => d.points || 0)) : 0;

  // Calculate summary statistics dynamically from data
  const totalPoints = data.reduce((sum, day) => sum + (day.points || 0), 0);
  const totalExercises = data.reduce((sum, day) => sum + (day.exercises || 0), 0);
  const totalStudyTime = data.reduce((sum, day) => sum + (day.studyTime || 0), 0);

  return (
    <div className="space-y-4">
      {/* Points Chart */}
      <div>
        <div className="flex items-end gap-2 h-32">
          {data.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center" role="img" aria-label={`${day.day}: ${day.points} points`}>
              <div
                className="w-full bg-light-blue-1"
                style={{ height: `${(day.points / maxPoints) * 100}%`, minHeight: '4px' }}
                title={`${day.points} points on ${day.day}`}
              />
              <span className="text-xs text-neutral-3 mt-1">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 text-center">
        <div>
          <div className="text-xl font-bold text-light-blue-1">{totalPoints}</div>
          <div className="text-sm text-neutral-3">Total Points</div>
        </div>
        <div>
          <div className="text-xl font-bold text-light-blue-1">{totalExercises}</div>
          <div className="text-sm text-neutral-3">Exercises</div>
        </div>
        <div>
          <div className="text-xl font-bold text-light-blue-1">{totalStudyTime}h</div>
          <div className="text-sm text-neutral-3">Study Time</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart; 