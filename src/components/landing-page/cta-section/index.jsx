import React from 'react';
import { callToAction } from '../call-to-action/content';
import CTAHeroButton from '@/components/ui/buttons/CTAHeroButton';

const CTASection = () => {
  return (
    <section className="bg-[#030712]" aria-label="Call to Action Section">
      <div className="flex flex-col gap-4 container mx-auto items-center justify-center py-24">
      <h2 className="text-white text-center justify-center font-bold text-4xl lg:text-5xl">
        <span className="block">{callToAction.title.textOne}</span>
        <span className="block">{callToAction.title.textTwo}</span>
      </h2>
      <p className="text-[#D1D5DB] font-normal text-base lg:text-xl text-center">
        {callToAction.subtitle}
      </p>
      <div className="gap-4 w-full flex justify-center items-center">
        <CTAHeroButton variant={callToAction.buttons[0].variant}>
          {callToAction.buttons[0].text}
        </CTAHeroButton>
        <CTAHeroButton variant={callToAction.buttons[1].variant}>
          {callToAction.buttons[1].text}
        </CTAHeroButton>
      </div>
      </div>
    </section>
  );
};

export default CTASection; 