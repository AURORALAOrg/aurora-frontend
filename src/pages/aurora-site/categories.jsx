import React from 'react';
import {
  BookOpen, BarChart2, Users, Settings, Folder, Award, MessageSquare, Bell,
  Search, MessagesSquare, Layout, Mic, Gamepad2
} from 'lucide-react';

const Sidebar = () => {
  const topNavItems = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Learning content',
      subItems: [
        { icon: <Folder className="w-5 h-5" />, label: 'Categories' },
        { icon: <Award className="w-5 h-5" />, label: 'Certifications Obtained' }
      ]
    },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics' },
    { icon: <Users className="w-5 h-5" />, label: 'People' }
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4 flex flex-col h-full">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                      <span className="text-sm font-medium">{subItem.label}</span>
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
            onClick={() => console.log('Clicked Settings')}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6">
      <div className="flex items-center justify-between h-full">
        <div className="relative w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          className="relative p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
          onClick={() => console.log('Notifications clicked')}
        >
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, modules, color, icon }) => {
  return (
    <div className={`${color} rounded-xl overflow-hidden h-48 transition-transform hover:scale-105 cursor-pointer relative mx-8 mb-8`}>
      <div className="p-6 h-full flex flex-col justify-between">
        <div className="items-center gap-3">
          <div className="w-10 h-10 bg-[#00b8d4] rounded-lg flex items-center justify-center">
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mt-5">{title}</h3>
        </div>
        <div className="mt-auto">
          <p className="text-white/80 text-sm">{modules} Modules</p>
        </div>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const categories = [
    {
      title: 'Grammar',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <BookOpen className="w-6 h-6" />,
      imageSrc: '/src/assets/cat1.png',
    },
    {
      title: 'Listening',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <MessagesSquare className="w-6 h-6" />,
      imageSrc: '/src/assets/cat2.png',
    },
    {
      title: 'Speaking',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <Mic className="w-6 h-6" />,
      imageSrc: '/src/assets/cat3.png',
    },
    {
      title: 'Interviews',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <Users className="w-6 h-6" />,
      imageSrc: '/src/assets/cat1.png',
    },
    {
      title: 'Words',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <Layout className="w-6 h-6" />,
      imageSrc: '/src/assets/cat2.png',
    },
    {
      title: 'Games',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <Gamepad2 className="w-6 h-6" />,
      imageSrc: '/src/assets/cat3.png',
    },
  ];

  return (
    <div className="space-y-6 bg-[#111827]">
      <h1 className="text-2xl font-semibold text-[#ffffff] ml-4">Categories</h1>
      <div>
        <h2 className="text-base text-[#ffffff] ml-4 mb-4">{categories.length} Different categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              modules={category.modules}
              color={category.color}
              icon={category.icon}
              imageSrc={category.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
