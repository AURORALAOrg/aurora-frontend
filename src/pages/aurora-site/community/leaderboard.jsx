import { useState } from "react";
import { leaderboardUsers } from "@/data/leaderboard-users";
import { useNavigate } from "react-router-dom";
import { Filter, User as UserIcon } from "lucide-react";

const timeRanges = ["All Time", "This Month", "This Week"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const countries = [
  ...new Set(leaderboardUsers.map((u) => u.country)),
];
const communities = [
  ...new Set(leaderboardUsers.map((u) => u.community)),
];

const badgeIcons = [
  "🥇", "🥈", "🥉"
];

const LeaderboardPage = () => {
  const [search, setSearch] = useState("");
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
  const [country, setCountry] = useState("All Countries");
  const [level, setLevel] = useState("All Levels");
  const [community, setCommunity] = useState("All Communities");
  const navigate = useNavigate();

  // Filtering logic (expandable for real data)
  const filteredUsers = leaderboardUsers.filter((u) => {
    return (
      (search === "" || u.name.toLowerCase().includes(search.toLowerCase())) &&
      (country === "All Countries" || u.country === country) &&
      (level === "All Levels" || u.level === level) &&
      (community === "All Communities" || u.community === community)
    );
  });

  return (
    <div className="min-h-screen bg-[#131722] text-white pb-10">
      {/* Header */}
      <div className="container mx-auto px-4 pt-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🏆</span>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
        </div>
        <p className="text-gray-400 mb-6">
          Compete with students from around the world and track your progress with Aurora AI
        </p>
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#00b8d4] rounded-xl py-6 px-4 mb-8 text-center">
          <div>
            <p className="text-2xl font-bold">25,000+</p>
            <p className="text-blue-100">Active Students</p>
          </div>
          <div>
            <p className="text-2xl font-bold">500+</p>
            <p className="text-blue-100">AI Exercises</p>
          </div>
          <div>
            <p className="text-2xl font-bold">98%</p>
            <p className="text-blue-100">Satisfaction</p>
          </div>
          <div>
            <p className="text-2xl font-bold">15+</p>
            <p className="text-blue-100">AI Tools</p>
          </div>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-5 h-5 text-[#00b8d4]" />
          <span className="text-lg font-semibold">Filters</span>
        </div>
        <div className="bg-[#181c23] rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center">
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00b8d4]" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-[#23272f] text-white px-9 py-2 rounded-md w-56 focus:outline-none border border-[#23272f] focus:border-[#00b8d4]"
            />
          </div>
          <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="bg-[#23272f] text-white px-3 py-2 rounded-md">
            {timeRanges.map(r => <option key={r}>{r}</option>)}
          </select>
          <select value={country} onChange={e => setCountry(e.target.value)} className="bg-[#23272f] text-white px-3 py-2 rounded-md">
            <option>All Countries</option>
            {countries.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={level} onChange={e => setLevel(e.target.value)} className="bg-[#23272f] text-white px-3 py-2 rounded-md">
            <option>All Levels</option>
            {levels.map(l => <option key={l}>{l}</option>)}
          </select>
          <select value={community} onChange={e => setCommunity(e.target.value)} className="bg-[#23272f] text-white px-3 py-2 rounded-md">
            <option>All Communities</option>
            {communities.map(comm => <option key={comm}>{comm}</option>)}
          </select>
        </div>
        {/* Leaderboard List */}
        <div className="bg-[#181c23] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Top 10 Users</h2>
          <div className="divide-y divide-[#23272f]">
            {filteredUsers.slice(0, 10).map((user, idx) => (
              <button
                key={user.id}
                onClick={() => navigate(user.profileUrl)}
                className={`w-full flex items-center justify-between py-4 px-2 hover:bg-[#23272f] transition rounded-lg text-left ${idx < 3 ? "font-bold" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#23272f] flex items-center justify-center">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {idx < 3 && <span className="text-2xl">{badgeIcons[idx]}</span>}
                      <span className="text-base md:text-lg font-medium">{user.name}</span>
                    </div>
                    <div className="text-xs text-gray-400 flex gap-2 flex-wrap">
                      <span>{user.country}</span>
                      <span>•</span>
                      <span>{user.community}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.level === "Advanced" ? "bg-[#00b8d4]/20 text-[#00b8d4]" : user.level === "Intermediate" ? "bg-[#facc15]/20 text-[#facc15]" : "bg-[#a3e635]/20 text-[#a3e635]"}`}>{user.level}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#00b8d4]">{user.points.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-1">points</span>
                  </div>
                </div>
              </button>
            ))}
            {filteredUsers.length === 0 && (
              <div className="text-center text-gray-400 py-8">No users found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage; 