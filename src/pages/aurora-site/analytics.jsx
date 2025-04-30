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

// Updated Sidebar component with dark theme
const Sidebar = () => {
  const topNavItems = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Learning content",
      active: false,
      subItems: [
        { icon: <Folder className="w-5 h-5" />, label: "Categories", active: false },
        {
          icon: <Award className="w-5 h-5" />,
          label: "Certifications Obtained",
          active: false,
        },
      ],
    },
    { icon: <BarChart2 className="w-5 h-5" />, label: "Analytics", active: true },
    { icon: <Users className="w-5 h-5" />, label: "People", active: false },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#0d1117] border-r border-gray-800">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                stroke="#00b8d4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-white">Diego Duarte</h2>
            <p className="text-sm text-gray-400">Student</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {topNavItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <button
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${
                  item.active
                    ? "bg-gray-800 text-[#00b8d4]"
                    : "text-gray-400 hover:bg-gray-800"
                }`}
                onClick={() => console.log(`Clicked ${item.label}`)}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
              {item.subItems && (
                <div>
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ml-2 ${
                        subItem.active
                          ? "bg-gray-800 text-[#00b8d4]"
                          : "text-gray-400 hover:bg-gray-800"
                      }`}
                      onClick={() => console.log(`Clicked ${subItem.label}`)}
                    >
                      {subItem.icon}
                      <span className="text-sm font-medium">
                        {subItem.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <button
            className="flex items-center gap-3 px-4 py-2.5 w-full text-white bg-gradient-to-r from-[#00b8d4] to-[#0891b2] rounded-lg hover:opacity-90 transition-all shadow-md"
            onClick={() => console.log('Opening Aurora chat')}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Talk with Aurora</span>
          </button>

          <button
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => console.log("Clicked Settings")}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Updated dark-themed header component
const Header = () => (
  <header className="bg-[#0d1117] border-b border-gray-800 p-4">
    <div className="flex justify-between items-center">
      <Menu className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
      <LogOut className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
    </div>
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
      <Sidebar />
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