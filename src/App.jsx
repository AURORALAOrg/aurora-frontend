// 📦 External Libraries
import { AuthProvider } from "@/context/AuthContext";
import { ToastContextProvider } from "@/context/ToastContext";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// 🏗️ Layout
import MainLayout from "@/components/layout/main-layout";

// 🔐 Authentication
import ProtectedRoute from "@/components/auth/protected-route";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import VerifyEmailPage from "@/pages/auth/verify-email";

// 📚 Learning & Education
import LearningContent from "@/pages/aurora-site/learning/learning-content";
import ListeningPage from "@/pages/aurora-site/learning/listening-content";
import ReadingContent from "@/pages/aurora-site/learning/reading-content";
import SpeakingPage from "@/pages/aurora-site/learning/speaking-content";
import VocabularyPage from "@/pages/aurora-site/learning/vocabulary-content";

// 🎓 Certifications & Courses
import CertificationContent from "@/pages/aurora-site/english-level/english-level-content";
import CertificationsObtained from "@/pages/aurora-site/english-level/english-level-obtained";
import ModuleDetails from "@/pages/aurora-site/modules/module-details";

// ⚙️ System & Settings
import Notifications from "@/pages/aurora-site/notifications";
import SettingsPage from "@/pages/aurora-site/settings";
import WalletConnection from "@/pages/aurora-site/wallet/wallet-connection";

// 🌐 Community & Interaction
import AuroraChat from "@/pages/aurora-site/aurora-chat";
import CommunityInteractionPage from "@/pages/aurora-site/community/community";

// 📊 Analytics & Categories
import Analytics from "@/pages/aurora-site/analytics";
import Categories from "@/pages/aurora-site/categories";

// 🏠 Main Pages
import HomePage from "@/pages/aurora-site/home";

// 🧩 Games & Challenges
import StoryGame from "@/pages/games/story-game";
import WordMatching from "@/pages/games/word-matching";
import GamePanel from "@/pages/games/game-panel";
import PracticeSystem from "@/components/practices/funny_practices/DragDropSentenceBuilder";
import IdiomChallenge from "@/components/practices/funny_practices/idiom-challenge";
import DifficultySelector from "@/components/Games/memory-card/difficulty-selector";
import GameBoard from "@/components/Games/memory-card/game-board";
// 📝 Practices & Exercises
//import PracticeSystem from "@/components/practices/exercises/drag-drop-sentence-builder";
import SentenceBuilder from "@/components/practices/funny_practices/SentenceBuilder";

// 🧠 Quizzes
import FillInTheBlanksQuizPage from "@/components/practices/funny_practices/FillInTheBlanksPage";
import Quiz from "@/components/practices/funny_practices/QuizPage";

// 🏛️ Grammar & Language
import GrammarContent from "@/pages/aurora-site/grammar-content";

// ✨ Question Creator
import QuestionCreator from "@/components/practices/question-creator/question-creator";

function App() {
  return (
    <Router>
      <ToastContextProvider>
        <AuthProvider>
          <Routes>
            {/* Auth routes - no MainLayout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />

            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* Protected routes with MainLayout */}

            <Route element={<MainLayout />}>
              <Route path="/learning-content" element={<LearningContent />} />
              <Route path="/wallet-connection" element={<WalletConnection />} />
              <Route
                path="/certifications-obtained"
                element={<CertificationsObtained />}
              />
              <Route path="/categories" element={<Categories />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/aurora-chat" element={<AuroraChat />} />
              <Route
                path="/certification-content"
                element={<CertificationContent />}
              />
              <Route path="/module-details" element={<ModuleDetails />} />
              <Route path="/practiceSystem" element={<PracticeSystem />} />
              <Route
                path="/practice/sentence-builder"
                element={<SentenceBuilder />}
              />
              <Route
                path="/practice/idiom-challenge"
                element={<IdiomChallenge />}
              />
              <Route
                path="/practice/drag-drop-sentence-builder"
                element={<PracticeSystem />}
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/story-game" element={<StoryGame />} />
              <Route path="/games/word-matching/" element={<WordMatching />} />
              <Route path="/games" element={<GamePanel />} />
              <Route
                path="/games/memory-card"
                element={<DifficultySelector />}
              />
              <Route
                path="/games/memory-card/:levelId"
                element={<GameBoard />}
              />
              <Route path="/practice/quiz" element={<Quiz />} />
              <Route
                path="/practice/fill-in-the-blanks"
                element={<FillInTheBlanksQuizPage />}
              />
              <Route path="/grammar" element={<GrammarContent />} />
              <Route path="/vocabulary" element={<VocabularyPage />} />
              <Route path="/speaking" element={<SpeakingPage />} />
              <Route path="/listening" element={<ListeningPage />} />
              <Route path="/reading" element={<ReadingContent />} />
              <Route path="/people" element={<CommunityInteractionPage />} />
              <Route path="/question-creator" element={<QuestionCreator />} />
            </Route>

            {/* Redirect any unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </ToastContextProvider>
    </Router>
  );
}

export default App;
