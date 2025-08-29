// 📦 External Libraries
import { AuthProvider } from "@/context/AuthContext";
import { ToastContextProvider } from "@/context/ToastContext";
import "../src/lib/polyfills";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

//mocks blockchain transactions
import MockPage from "@/components/stellar/mock_page";
import NFTInteract from "@/components/stellar/nft-interact";
// 🏗️ Layout
import MainLayout from "@/components/layout/main-layout";

// 🔐 Authentication
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import VerifyEmailPage from "@/pages/auth/verify-email";

// 📚 Learning & Education
import ListeningPage from "@/pages/aurora-site/learning/listening-content";
import ReadingContent from "@/pages/aurora-site/learning/reading-content";
import SpeakingPage from "@/pages/aurora-site/learning/speaking-content";
import VocabularyPage from "@/pages/aurora-site/learning/vocabulary-content";
import CulturalAssessmentPage from "@/pages/aurora-site/learning/cultural-assessment";

import ConversationAssessmentPage from "@/pages/aurora-site/learning/conversation-assessment";
import BusinessEnglish from "@/pages/learning/business-english";

// 🎓 Certifications & Courses
import CertificationContent from "@/pages/aurora-site/english-level/english-level-content";
import CertificationsObtained from "@/pages/aurora-site/english-level/english-level-obtained";
import ModuleDetails from "@/pages/aurora-site/modules/module-details";
import CourseListing from "./pages/aurora-site/course-listing/course-listing-page";

// ⚙️ System & Settings
import Notifications from "@/pages/aurora-site/notifications";
import SettingsPage from "@/pages/aurora-site/settings";
import WalletConnection from "@/pages/aurora-site/wallet/wallet-connection";
import FAQPage from "./components/faq/faq";
import GitHubProfiles from "./components/github-profiles/profilesComponent";

// 🌐 Community & Interaction
import AuroraChat from "@/pages/aurora-site/aurora-chat";
import CommunityInteractionPage from "@/pages/aurora-site/community/community";
import TeacherDirectoryPage from "@/pages/aurora-site/teacher-directory/teacher-directory";

// 📊 Analytics & Categories
import Analytics from "@/pages/aurora-site/analytics";
import Categories from "@/pages/aurora-site/categories";

// 🏠 Main Pages
import HomePage from "@/pages/aurora-site/home";

// 🧩 Games & Challenges
import StoryGame from "@/pages/games/story-game";
import WordScramble from "@/components/games/word-scramble/word-scramble-game.jsx";
import WordMatching from "@/pages/games/word-matching";
import GamePanel from "@/pages/games/game-panel";
import DifficultySelector from "@/components/games/memory-card/difficulty-selector";
import GameBoard from "@/components/games/memory-card/game-board";
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
import PresentSimpleCoursePage from "@/pages/aurora-site/present-simple-course";
import SocialMediaCoursePage from "@/pages/aurora-site/social-media-course";

// ✨ Question Creator
import QuestionCreator from "@/components/practices/question-creator/question-creator";

// 🌐 Public Profile
import PublicProfile from "@/pages/public-profile/public-profile";

import LeaderboardPage from "@/pages/aurora-site/community/leaderboard";
import CertificatePage from "@/pages/aurora-site/certificate";
import MyRequestsPage from "@/pages/aurora-site/my-requests";
import EscrowClassesPage from "@/pages/aurora-site/escrow/classes";
import TeacherSignupPage from "@/pages/teacher-signup";

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

            {/* Public profile route - no MainLayout needed */}
            <Route path="/u/:username" element={<PublicProfile />} />

            {/* Public route */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/course-listing" element={<CourseListing />} />
              <Route path="/my-requests" element={<MyRequestsPage />} />
              <Route path="/escrow/classes" element={<EscrowClassesPage />} />
            </Route>

            {/* Protected routes with MainLayout */}

            {/*<Route element={<ProtectedRoute />}>*/}
            <Route element={<MainLayout />}>
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
              <Route path="/games/story-game" element={<StoryGame />} />
              <Route path="/games/word-scramble" element={<WordScramble />} />
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
              <Route
                path="/present-simple-course"
                element={<PresentSimpleCoursePage />}
              />
              <Route
                path="/social-media-course"
                element={<SocialMediaCoursePage />}
              />
              <Route path="/vocabulary" element={<VocabularyPage />} />
              <Route path="/speaking" element={<SpeakingPage />} />
              <Route path="/listening" element={<ListeningPage />} />
              <Route path="/reading" element={<ReadingContent />} />
              <Route
                path="/cultural-assessment"
                element={<CulturalAssessmentPage />}
              />
              <Route
                path="/conversation-assessment"
                element={<ConversationAssessmentPage />}
              />
              <Route path="/community" element={<CommunityInteractionPage />} />
              <Route
                path="/teacher-directory"
                element={<TeacherDirectoryPage />}
              />
              <Route path="/question-creator" element={<QuestionCreator />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />

              <Route path="/business-english" element={<BusinessEnglish />} />
              <Route path="/mock" element={<MockPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/team" element={<GitHubProfiles />} />
              <Route path="/nft-interact" element={<NFTInteract />} />
              <Route path="/certificate" element={<CertificatePage />} />
              <Route path="/teacher-signup" element={<TeacherSignupPage />} />

              {/*</Route>*/}
            </Route>

            {/* Redirect any unknown routes to login */}
            {/*<Route path="*" element={<Navigate to="/login" />} />*/}
          </Routes>
        </AuthProvider>
      </ToastContextProvider>
    </Router>
  );
}

export default App;
