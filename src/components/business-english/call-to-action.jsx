import { Button } from "../ui/button";

function CallToAction() {
  return (
    <>
      <section className="py-16 px-2 flex flex-col items-center justify-center  bg-[#111827] ">
        <div className="relative z-10 text-center  space-y-8">
          <h1 className="text-4xl md:text-4xl font-bold text-white">
            Assess Your Business English Level
          </h1>
          <p className="text-lg md:text-lg text-slate-300  leading-relaxed">
            Take our comprehensive assessment to identify your strengths and
            areas for <br className="lg:block hidden" /> improvement. Our AI will create a personalized
            learning path based on your results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 hover:border-none text-white px-8 py-3  font-semibold"
            >
              Start Free Assessment
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default CallToAction;
