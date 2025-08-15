import { useState } from 'react';
import HeroSection from '../hero-section';
import SkillSection from '../skill-section';
import CoursesSection from '../courses-section';
import WhyChooseAurora from '../why-choose-aurora';
import TestimonialsSection from '../testimonials-section';
import CTASection from '../cta-section';

const CallToActionPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleChange = (role) => {
    console.log('CallToActionPage: Role changing from', selectedRole, 'to', role);
    setSelectedRole(role);
    console.log('CallToActionPage: selectedRole after setState:', role);
  };

  console.log('CallToActionPage: Current selectedRole:', selectedRole);

  return (
    <div className="flex w-full h-full flex-col">
      <HeroSection selectedRole={selectedRole} onRoleChange={handleRoleChange} />
      <WhyChooseAurora selectedRole={selectedRole} />
      <CoursesSection selectedRole={selectedRole} />
      {/* <SkillSection selectedRole={selectedRole} /> */} 
      <TestimonialsSection selectedRole={selectedRole} />
      <CTASection selectedRole={selectedRole} />
    </div>
  );
};

export default CallToActionPage;
