interface PasswordStrengthIndicatorProps {
  strength: number;
}

export default function PasswordStrengthIndicator({
  strength,
}: PasswordStrengthIndicatorProps) {
  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 0:
        return "Too weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return "bg-destructive";
      case 1:
        return "bg-destructive";
      case 2:
        return "bg-secondary";
      case 3:
        return "bg-tertiary";
      case 4:
        return "bg-tertiary";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-full flex-1 rounded-full transition-all ${
              index <= strength ? getStrengthColor(strength) : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength:{" "}
        <span className="font-medium">{getStrengthLabel(strength)}</span>
      </p>
    </div>
  );
}
