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
      className={`fixed left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform bg-background text-foreground w-64 min-h-screen flex flex-col h-full shadow-lg border-r border-border pc-sidebar`}
      style={{ top: headerHeight }}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-12 h-auto" />
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {/* Home Button */}
          <NavLink to="/">
            <button
              onClick={() => handleNavClick("/")}
              className={`flex items-center gap-3 hover:text-primary px-3 py-2 w-full text-left rounded-lg hover:transparent hover:border-primary ${
                currentPage === "/"
                  ? "bg-muted text-muted-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <Home
                className={`w-5 h-5 ${
                  currentPage === "/"
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  currentPage === "/"
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Home
              </span>
            </button>
          </NavLink>

          {/* Learning Content Accordion */}
          <div className="mb-2">
            <button
              onClick={() => setIsLearningExpanded(!isLearningExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 bg-secondary text-secondary-foreground hover:bg-muted hover:text-muted-foreground rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Learning content</span>
              </div>
              {isLearningExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {/* Expandable Content */}
            {isLearningExpanded && (
              <div className="mt-2 ml-2">
                {/* Level Selection */}
                <div className="px-3 mb-4">
                  <h2 className="text-xs font-semibold mb-2 text-muted-foreground">
                    LEVEL
                  </h2>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-background text-foreground p-2 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-primary"
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
                  <h2 className="text-xs font-semibold mb-2 text-muted-foreground">
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
                          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg bg-secondary text-secondary-foreground hover:bg-muted hover:text-muted-foreground transition-colors"
                        >
                          <span className="">{item.icon}</span>
                          <span className="text-sm">{item.label}</span>
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
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors bg-secondary text-secondary-foreground hover:bg-muted hover:text-muted-foreground ${
                  currentPage === item.page &&
                  "bg-muted text-muted-foreground"
                }`}
              >
                <span className="">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </NavLink>
          ))}
        </nav>

        <div className="py-16 space-y-3 flex flex-col">
          <NavLink to="aurora-chat">
            <button
              onClick={() => handleNavClick("aurora-chat")}
              className="flex items-center gap-3 px-4 py-2.5 w-full text-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
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