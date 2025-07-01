import { Card, CardContent } from '../ui/card'
import { BookOpen, Edit3, Shield } from 'lucide-react'

const features = [
  {
    title: "AI-Powered Personalization",
    icon: <Edit3 className="w-6 h-6 text-cyan-400" />,
    iconBg: "w-12 h-12",
    description:
      "Our AI analyzes your communication style and adapts lessons to focus on your specific business needs.",
  },
  {
    title: "Industry-Specific Content",
    icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
    iconBg: "w-12 h-12",
    description:
      "Specialized vocabulary and scenarios for finance, marketing, tech, healthcare, and more.",
  },
  {
    title: "Blockchain Certification",
    icon: <Shield className="w-6 h-6 text-cyan-400" />,
    iconBg: "w-12 h-12",
    description:
      "Earn verifiable credentials on blockchain that showcase your business English proficiency to employers.",
  },
];

function FeatureSection() {
  return (
    <section className="px-4 pt-16 bg-[#1F2937]">
      <div>
        <h2 className="text-4xl md:text-4xl font-bold text-center text-white">
          Why Learn Business English with Us
        </h2>

        <div className="grid lg:grid-cols-3  grid-cols-1 gap-8 lg:px-16 ">
          {features.map((feature, index) => (
            <Card key={index} className="bg-transparent text-center border-transparent p-8 shadow-none">
              <CardContent className="">
                <div
                  className={`${feature.iconBg} bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
