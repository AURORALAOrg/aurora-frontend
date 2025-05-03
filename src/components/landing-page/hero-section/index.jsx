import React from 'react';
import CTAHeroButton from '../../ui/buttons/CTAHeroButton';
import { heroContent } from '../call-to-action/Content';


const HeroSection = () => {
  return (
    <section className="w-full bg-[#030712] px-6 py-12" aria-label="Hero Section">
      <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-8">
      <h2 className="flex flex-col gap-2 text-white font-bold text-4xl lg:text-6xl">
        <span>{heroContent.title.textOne}</span>
        <span>{heroContent.title.textTwo}</span>
      </h2>
      <p className="font-normal mt-3 text-[#D1D5DB] text-lg lg:text-base lg:max-w-[600px]">
        {heroContent.subtitle}
      </p>
      <div className="w-full mt-5 items-start gap-5 flex">
        <CTAHeroButton variant="primary">
          {heroContent.buttons[0].text}
        </CTAHeroButton>
        <CTAHeroButton variant="outline">
          {heroContent.buttons[1].text}
        </CTAHeroButton>
      </div>
      </div>
    </section>
  );
};

export default HeroSection; 