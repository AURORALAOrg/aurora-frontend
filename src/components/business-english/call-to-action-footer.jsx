import { Button } from "../ui/button"


function CallToActionFooter() {
  return (
   <>
  
         <section className="py-16 flex flex-col items-center justify-center bg-cyan-500 ">
        <div className="relative z-10 text-center  space-y-8">
          <h2 className="text-4xl md:text-4xl font-bold text-white">
            Ready to Advance Your Career?
          </h2>
          <p className="text-lg md:text-lg text-white  leading-relaxed">
           Join thousands of professionals who have transformed their business communication <br className="lg:block hidden"/> skills with our AI-powered
            platform.
          </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-black hover:bg-black text-white hover:border-black font-semibold px-8 py-5">Get Started</Button>
            <Button variant="outline" className="border-black bg-transparent hover:border-white text-white hover:bg-transparent font-semibold px-8 py-5">
              Request Demo
            </Button>
          </div>
        </div>
      </section>
   </>
  )
}

export default CallToActionFooter