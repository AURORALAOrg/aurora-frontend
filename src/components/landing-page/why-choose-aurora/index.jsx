import React from "react";
import { whyChooseAuruora } from "../call-to-action/content";
import { WhyChooseAuruora as FeatureCard } from "../call-to-action/cards";

const WhyChooseAurora = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full p-[3%] gap-4 bg-[#374151] h-auto pb-16" aria-label="Why Choose Aurora Section">
      <h2 className="flex flex-col text-3xl lg:text-5xl mt-[32px] font-bold text-white text-center">
        <span>{whyChooseAuruora.title}</span>
        <span>{whyChooseAuruora.subtitle}</span>
      </h2>
      <p className="text-center font-normal text-[#D1D5DB] text-xl">
        {whyChooseAuruora.content}
      </p>
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center max-w-5xl w-full">
        {whyChooseAuruora.cards.map((content, i) => (
          <FeatureCard key={i} {...content} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseAurora;
