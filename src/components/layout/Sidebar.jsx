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
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "/aurora-logo.png";

const Sidebar = ({ isOpen, headerHeight }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [level, setLevel] = useState("Choose Your Level");
  const [isLearningExpanded, setIsLearningExpanded] = useState(false);

  const navigate = useNavigate();

  const handleNavClick = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  const categories = [
    { icon: <Book className="w-5 h-5 text-[#ced2d8]" />, label: "Grammar" },
    { icon: <GraduationCap className="w-5 h-5 text-[#ced2d8]" />, label: "Vocabulary" },
    { icon: <MessageCircle className="w-5 h-5 text-[#ced2d8]" />, label: "Speaking" },
    { icon: <Headphones className="w-5 h-5 text-[#ced2d8]" />, label: "Listening" },
    { icon: <FileText className="w-5 h-5 text-[#ced2d8]" />, label: "Reading" },
    { icon: <Gamepad className="w-5 h-5 text-[#ced2d8]" />, label: "Games" },
  ];

  const topNavItems = [
    { icon: <BarChart2 className="w-5 h-5 text-[#ced2d8]" />, label: "Analytics", page: "analytics" },
    { icon: <Users className="w-5 h-5 text-[#ced2d8]" />, label: "Community", page: "community" },
  ];

  return (
    <div
      className={`fixed left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform w-64 min-h-screen flex flex-col h-full shadow-lg border-r`}
      style={{
        backgroundColor: "#0d1117",
        color: "#FFFFFF",
        borderColor: "#4a5462",
        top: headerHeight,
      }}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-12 h-auto" />
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavLink to="/">
            <button
              onClick={() => handleNavClick("/")}
              style={{
                backgroundColor: currentPage === "/" ? "#1f2937" : "transparent",
                color: "#FFFFFF",
              }}
              className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
            >
              <Home className="w-5 h-5 text-[#ced2d8]" />
              <span className="text-sm font-medium">Home</span>
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
                  <h2 className="text-xs font-semibold mb-2" style={{ color: "#e6f8fb" }}>
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
                  <h2 className="text-xs font-semibold mb-2" style={{ color: "#e6f8fb" }}>
                    CATEGORIES
                  </h2>
                  <div className="flex flex-col gap-1">
                    {categories.map((item, index) => (
                      <NavLink key={index} to={item.label.toLowerCase()}>
                        <button
                          onClick={() =>
                            handleNavClick(`category-${item.label.toLowerCase()}`)
                          }
                          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
                          style={{ backgroundColor: "#1f2937", color: "#FFFFFF" }}
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

          {topNavItems.map((item, index) => (
            <NavLink key={index} to={item.page}>
              <button
                onClick={() => handleNavClick(item.page)}
                className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-[#374151]"
                style={{
                  backgroundColor: currentPage === item.page ? "#1f2937" : "transparent",
                  color: "#FFFFFF",
                }}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </NavLink>
          ))}
        </nav>

        <div className="py-16 space-y-3 flex flex-col">
          <NavLink to="aurora-chat">
            <button
              onClick={() => handleNavClick("aurora-chat")}
              className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg transition-colors shadow-sm"
              style={{
                backgroundColor: "#00b8d4",
                color: "#FFFFFF",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#22d3ee")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#00b8d4")}
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
