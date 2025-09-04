import QuizGame from "@/components/games/quiz-game"

export default function QuizGamePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">English Learning Games</h1>
        <QuizGame />
      </div>
    </main>
  )
}
