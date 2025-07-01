
import { Button } from '../ui/button'

function HeroSection() {
  return (
    <>
    {/* Hero Section */}
      <section className="relative h-[450px] flex flex-col items-center justify-center  bg-[#111827] ">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8" >
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold ">Master Business English</h1>
          <p className="text-lg md:text-lg text-slate-300  max-w-3xl mx-auto leading-relaxed">
            Enhance your professional communication skills with our AI-powered business English <br className='lg:block hidden'/>courses   designed for
            career advancement and international business success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 hover:border-none text-white px-8 py-3  font-semibold">
              Explore Courses
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500 hover:text-white px-8 py-3  font-semibold"
            >
              Take Assessment
            </Button>
          </div>
        </div>

     
      </section>

      
    </>
  )
}

export default HeroSection