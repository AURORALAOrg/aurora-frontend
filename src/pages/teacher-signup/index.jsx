import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  Globe,
  Zap,
  ArrowRight,
  Star,
  Calendar,
  DollarSign,
  MessageSquare,
  KeyRound,
  Users,
  Gift,
  Clock as ClockIcon,
  Rocket,
} from "lucide-react";
import logger from "@/lib/logger";

const TeacherSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    walletAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logger.info("Teacher signup form submitted", { email: formData.email });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-dark-blue-6">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0b1221] to-dark-blue-6 border-b border-dark-blue-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Transform Your Teaching Career
              <br className="hidden md:block" />
              Earn Crypto Teaching Languages
            </h1>
            <p className="mt-4 text-neutral-3 max-w-3xl mx-auto">
              Join the future of education where teachers earn instant
              cryptocurrency payments, reach students worldwide, and build
              successful careers without traditional banking barriers.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#signup"
                className="inline-flex items-center justify-center gap-2 bg-light-blue-1 text-white px-6 py-3 rounded-md font-semibold hover:opacity-95"
              >
                <span>Join Waitlist Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center gap-2 bg-dark-blue-5 border border-dark-blue-4 text-white px-6 py-3 rounded-md hover:bg-dark-blue-4"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Learn More</span>
              </a>
            </div>
          </div>

          {/* Top Benefits */}
          <div
            id="learn-more"
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
              <div className="w-10 h-10 rounded-md bg-light-blue-1/20 text-light-blue-1 flex items-center justify-center mb-3">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold mb-1">
                Instant Crypto Payments
              </h3>
              <p className="text-neutral-3 text-sm">
                Get paid instantly in cryptocurrency.
              </p>
            </div>
            <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
              <div className="w-10 h-10 rounded-md bg-light-blue-1/20 text-light-blue-1 flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold mb-1">Global Students</h3>
              <p className="text-neutral-3 text-sm">
                Access students worldwide through our platform.
              </p>
            </div>
            <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
              <div className="w-10 h-10 rounded-md bg-light-blue-1/20 text-light-blue-1 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold mb-1">Zero Fees</h3>
              <p className="text-neutral-3 text-sm">
                No banking fees or international transfer costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <KeyRound className="w-5 h-5 text-light-blue-1" />
              <span className="text-white font-semibold">Sign Up & Verify</span>
            </div>
            <p className="text-neutral-3 text-sm">
              Register and verify your teaching profile with VeriPH.
            </p>
          </div>
          <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-light-blue-1" />
              <span className="text-white font-semibold">Get Matched</span>
            </div>
            <p className="text-neutral-3 text-sm">
              Connect with students worldwide who are looking for teachers like
              you.
            </p>
          </div>
          <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-light-blue-1" />
              <span className="text-white font-semibold">Teach & Earn</span>
            </div>
            <p className="text-neutral-3 text-sm">
              Deliver lessons, and get paid instantly in crypto.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose AURORA + Teacher Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <h2 className="text-2xl font-bold text-white mb-4">Teacher Benefits</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
              <ul className="space-y-3 text-neutral-3 text-sm">
                <li className="flex items-start gap-2">
                  <ClockIcon className="w-5 h-5 text-light-blue-1 mt-0.5" />{" "}
                  Flexible Schedule — Teach when it works best for you.
                </li>
                <li className="flex items-start gap-2">
                  <Wallet className="w-5 h-5 text-light-blue-1 mt-0.5" />{" "}
                  Borderless Payments — No banks, no middlemen, no delays.
                </li>
                <li className="flex items-start gap-2">
                  <Gift className="w-5 h-5 text-light-blue-1 mt-0.5" /> Crypto
                  Rewards — Earn bonus tokens for referrals and top ratings.
                </li>
                <li className="flex items-start gap-2">
                  <Rocket className="w-5 h-5 text-light-blue-1 mt-0.5" /> Global
                  Exposure — Grow your reputation as an international educator.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
            <h3 className="text-white text-xl font-semibold mb-2">
              What Success Looks Like
            </h3>
            <div className="flex items-center gap-6 text-neutral-3 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-light-blue-1" />
                <span>Avg. $25–$40/hour</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-light-blue-1" />
                <span>Flexible schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-light-blue-1" />
                <span>Global reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section
        id="signup"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-blue-5 border border-dark-blue-4 rounded-lg p-6">
            <h3 className="text-white text-xl font-semibold mb-4">
              Join the Waitlist
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder:text-gray-400"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder:text-gray-400"
                required
              />
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Wallet className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="walletAddress"
                  placeholder="Wallet Address (optional)"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                  className="w-full pl-10 px-4 py-3 bg-[#1f2937] border border-[#374151] rounded-md text-white placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-light-blue-1 text-white font-semibold py-3 rounded-md hover:opacity-95 flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4" /> Start Earning Crypto Today
              </button>
              <p className="text-neutral-3 text-xs text-center">
                🚀 Get started in 5 minutes • No upfront costs • Instant crypto
                payments
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherSignupPage;
