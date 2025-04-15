import {
  ArrowLeftCircleIcon,
  BarChart2,
  Book,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Gamepad,
  GraduationCap,
  Headphones,
  Home,
  MessageCircle,
  MessageSquare,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/S-icon-Photoroom.png";

const Sidebar = ({ isOpen, onClose, headerHeight }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [level, setLevel] = useState("Choose Your Level");
  const [isLearningExpanded, setIsLearningExpanded] = useState(false);

  const navigate = useNavigate();

  const handleNavClick = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  const categories = [
    { icon: <Book className="w-5 h-5" />, label: "Grammar" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Vocabulary" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Speaking" },
    { icon: <Headphones className="w-5 h-5" />, label: "Listening" },
    { icon: <FileText className="w-5 h-5" />, label: "Reading" },
    { icon: <Gamepad className="w-5 h-5" />, label: "Games" },
  ];

  const topNavItems = [
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Analytics",
      page: "analytics",
    },
    { icon: <Users className="w-5 h-5" />, label: "Community", page: "people" },
  ];

  return (
    <div
      className={`fixed left-0 z-50 transform overflow-y-scroll scrollbar-hide  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform  w-full sm:w-80 min-h-screen flex flex-col h-full pc-sidebar`}
    >
      <div className=" p-6 sm:p-8 flex flex-col h-full w-4/5 sm:w-full bg-gray-800 shadow-xl shadow-gray-900 ">
        {/* Logo Section */}
        <div className="flex justify-end">
          <button onClick={() => onClose()} className="px-0 py-0 bg-transparent border-none">
            <ArrowLeftCircleIcon className="w-8 h-8 text-white" />
          </button>
        </div>
        <div className="mb-6 rounded-full bg-white p-2 w-[120px] h-[120px] mx-auto flex justify-center items-center">
          <img src={Logo} alt="Logo" className="w-[50px] h-auto" />
        </div>
        <nav className="flex flex-col gap-4 flex-1">
          {/* Home Button */}

          <NavLink to="/">
            <button
              onClick={() => handleNavClick("/")}
              className={`flex items-center gap-3  px-3 py-2 w-full text-left rounded-lg bg-transparent border-2 border-gray-200 text-gray-200  ${
                currentPage === "/" ? "bg-white text-gray-800  " : ""
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-sm font-medium">Home</span>
            </button>
          </NavLink>

          {/* Learning Content Accordion */}
          <div className="mb-2">
            <button
              onClick={() => setIsLearningExpanded(!isLearningExpanded)}
              className="flex items-center gap-3  px-3 py-2 w-full text-left rounded-lg bg-transparent border-2 border-gray-200 text-gray-200 "
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium ">Learning content</span>
              </div>
              {isLearningExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {/* Expandable Content */}
            {isLearningExpanded && (
              <div className="mt-2 ml-2">
                {/* Level Selection */}
                <div className="px-3 mb-4">
                  <h2 className="text-xs font-semibold mb-2 text-gray-200">
                    LEVEL
                  </h2>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-white text-gray-900 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Choose Your Level</option>
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>C1</option>
                    <option>C2</option>
                  </select>
                </div>

                {/* Categories */}
                <div className="px-3">
                  <h2 className="text-xs font-semibold mb-2 text-gray-200">
                    CATEGORIES
                  </h2>
                  <div className="flex flex-col gap-1">
                    {categories.map((item, index) => (
                      <NavLink key={index} to={item.label.toLowerCase()}>
                        <button
                          onClick={() =>
                            handleNavClick(
                              `category-${item.label.toLowerCase()}`
                            )
                          }
                          className="flex items-center gap-3  px-3 py-2 w-full text-left rounded-lg bg-transparent border-2 border-gray-200 text-gray-200"
                        >
                          <span className="">{item.icon}</span>
                          <span className="text-sm ">{item.label}</span>
                        </button>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Navigation Items */}
          {topNavItems.map((item, index) => (
            <NavLink key={index} to={item.page}>
              <button
                onClick={() => handleNavClick(item.page)}
                className={`flex items-center gap-3  px-3 py-2 w-full text-left rounded-lg bg-transparent border-2 border-gray-200 text-gray-200  ${
                  currentPage === item.page && "bg-white text-gray-800  "
                }`}
              >
                <span className="">{item.icon}</span>
                <span className="text-sm font-medium ">{item.label}</span>
              </button>
            </NavLink>
          ))}
        </nav>

        <div className="py-16 space-y-3 flex flex-col">
          <NavLink to="aurora-chat">
            <button
              onClick={() => handleNavClick("aurora-chat")}
              className="flex items-center gap-3  px-3 py-2 w-full text-left rounded-lg bg-white text-gray-800 shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">Talk with Aurora</span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
