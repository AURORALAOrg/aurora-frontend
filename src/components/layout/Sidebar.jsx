import {
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
  UserCheck,
  Award,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "/aurora-logo.png";

const Sidebar = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [level, setLevel] = useState("Choose Your Level");
  const [isLearningExpanded, setIsLearningExpanded] = useState(false);
  const [isCommunityExpanded, setIsCommunityExpanded] = useState(false);

  const navigate = useNavigate();

  const handleNavClick = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
    if (onClose) onClose();
  };

  const categories = [
    { icon: <Book className="w-5 h-5 text-[#ced2d8]" />, label: "Grammar" },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#ced2d8]" />,
      label: "Vocabulary",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#ced2d8]" />,
      label: "Speaking",
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#ced2d8]" />,
      label: "Listening",
    },
    { icon: <FileText className="w-5 h-5 text-[#ced2d8]" />, label: "Reading" },
    { icon: <Gamepad className="w-5 h-5 text-[#ced2d8]" />, label: "Games" },
  ];

  const topNavItems = [
    {
      icon: <BarChart2 className="w-5 h-5 text-[#ced2d8]" />,
      label: "Analytics",
      page: "analytics",
    },
    {
      icon: <Users className="w-5 h-5 text-[#ced2d8]" />,
      label: "Community",
      page: "community",
    },
    {
      icon: <UserCheck className="w-5 h-5 text-[#ced2d8]" />,
      label: "Teacher Directory",
      page: "teacher-directory",
    },
    {
      icon: <Award className="w-5 h-5 text-[#ced2d8]" />,
      label: "Certification",
      page: "certificate",
    },
  ];

  return (
    <div
      className={`fixed left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out w-64 min-h-screen flex flex-col h-full shadow-lg border-r`}
      style={{
        backgroundColor: "#0d1117",
        color: "#FFFFFF",
        borderColor: "#4a5462",
        top: 0,
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          height: "64px",
          backgroundColor: "#0d1117",
          borderBottom: "1px solid #23272f",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <img src={Logo} alt="Logo" className="w-10 h-auto" />
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-[#1f2937] transition-colors"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        className="flex-1 flex flex-col overflow-y-auto"
        style={{ height: "calc(100% - 64px)" }}
      >
        <nav className="flex flex-col gap-2 flex-1 p-4">
          <NavLink to="/">
            <button
              onClick={() => handleNavClick("/")}
              style={{
                backgroundColor:
                  currentPage === "/" ? "#1f2937" : "transparent",
                color: "#FFFFFF",
              }}
              className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
            >
              <Home className="w-5 h-5 text-[#ced2d8]" />
              <span className="text-sm font-medium">Home</span>
            </button>
          </NavLink>

          <NavLink to="/course-navigation">
            <button
              onClick={() => handleNavClick("course-navigation")}
              style={{
                backgroundColor:
                  currentPage === "course-navigation"
                    ? "#1f2937"
                    : "transparent",
                color: "#FFFFFF",
              }}
              className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
            >
              <BookOpen className="w-5 h-5 text-[#ced2d8]" />
              <span className="text-sm font-medium">Course Navigation</span>
            </button>
          </NavLink>

          <div className="mb-2">
            <button
              onClick={() => setIsLearningExpanded(!isLearningExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#1f2937", color: "#FFFFFF" }}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#ced2d8]" />
                <span className="text-sm font-medium">Learning content</span>
              </div>
              {isLearningExpanded ? (
                <ChevronDown className="w-4 h-4 text-[#707079]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#707079]" />
              )}
            </button>

            {isLearningExpanded && (
              <div className="mt-2 ml-2">
                <div className="px-3 mb-4">
                  <h2
                    className="text-xs font-semibold mb-2"
                    style={{ color: "#e6f8fb" }}
                  >
                    LEVEL
                  </h2>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2 rounded-lg border"
                    style={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#FFFFFF",
                    }}
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

                <div className="px-3">
                  <h2
                    className="text-xs font-semibold mb-2"
                    style={{ color: "#e6f8fb" }}
                  >
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
                          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
                          style={{
                            backgroundColor: "#1f2937",
                            color: "#FFFFFF",
                          }}
                        >
                          {item.icon}
                          <span className="text-sm">{item.label}</span>
                        </button>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-2">
            <button
              onClick={() => setIsCommunityExpanded(!isCommunityExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: isCommunityExpanded
                  ? "#1f2937"
                  : "transparent",
                color: "#FFFFFF",
              }}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#ced2d8]" />
                <span className="text-sm font-medium">Community</span>
              </div>
              {isCommunityExpanded ? (
                <ChevronDown className="w-4 h-4 text-[#707079]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#707079]" />
              )}
            </button>
            {isCommunityExpanded && (
              <div className="mt-2 ml-2 flex flex-col gap-1">
                <NavLink to="/community">
                  <button
                    onClick={() => handleNavClick("community")}
                    className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
                    style={{
                      backgroundColor:
                        currentPage === "community" ? "#23272f" : "#1f2937",
                      color: "#FFFFFF",
                    }}
                  >
                    <span className="text-sm">Community Home</span>
                  </button>
                </NavLink>
                <NavLink to="/leaderboard">
                  <button
                    onClick={() => handleNavClick("leaderboard")}
                    className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
                    style={{
                      backgroundColor:
                        currentPage === "leaderboard" ? "#23272f" : "#1f2937",
                      color: "#FFFFFF",
                    }}
                  >
                    <span className="text-sm">Leaderboard</span>
                  </button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Teacher Directory and Analytics */}
          {topNavItems
            .filter((item) => item.label !== "Community")
            .map((item, index) => (
              <NavLink key={index} to={item.page}>
                <button
                  onClick={() => handleNavClick(item.page)}
                  className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
                  style={{
                    backgroundColor:
                      currentPage === item.page ? "#1f2937" : "transparent",
                    color: "#FFFFFF",
                  }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </NavLink>
            ))}
        </nav>

        <div className="py-16 space-y-3 flex flex-col px-4">
          <NavLink to="aurora-chat">
            <button
              onClick={() => handleNavClick("aurora-chat")}
              className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg transition-colors shadow-sm"
              style={{
                backgroundColor: "#00b8d4",
                color: "#FFFFFF",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#22d3ee")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#00b8d4")
              }
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
