
import { Card, CardContent } from "../ui/card";
import { skills } from "@/data/business-english-mock-date";



function SkillSection() {
  return (
    <section className="px-4 pt-16 bg-[#1F2937]">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white md:mb-0 mb-8">
          Business English Skills
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2  lg:px-28  ">
          {skills.map(({ index, title, description, icon: Icon }) => (
            <Card
              key={title + index}
              className="bg-transparent text-center border-none md:p-8 p-0 shadow-none"
            >
              <CardContent className="">
                <div className="w-16 h-16 bg-[#091217] rounded-lg flex items-center justify-center mx-auto mb-6">
                   <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                <p className="text-slate-300 text-base  font-semibold leading-relaxed">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillSection;
