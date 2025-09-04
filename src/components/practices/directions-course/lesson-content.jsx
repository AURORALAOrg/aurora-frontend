import { BookOpen, ArrowRight } from "lucide-react";

export default function LessonContent({ lesson, onContinue }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <BookOpen className="text-light-blue-2 mr-3" size={24} />
        <h3 className="text-2xl font-bold text-white">Lesson Content</h3>
      </div>

      <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Key Vocabulary & Phrases:
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {lesson.content.map((item, index) => (
            <div 
              key={index}
              className="bg-dark-blue-6 px-3 py-2 rounded-md border border-dark-blue-4 hover:border-light-blue-2 transition-colors"
            >
              <span className="text-[#D1D5DB] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-3">
          Learning Tips:
        </h4>
        <div className="space-y-2 text-[#D1D5DB]">
          {lesson.title.includes("Vocabulary") && (
            <>
              <p>• Practice compass directions by using your phone&apos;s compass app</p>
              <p>• Count blocks when walking to get familiar with distance measurements</p>
              <p>• Notice street signs and practice reading avenue vs street names</p>
            </>
          )}
          {lesson.title.includes("Politely") && (
            <>
              <p>• Always start with &quot;Excuse me&quot; to be polite</p>
              <p>• Use &quot;please&quot; and &quot;thank you&quot; when asking for help</p>
              <p>• Don&apos;t be afraid to ask someone to repeat directions</p>
            </>
          )}
          {lesson.title.includes("Understanding") && (
            <>
              <p>• Listen for key landmarks like &quot;traffic light&quot; or &quot;church&quot;</p>
              <p>• Visualize the route as someone explains it</p>
              <p>• Ask for clarification if you don&apos;t understand something</p>
            </>
          )}
          {lesson.title.includes("Transportation") && (
            <>
              <p>• Know the local transport options in your area</p>
              <p>• Keep emergency phrases ready when traveling</p>
              <p>• Don&apos;t hesitate to ask locals for help when lost</p>
            </>
          )}
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onContinue}
          className="bg-dark-blue-5 border border-dark-blue-4 hover:border-light-blue-2 hover:text-light-blue-2 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto"
        >
          Start Exercises
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
}