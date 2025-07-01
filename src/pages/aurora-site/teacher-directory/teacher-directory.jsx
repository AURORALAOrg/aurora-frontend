import { useState, useEffect } from "react";
import { Search, Users, Star, Clock, Filter, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TeacherCard from "@/components/teacher-directory/teacher-card";
import TeacherFilters from "@/components/teacher-directory/teacher-filters";
import TeacherStats from "@/components/teacher-directory/teacher-stats";

const mockTeachers = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/api/placeholder/80/80",
    rating: 4.9,
    totalClasses: 1250,
    languages: ["English", "Spanish"],
    levels: ["A1", "A2", "B1", "B2"],
    description: "Experienced English teacher with 8+ years helping students achieve fluency through interactive methods.",
    specialties: ["Business English", "IELTS Prep", "Conversation"],
    availability: ["Available this week", "1:1", "Group class"],
    nextAvailable: "Today 3:00 PM",
    hourlyRate: 25,
    timezone: "EST (UTC-5)"
  },
  {
    id: 2,
    name: "Marie Dubois",
    avatar: "/api/placeholder/80/80",
    rating: 4.9,
    totalClasses: 2100,
    languages: ["French", "English"],
    levels: ["A1", "A2", "B1", "B2", "+2"],
    description: "French native with expertise in DELF/DALF preparation and French literature for advanced students.",
    specialties: ["DELF/DALF", "Literature", "Pronunciation"],
    availability: ["Group class", "Weekend available"],
    nextAvailable: "Friday 2:00 PM",
    hourlyRate: 30,
    timezone: "CET (UTC+1)"
  },
  {
    id: 3,
    name: "Liu Wei",
    avatar: "/api/placeholder/80/80",
    rating: 4.9,
    totalClasses: 980,
    languages: ["Mandarin", "English"],
    levels: ["A1", "A2", "B1", "B2", "+1"],
    description: "Certified Mandarin teacher with HSK preparation expertise and traditional Chinese culture knowledge.",
    specialties: ["HSK Prep", "Culture", "Characters"],
    availability: ["Available this week", "Group class"],
    nextAvailable: "Today 6:00 PM",
    hourlyRate: 24,
    timezone: "CST (UTC+8)"
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    avatar: "/api/placeholder/80/80",
    rating: 4.8,
    totalClasses: 830,
    languages: ["Spanish", "English"],
    levels: ["A1", "A2", "B1", "B2"],
    description: "Native Spanish speaker specializing in conversational Spanish and Latin American culture.",
    specialties: ["Conversation", "Culture", "Grammar"],
    availability: ["1:1", "Group class"],
    nextAvailable: "Tomorrow 10:00 AM",
    hourlyRate: 22,
    timezone: "CST (UTC-6)"
  },
  {
    id: 5,
    name: "Anna Kowalski",
    avatar: "/api/placeholder/80/80",
    rating: 4.8,
    totalClasses: 1450,
    languages: ["Polish", "English"],
    levels: ["A1", "A2", "B1", "B2"],
    description: "Experienced Polish teacher with focus on business Polish and cultural immersion.",
    specialties: ["Business Polish", "Culture", "Grammar"],
    availability: ["Available this week", "1:1"],
    nextAvailable: "Monday 9:00 AM",
    hourlyRate: 28,
    timezone: "CET (UTC+1)"
  },
  {
    id: 6,
    name: "Hiroshi Tanaka",
    avatar: "/api/placeholder/80/80",
    rating: 4.7,
    totalClasses: 650,
    languages: ["Japanese", "English"],
    levels: ["A1", "A2", "B1"],
    description: "Japanese language instructor with expertise in JLPT preparation and Japanese business culture.",
    specialties: ["JLPT Prep", "Business Japanese", "Kanji"],
    availability: ["Group class", "Weekend available"],
    nextAvailable: "Wednesday 7:00 PM",
    hourlyRate: 32,
    timezone: "JST (UTC+9)"
  }
];

const TeacherDirectoryPage = () => {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [filteredTeachers, setFilteredTeachers] = useState(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    language: "All Languages",
    level: "All Levels",
    classType: "All Types",
    availability: "Any Time",
    sortBy: "Highest Rated"
  });

  const teachersPerPage = 6;
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const startIndex = (currentPage - 1) * teachersPerPage;
  const endIndex = startIndex + teachersPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  useEffect(() => {
    let filtered = [...teachers];

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.languages.some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase())) ||
        teacher.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Language filter
    if (filters.language !== "All Languages") {
      filtered = filtered.filter(teacher =>
        teacher.languages.includes(filters.language)
      );
    }

    // Level filter
    if (filters.level !== "All Levels") {
      filtered = filtered.filter(teacher =>
        teacher.levels.includes(filters.level)
      );
    }

    // Class type filter
    if (filters.classType !== "All Types") {
      const classTypeMap = {
        "1:1 Classes": "1:1",
        "Group Classes": "Group class"
      };
      filtered = filtered.filter(teacher =>
        teacher.availability.includes(classTypeMap[filters.classType])
      );
    }

    // Availability filter
    if (filters.availability === "Available This Week") {
      filtered = filtered.filter(teacher =>
        teacher.availability.includes("Available this week")
      );
    }

    // Sorting
    if (filters.sortBy === "Highest Rated") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "Most Classes") {
      filtered.sort((a, b) => b.totalClasses - a.totalClasses);
    } else if (filters.sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (filters.sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
    }

    setFilteredTeachers(filtered);
    setCurrentPage(1);
  }, [searchTerm, filters, teachers]);

  const availableThisWeek = teachers.filter(teacher =>
    teacher.availability.includes("Available this week")
  ).length;

  return (
    <div className="min-h-screen bg-dark-blue-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">👩‍🏫 Teacher Directory</h1>
              <p className="text-neutral-3 mt-1">
                Find the perfect teacher for your learning journey. Book 1:1 sessions or join group classes.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <TeacherStats
            totalTeachers={teachers.length}
            availableThisWeek={availableThisWeek}
            languages={25}
            averageRating={4.8}
          />
        </div>

        {/* Search and Filter Section */}
        <Card className="bg-dark-blue-5 border-dark-blue-4 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-light-blue-1" />
              Find Your Perfect Teacher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#1f2937] border border-[#374151] text-gray-300 text-sm rounded-md focus:ring-[#00b8d4] focus:border-[#00b8d4] w-full pr-3 py-2 placeholder:text-gray-400"
              />
            </div>

            {/* Filters */}
            <TeacherFilters filters={filters} setFilters={setFilters} />
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-neutral-3">
            Showing {filteredTeachers.length} teachers
            {availableThisWeek > 0 && (
              <span className="ml-4 inline-flex items-center gap-1 text-light-blue-1">
                <Clock className="w-3 h-3" />
                {availableThisWeek} available this week
              </span>
            )}
          </div>
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-neutral-3 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No teachers found</h3>
            <p className="text-neutral-3">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-dark-blue-5 border-dark-blue-4 text-white hover:bg-dark-blue-4"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-light-blue-1 text-white"
                    : "bg-dark-blue-5 border-dark-blue-4 text-white hover:bg-dark-blue-4"
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-dark-blue-5 border-dark-blue-4 text-white hover:bg-dark-blue-4"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDirectoryPage; 