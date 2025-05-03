import { Button } from "@/components/ui/button"

export const CallToAction = () => {
  return (
    <div className="py-16 text-white bg-light-blue-1">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold">Start Your Journey with Aurora AI</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Join thousands of students who are revolutionizing their way of learning English with our advanced artificial
          intelligence.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-white border border-transparent hover:!border-white hover:bg-transparent hover:text-white text-light-blue-1 ">Start Free</Button>
          <Button variant="outline" className="text-white bg-transparent hover:text-light-blue-1 hover:bg-white hover:border-white  !border-white">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  )
}

