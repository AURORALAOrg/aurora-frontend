import { useTheme } from "../../context/ThemeContext"; 
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
} from "lucide-react";

// Reused components from the original analytics file
const StatCard = ({ title, value, icon: Icon, color }) => {
  const { theme } = useTheme(); // Access theme
  const backgroundStyles =
    theme === "dark"
      ? "bg-[#1F2937] text-white" // Dark mode styles
      : `${color} text-white`; // Use color in light mode

  return (
    <div className={`p-4 rounded-lg shadow-md ${backgroundStyles}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
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
      <path d={path} stroke="#3B82F6" strokeWidth="2" fill="none" />
      {points.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r="3" fill="#3B82F6" />
      ))}
    </svg>
  );
};

const ProgressBar = ({ value, label }) => {
  const { theme } = useTheme(); // Access theme
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-600"; // Dynamic text color

  return (
    <div className="mt-2">
      <div className={`flex justify-between text-sm mb-1 ${textColor}`}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const CourseCard = ({ title, description, slides, imageSrc }) => {
  const { theme } = useTheme(); 
  const darkModeStyles =
    theme === "dark"
      ? "bg-[#1F2937] text-white border-gray-700"
      : "bg-white text-gray-900 border-gray-200";

  return (
    <div className={`p-4 rounded-lg border flex items-start gap-4 ${darkModeStyles}`}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`${title} Image`}
          className="w-16 h-20 rounded object-cover"
        />
      )}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm mt-1">{description}</p>
        <p className="text-sm mt-2">{slides} Slides</p>
      </div>
    </div>
  );
};


const Sidebar = () => {
  const topNavItems = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Learning content",
      subItems: [
        { icon: <Folder className="w-5 h-5" />, label: "Categories" },
        {
          icon: <Award className="w-5 h-5" />,
          label: "Certifications Obtained",
        },
      ],
    },
    { icon: <BarChart2 className="w-5 h-5" />, label: "Analytics" },
    { icon: <Users className="w-5 h-5" />, label: "People" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                stroke="#71717A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-sm text-gray-900">Diego Duarte</h2>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {topNavItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <button
                className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors text-gray-600 hover:bg-blue-50"
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
                      className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ml-2 text-gray-600 hover:bg-blue-50"
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
            className="flex items-center gap-3 px-4 py-2.5 w-full text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
            onClick={() => console.log('Opening Aurora chat')}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Talk with Aurora</span>
          </button>

          <button
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
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

// Header component
const Header = () => {
  const { theme } = useTheme(); 
  const darkModeStyles =
    theme === "dark"
      ? "bg-[#1F2937] text-white border-gray-700"
      : "bg-white text-gray-900 border-gray-200";

  return (
    <header className={`p-4 border-b ${darkModeStyles}`}>
      <div className="flex justify-between items-center">
        <Menu className="w-6 h-6" />
        <LogOut className="w-6 h-6" />
      </div>
    </header>
  );
};

// Analytics Content
const performanceData = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 50 },
  { month: "May", value: 45 },
  { month: "Jun", value: 40 },
  { month: "Jul", value: 35 },
];

const AnalyticsContent = () => {
  const { theme } = useTheme(); 
  const darkModeStyles =
    theme === "dark"
      ? "bg-[#1F2937] text-white border-gray-700"
      : "bg-white text-gray-900 border-gray-200";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Certifications"
          value="4"
          icon={FileText}
          color="bg-blue-500"
        />
        <StatCard
         title="NFTs" 
         value="2" 
         icon={Image} 
         color="bg-purple-500" 
         />
        <StatCard
          title="Total learning time"
          value="40"
          icon={Clock}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${darkModeStyles}`}>
          <h2 className="font-medium mb-4">Progress</h2>
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray="70, 100"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                70%
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <span>Remaining</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Level achieved</span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${darkModeStyles}`}>
          <h2 className="font-medium mb-4">Monthly performance</h2>
          <SimpleLineChart data={performanceData} />
        </div>
      </div>

      <div className={`p-4  rounded-lg ${darkModeStyles}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Latest results</h2>
          <button className="text-gray-100 bg-blue-600 text-sm">See all</button>
        </div>
        <div className="space-y-4 ">
          <ProgressBar label="Unit 5 - Parts of the computer" value={50} />
          <ProgressBar label="Unit 2 - Parts of the computer" value={80} />
          <ProgressBar label="Unit 1 - Parts of the computer" value={50} />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Continue classes</h2>
          <div className="flex gap-2">
            <button className="text-gray-100 bg-blue-600 text-sm">
              See all
            </button>
            <button className="text-gray-100 bg-blue-600">&lt;</button>
            <button className="text-gray-100 bg-blue-600">&gt;</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CourseCard
            title="Operating Systems"
            description="Learn the fundamentals of operating systems."
            slides="10"
            imageSrc="/src/assets/operating_systems.png"
          />
          <CourseCard
            title="Basis of computer"
            description="Explore the basics of computer systems."
            slides="10"
            imageSrc="/src/assets/learning_module.png"
          />
        </div>
      </div>
    </div>
  );
};

// Main Layout
const MainLayout = ({ children }) => {
  const { theme } = useTheme(); // Access theme
  const darkModeStyles =
    theme === "dark" ? "bg-[#111827] text-white" : "bg-gray-50 text-gray-900";

  return (
    <div className={`flex h-screen ${darkModeStyles}`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

// Main Analytics Component
const Analytics = () => {
  return <AnalyticsContent />;
};

export default Analytics;
