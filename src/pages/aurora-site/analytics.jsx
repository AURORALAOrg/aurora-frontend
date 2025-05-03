import {
  Award,
  BarChart2,
  BookOpen,
  Clock,
  FileText,
  Folder,
  Image,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Reused components with dark theme
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`p-5 rounded-lg ${color} text-white shadow-md`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

const SimpleLineChart = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const points = data.map((d, i) => ({
    x: (i * 300) / (data.length - 1),
    y: 150 - (d.value * 150) / maxValue,
  }));

  const path = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    return `${acc} L ${point.x},${point.y}`;
  }, "");

  return (
    <svg width="300" height="150" className="w-full">
      <path d={path} stroke="#2563eb" strokeWidth="2" fill="none" />
      {points.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="3" fill="#2563eb" />
      ))}
      {/* Add a subtle area fill under the line */}
      <path
        d={`${path} L ${points[points.length - 1].x},150 L ${points[0].x},150 Z`}
        fill="#2563eb"
        opacity="0.1"
      />
    </svg>
  );
};

const ProgressBar = ({ value, label }) => (
  <div className="mt-4">
    <div className="flex justify-between text-sm text-gray-300 mb-1.5">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-gray-800 rounded-full">
      <div
        className="h-full bg-[#2563eb] rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const CourseCard = ({ title, description, slides, imageSrc, microBadge }) => (
  <div className="p-4 bg-[#111827] rounded-lg border border-gray-700 flex items-start gap-4 shadow-md">
    {/* Image or Icon */}
    <div className="w-16 h-16 rounded flex-shrink-0 flex items-center justify-center">
      {microBadge ? (
        <div className="text-[#06b6d4] p-2">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M7 8h10M7 12h4m1 8l4-4m4 4v-4m-4 4h4m-11-4l-4 4m0-4v4m4 0H4m8-16c1.1046 0 2 .89543 2 2v6c0 1.1046-.8954 2-2 2s-2-.8954-2-2V6c0-1.10457.8954-2 2-2z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <img
          src={imageSrc || "/api/placeholder/160/160"}
          alt={`${title} Image`}
          className="w-full h-full object-cover"
        />
      )}
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
      <p className="text-xs text-gray-500 mt-2 flex items-center">
        <FileText size={14} className="mr-1.5" />
        {slides} Slides
      </p>
    </div>
  </div>
);


// Updated dark-themed header component
const Header = () => (
  <header>
  </header>
);

// Modified Analytics Content with dark theme
const performanceData = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 50 },
  { month: "May", value: 45 },
];

const AnalyticsContent = () => {
  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Certifications"
          value="4"
          icon={Award}
          color="bg-[#3b82f6]"
        />
        <StatCard 
          title="NFTs" 
          value="2" 
          icon={Image} 
          color="bg-[#06b6d4]" 
        />
        <StatCard
          title="Total learning time"
          value="40"
          icon={Clock}
          color="bg-[#ec4899]"
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111827] p-5 rounded-lg border border-gray-800 shadow-md">
          <h2 className="font-medium text-white mb-4">Progress</h2>
          <div className="flex justify-center">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  strokeDasharray="100.5"
                  strokeDashoffset="30.15"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                70%
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="text-gray-400">Remaining</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2563eb]" />
              <span className="text-gray-400">Level achieved</span>
            </div>
          </div>
        </div>

        <div className="bg-[#111827] p-5 rounded-lg border border-gray-800 shadow-md">
          <h2 className="font-medium text-white mb-4">Monthly performance</h2>
          <SimpleLineChart data={performanceData} />
          <div className="flex justify-between mt-3 text-xs text-gray-400">
            {performanceData.map((item, index) => (
              <div key={index}>{item.month}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bars section */}
      <div className="bg-[#111827] p-5 rounded-lg border border-gray-800 shadow-md">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-medium text-white">Latest results</h2>
          <button className="px-3 py-1 text-xs rounded-lg text-white bg-[#2563eb] hover:bg-[#3b82f6] transition-colors">
            See all
          </button>
        </div>
        <div className="space-y-4">
          <ProgressBar label="Unit 5 - Parts of the computer" value={50} />
          <ProgressBar label="Unit 2 - Parts of the computer" value={80} />
          <ProgressBar label="Unit 1 - Parts of the computer" value={50} />
        </div>
      </div>

      {/* Course cards section */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-medium text-white">Continue classes</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs rounded-lg text-white bg-[#2563eb] hover:bg-[#3b82f6] transition-colors">
              See all
            </button>
            <button className="p-1 rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded-lg text-white bg-[#2563eb] hover:bg-[#3b82f6] transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CourseCard
            title="Operating Systems"
            description="Learn the fundamentals of operating systems."
            slides="10"
            // microBadge={true}
            imageSrc="src/assets/certification_banner.png"
          />
          <CourseCard
            title="Basis of computer"
            description="Explore the basics of computer systems."
            slides="10"
            imageSrc="src/assets/certification_banner_2.png"
          />
        </div>
      </div>
    </div>
  );
};

// Main Layout with dark theme
const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#0d1117] text-white">
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

// Main Analytics Component
const Analytics = () => {
  return (
    <MainLayout>
      <AnalyticsContent />
    </MainLayout>
  );
};

export default Analytics;