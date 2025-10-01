"use client";

export const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
}) => {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
        <label htmlFor="courseSearch" className="sr-only">Search courses</label>  
          <input  
            id="courseSearch"  
           type="search"  
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
  <div className="flex-1">
    <label htmlFor="areaFilter" className="sr-only">Filter by area</label>
    <select
      id="areaFilter"
      value={selectedArea}
      onChange={(e) => setSelectedArea(e.target.value)}
      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
    >
      <option value="all">All Areas</option>
      <option value="conversation">Basic Conversation</option>
      <option value="grammar">Grammar Foundations</option>
      <option value="culture">Cultural Insights</option>
      <option value="pronunciation">Pronunciation & Listening</option>
    </select>
  </div>
      </div>
    </div>
  );
};
