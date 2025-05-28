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
import BusinessEnglishPage from "@/pages/aurora-site/learning/business-english";
import LessonDetail from "@/pages/aurora-site/learning/business-english/lesson-detail";

// 🎓 Certifications & Courses
import CertificationContent from "@/pages/aurora-site/english-level/english-level-content";
import CertificationsObtained from "@/pages/aurora-site/english-level/english-level-obtained";
import ModuleDetails from "@/pages/aurora-site/modules/module-details";
import CourseListing from "./pages/aurora-site/course-listing/course-listing-page";
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
import WordScramble from "@/components/Games/word-scramble/word-scramble-game.jsx"
import WordMatching from "@/pages/games/word-matching";
import GamePanel from "@/pages/games/game-panel";
import DifficultySelector from "@/components/Games/memory-card/difficulty-selector";
import GameBoard from "@/components/Games/memory-card/game-board";
// import WordScrambleGame from "@/pages/games/word-scramble"; // Uncomment if exists

// 📝 Practices & Exercises

import PracticeSystem from "@/components/practices/funny_practices/DragDropSentenceBuilder";
import IdiomChallenge from "@/components/practices/funny_practices/idiom-challenge";
import SentenceBuilder from "@/components/practices/funny_practices/SentenceBuilder";

//Quizzes
import FillInTheBlanksQuizPage from "@/components/practices/funny_practices/FillInTheBlanksPage";
 import Quiz from "@/components/practices/funny_practices/QuizPage";

// 🏛️ Grammar & Language
import GrammarContent from "@/pages/aurora-site/grammar-content";

// ✨ Question Creator
import QuestionCreator from "@/components/practices/question-creator/question-creator";

// Demo Page
import DemoPage from "@/pages/demo/demo-page";

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

            {/* Public route */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/course-listing" element={<CourseListing />} />
              <Route path="/demo" element={<DemoPage />} />
            </Route>

            {/* Protected routes with MainLayout */}

            {/*<Route element={<ProtectedRoute />}>*/}
              <Route element={<MainLayout />}>
                <Route path="/learning-content" element={<LearningContent />} />
                <Route path="/wallet-connection" element={<WalletConnection />}/>
                <Route path="/certifications-obtained" element={<CertificationsObtained />}/>
                <Route path="/categories" element={<Categories />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/aurora-chat" element={<AuroraChat />} />
                <Route path="/certification-content"element={<CertificationContent />}/>
                <Route path="/module-details" element={<ModuleDetails />} />
                <Route path="/practiceSystem" element={<PracticeSystem />} />

                <Route path="/grammar" element={<GrammarContent />} />
                <Route path="/vocabulary" element={<VocabularyPage />} />
                <Route path="/speaking" element={<SpeakingPage />} />
                <Route path="/listening" element={<ListeningPage />} />
                <Route path="/reading" element={<ReadingContent />} />
                <Route path="/community" element={<CommunityInteractionPage />} />
                <Route path="/question-creator" element={<QuestionCreator />} />

          </Routes>
        </AuthProvider>
      </ToastContextProvider>
    </Router>
  );
}

export default App;