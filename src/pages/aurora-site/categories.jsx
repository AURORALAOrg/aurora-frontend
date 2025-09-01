
import {
  BookOpen,
  Users,
  MessagesSquare,
  Layout,
  Mic,
  Gamepad2,
  Navigation
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-[#111827]">
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, modules, color, icon, onClick }) => {
  return (
    <button 
      type="button"
      className={`${color} rounded-xl overflow-hidden h-48 transition-transform hover:scale-105 cursor-pointer w-full text-left`}
      onClick={onClick}
    >
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
    </button>
  );
};

const CategoriesPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Grammar',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: 'Listening',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <MessagesSquare className="w-6 h-6" />,
    },
    {
      title: 'Speaking',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <Mic className="w-6 h-6" />,
    },
    {
      title: 'Interviews',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Words',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <Layout className="w-6 h-6" />,
    },
    {
      title: 'Games',
      modules: 2,
      color: 'bg-[#2f3a4b]',
      icon: <Gamepad2 className="w-6 h-6" />,
    },
    {
      title: 'Directions & Navigation',
      modules: 4,
      color: 'bg-[#2f3a4b]',
      icon: <Navigation className="w-6 h-6" />,
      onClick: () => navigate('/practice/directions-course')
    },
  ];

  return (
    <MainLayout>
      <div className="bg-[#111827] min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          <h1 className="text-3xl font-semibold text-white text-center">Categories</h1>
          <h2 className="text-base text-gray-300 text-center">
            {categories.length} Different categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                modules={category.modules}
                color={category.color}
                icon={category.icon}
                onClick={category.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
