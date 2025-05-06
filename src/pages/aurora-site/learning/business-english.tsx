import React from 'react';
import { Link } from 'react-router-dom';

// Import icons from lucide-react
import { Book, Mic, Headphones, PenTool, Shield, FileText, DollarSign, Users, Globe } from 'lucide-react';

// Mock data for courses - will be replaced with API data later
const businessCourses = [
  {
    id: 'business-communication',
    title: 'Business Communication Essentials',
    description: 'Master emails, meetings, presentations, and phone calls in professional settings.',
    icon: <FileText className="w-6 h-6 text-blue-400" />,
    level: 'Beginner to Intermediate',
    path: '/learning/business-english/business-communication'
  },
  {
    id: 'negotiation-persuasion',
    title: 'Negotiation & Persuasion',
    description: 'Develop skills to negotiate contracts, close deals, and persuade stakeholders effectively.',
    icon: <Users className="w-6 h-6 text-blue-400" />,
    level: 'Intermediate to Advanced',
    path: '/learning/business-english/negotiation-persuasion'
  },
  {
    id: 'financial-english',
    title: 'Financial English',
    description: 'Learn specialized vocabulary and communication patterns for banking, investing, and accounting.',
    icon: <DollarSign className="w-6 h-6 text-blue-400" />,
    level: 'Intermediate',
    path: '/learning/business-english/financial-english'
  },
  {
    id: 'leadership-communication',
    title: 'Leadership Communication',
    description: 'Enhance your ability to inspire teams, deliver impactful speeches, and communicate vision.',
    icon: <Users className="w-6 h-6 text-blue-400" />,
    level: 'Advanced',
    path: '/learning/business-english/leadership-communication'
  },
  {
    id: 'marketing-sales',
    title: 'Marketing & Sales English',
    description: 'Learn to craft compelling pitches, marketing copy, and customer-facing communications.',
    icon: <FileText className="w-6 h-6 text-blue-400" />,
    level: 'Intermediate',
    path: '/learning/business-english/marketing-sales'
  },
  {
    id: 'cross-cultural',
    title: 'Cross-Cultural Business Communication',
    description: 'Navigate cultural differences in international business settings with confidence.',
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    level: 'All Levels',
    path: '/learning/business-english/cross-cultural'
  }
];

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    position: 'Marketing Director, Global Tech',
    initials: 'SC',
    avatar: '/avatar1.webp',
    testimonial: 'The industry-specific vocabulary and real-world scenarios helped me communicate more effectively with international clients. My confidence in business meetings has improved dramatically.'
  },
  {
    id: 2,
    name: 'Miguel Rodriguez',
    position: 'Finance Manager, Banking Sector',
    initials: 'MR',
    avatar: '/avatar2.webp',
    testimonial: 'The financial English course was exactly what I needed to advance in my career. The AI-powered feedback on my speaking helped me sound more professional and authoritative.'
  },
  {
    id: 3,
    name: 'Akira Tanaka',
    position: 'Project Manager, Manufacturing',
    initials: 'AT',
    avatar: '/avatar3.webp',
    testimonial: 'The cross-cultural communication module was eye-opening. I now navigate international business relationships with much greater ease and understanding.'
  }
];

const BusinessEnglishPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Master Business English</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Enhance your professional communication skills with our AI-powered business English
            courses designed for career advancement and international business success.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/learning/business-english/explore" className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-6 py-2 rounded transition duration-300">
              Explore Courses
            </Link>
            <Link to="/assessment/business-english" className="border border-slate-600 hover:border-blue-400 px-6 py-2 rounded transition duration-300">
              Take Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-slate-800 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Learn Business English with Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-slate-700 p-4 rounded-lg mb-4">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Personalization</h3>
              <p className="text-slate-300">
                Our AI analyzes your communication style and adapts lessons to focus on your specific business needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-slate-700 p-4 rounded-lg mb-4">
                <Book className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry-Specific Content</h3>
              <p className="text-slate-300">
                Specialized vocabulary and scenarios for finance, marketing, tech, healthcare, and more.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-slate-700 p-4 rounded-lg mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Blockchain Certification</h3>
              <p className="text-slate-300">
                Earn verifiable credentials on blockchain that showcase your business English proficiency to employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Business English Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessCourses.map((course) => (
            <Link to={course.path} key={course.id} className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition duration-300">
              <div className="p-6">
                <div className="mb-4">
                  {course.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-slate-300 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">{course.level}</span>
                  <span className="text-blue-400 text-sm font-medium">Start Learning →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 bg-slate-800 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Business English Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <Book className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Reading</h3>
              <p className="text-slate-300 text-sm">
                Analyze reports, contracts, and business documents with precision
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Mic className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Speaking</h3>
              <p className="text-slate-300 text-sm">
                Communicate confidently in meetings, presentations, and negotiations
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Headphones className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Listening</h3>
              <p className="text-slate-300 text-sm">
                Comprehend complex discussions and extract key information
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <PenTool className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Writing</h3>
              <p className="text-slate-300 text-sm">
                Craft professional emails, reports, and business documents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Assess Your Business English Level</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
            Take our comprehensive assessment to identify your strengths and areas for 
            improvement. Our AI will create a personalized learning path based on your results.
          </p>
          <Link to="/assessment/business-english" className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded transition duration-300">
            Start Free Assessment
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-slate-800 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-900 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-medium mr-3">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-slate-400">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-blue-400">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Advance Your Career?</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
            Join thousands of professionals who have transformed their business communication
            skills with our AI-powered platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="bg-black text-white font-medium px-6 py-3 rounded transition duration-300">
              Get Started
            </Link>
            <Link to="/demo" className="bg-transparent border border-black text-black font-medium px-6 py-3 rounded transition duration-300">
              Request Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessEnglishPage;