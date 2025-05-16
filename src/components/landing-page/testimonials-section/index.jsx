import React from 'react';
import { whatOurUsersSay } from '../call-to-action/content';
import { WhatOurUsersSay } from '../call-to-action/cards';

const TestimonialsSection = () => {
  return (
    <section className="bg-[#1F2937] w-full px-6 py-12" aria-label="Testimonials Section">
      <div className="flex flex-col gap-4 container mx-auto items-center justify-center">
      <h2 className="block mt-[32px] text-white text-center font-bold text-3xl lg:text-5xl">
        <span className="block">{whatOurUsersSay.title.textOne}</span>
        <span className="block">{whatOurUsersSay.title.textTwo}</span>
      </h2>
      <p className="text-[#D1D5DB] font-normal text-center text-base lg:text-xl">
        {whatOurUsersSay.subtitle}
      </p>
      <div className="gap-4 grid lg:grid-cols-3 md:grid-cols-2 items-stretch max-w-5xl justify-center mt-2">
        {whatOurUsersSay.cards.map((content, i) => (
          <WhatOurUsersSay {...content} key={`testimonial-${content.name}`} />
        ))}
      </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 