import { Card, CardContent } from "@/components/ui/card";

const TeacherStats = ({ totalTeachers, languages, averageRating }) => {
  const stats = [
    {
      value: `${totalTeachers}+`,
      label: "Expert Teachers",
      bgColor: "bg-light-blue-1"
    },
    {
      value: `${languages}+`,
      label: "Languages",
      bgColor: "bg-light-blue-1"
    },
    {
      value: `${averageRating}★`,
      label: "Average Rating",
      bgColor: "bg-light-blue-1"
    },
    {
      value: "24/7",
      label: "Availability",
      bgColor: "bg-light-blue-1"
    }
  ];

  return (
    <Card className="bg-light-blue-1 border-0 mb-6 rounded-none">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white text-sm opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherStats; 