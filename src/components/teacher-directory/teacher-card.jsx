import { Star, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropTypes from 'prop-types';


const TeacherCard = ({ teacher }) => {
  const {
    id,
    name,
    avatar,
    rating,
    totalClasses,
    languages,
    levels,
    description,
    specialties,
    availability,
    nextAvailable,
    hourlyRate,
    timezone
  } = teacher;

  return (
    <Card className="bg-dark-blue-5 border-dark-blue-4 hover:border-light-blue-1 transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-neutral-3 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            {/* Avatar placeholder since we don't have actual images */}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{rating}</span>
                <span className="text-neutral-400 text-sm">({totalClasses} classes)</span>
              </div>
            </div>
            <div className="text-neutral-400 text-sm">{timezone}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        {/* Languages */}
        <div className="mb-4">
          <h4 className="text-white text-md font-bold mb-2">Languages</h4>
          <div className="flex flex-wrap gap-1">
            {languages.map((language, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-[#154255] border-light-blue-1 text-light-blue-1 text-xs px-2 py-1"
              >
                {language}
              </Badge>
            ))}
          </div>
        </div>

        {/* Levels */}
        <div className="mb-4">
          <h4 className="text-white text-md font-bold mb-2">Levels</h4>
          <div className="flex flex-wrap gap-1">
            {levels.map((level, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-gray-400 text-white text-xs px-2 py-1"
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-white text-sm mb-4 line-clamp-3">{description}</p>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-white text-md font-bold mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {specialties.map((specialty, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-none text-white bg-[#0e1623] text-xs px-2 py-1"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <h4 className="text-white text-md font-bold mb-2">Availability</h4>
          <div className="flex flex-wrap gap-1">
            {availability.map((item, index) => {
              const isAvailable = item === "Available this week";
              const isOneOnOne = item === "1:1";
              const isGroup = item === "Group class";
              
              return (
                <Badge
                  key={index}
                  variant={isAvailable ? "default" : "secondary"}
                  className={`text-xs px-2 py-1 ${
                    isAvailable
                      ? "bg-[#1b453e] text-[#31ab6a] border-[#31ab6a]"
                      : isOneOnOne
                      ? "bg-[#154255] text-light-blue-1"
                      : isGroup
                      ? "bg-[#154255] text-light-blue-1"
                      : "bg-[#154255] text-light-blue-1"
                  }`}
                >
                  {item}
                </Badge>
              );
            })}
          </div>
          {nextAvailable && (
            <div className="flex items-center gap-1 text-xs text-white mt-3">
              <Clock className="w-3 h-3" />
              <span>Next available: {nextAvailable}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="text-light-blue-1">
          <span className="text-2xl font-bold">${hourlyRate}/hour</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 bg-transparent border-light-blue-1 text-light-blue-1 hover:bg-light-blue-1"
        >
          <User className="w-4 h-4 mr-2" />
          View Profile
        </Button>
        <Button
          className="flex-1 bg-light-blue-1 hover:bg-light-blue-2 text-white"
        >
          Book Class
        </Button>
      </CardFooter>
    </Card>
  );
};

TeacherCard.propTypes = {
  teacher: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    rating: PropTypes.number.isRequired,
    totalClasses: PropTypes.number.isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    levels: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
    availability: PropTypes.arrayOf(PropTypes.string).isRequired,
    nextAvailable: PropTypes.string,
    hourlyRate: PropTypes.number.isRequired,
    timezone: PropTypes.string.isRequired
  }).isRequired
};
  
export default TeacherCard; 