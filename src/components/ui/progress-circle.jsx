import { useId } from "react";

const ProgressCircle = ({
  progress,
  size = 60,
  strokeWidth = 4,
  color = "from-blue-500 to-blue-600",
  showPercentage = true,
  className = "",
}) => {
  const gradientId = useId();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Clamp progress to valid range 0-100
  const clampedProgress = Math.max(0, Math.min(100, Number(progress) || 0));

  // Calculate stroke dash offset for cleaner progress rendering
  const strokeDashoffset = circumference * (1 - clampedProgress / 100);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            stroke: `url(#${gradientId})`,
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id={gradientId}>
            <stop
              offset="0%"
              stopColor={
                color.includes("[#00C2CB]")
                  ? "#00C2CB"
                  : color.includes("blue")
                  ? "#3B82F6"
                  : color.includes("green")
                  ? "#10B981"
                  : color.includes("purple")
                  ? "#8B5CF6"
                  : color.includes("orange")
                  ? "#F59E0B"
                  : "#00C2CB"
              }
            />
            <stop
              offset="100%"
              stopColor={
                color.includes("[#00A8B0]")
                  ? "#00A8B0"
                  : color.includes("blue")
                  ? "#2563EB"
                  : color.includes("green")
                  ? "#059669"
                  : color.includes("purple")
                  ? "#7C3AED"
                  : color.includes("orange")
                  ? "#D97706"
                  : "#00A8B0"
              }
            />
          </linearGradient>
        </defs>
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;
