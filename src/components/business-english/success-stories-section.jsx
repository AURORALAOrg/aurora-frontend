import { testimonials } from "@/data/business-english-mock-date";
import { Card, CardContent } from "../ui/card";


function SuccessStoriesSection() {
  return (
    <>
      {/* Success Stories Section */}
      <section className="px-4 py-16 bg-[#1F2937]">
        <div className="">
          <h2 className="text-4xl md:text-4xl text-center font-bold text-white mb-12">
            Success Stories
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 lg:px-60">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#111827] border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm font-semibold text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-slate-300 italic leading-relaxed text-lg ">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SuccessStoriesSection;
