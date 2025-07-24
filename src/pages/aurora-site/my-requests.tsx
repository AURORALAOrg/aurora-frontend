import React, { useState, useMemo } from 'react';
import { Clock, Filter, Plus, FileText, TrendingUp, HelpCircle, Calendar, RefreshCw } from 'lucide-react';

// Mock data for demonstration
const mockRequests = [
  {
    id: 1,
    type: 'Support',
    title: 'Unable to access course materials',
    description: 'I cannot access the intermediate level course materials after payment.',
    status: 'In Review',
    dateSubmitted: '2024-07-19',
    lastUpdated: '2024-07-21'
  },
  {
    id: 2,
    type: 'Level Reassessment',
    title: 'Request for Advanced Level Assessment',
    description: 'I believe my current level placement is incorrect and would like a reassessment.',
    status: 'Pending',
    dateSubmitted: '2024-07-17',
    lastUpdated: '2024-07-17'
  },
  {
    id: 3,
    type: 'Progress Review',
    title: 'Monthly Progress Evaluation',
    description: 'Requesting review of my learning progress for the past month.',
    status: 'Resolved',
    dateSubmitted: '2024-07-10',
    lastUpdated: '2024-07-15'
  },
  {
    id: 4,
    type: 'Support',
    title: 'Payment Processing Issue',
    description: 'Double charge appeared on my account for subscription renewal.',
    status: 'Resolved',
    dateSubmitted: '2024-07-05',
    lastUpdated: '2024-07-08'
  },
  {
    id: 5,
    type: 'Level Reassessment',
    title: 'Beginner to Intermediate Assessment',
    description: 'Ready to move up from beginner level based on completed coursework.',
    status: 'Rejected',
    dateSubmitted: '2024-06-28',
    lastUpdated: '2024-07-02'
  }
];

// Custom hook simulation
const useUserRequests = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(mockRequests);

  const refetch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return { requests, loading, refetch };
};

// Utility function
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Request Card Component
const RequestCard = ({ request, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Support': return <HelpCircle className="w-5 h-5 text-blue-600" />;
      case 'Level Reassessment': return <TrendingUp className="w-5 h-5 text-purple-600" />;
      case 'Progress Review': return <FileText className="w-5 h-5 text-green-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getTypeIcon(request.type)}
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{request.title}</h3>
            <p className="text-sm text-gray-500">{request.type}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
          {request.status}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{request.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Submitted: {formatDate(request.dateSubmitted)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Updated: {formatDate(request.lastUpdated)}</span>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(request)}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const RequestSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <div>
          <div className="h-5 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-300 rounded-full w-20"></div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
        <div className="h-4 bg-gray-300 rounded w-28"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-20"></div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ onNewRequest }) => (
  <div className="text-center py-12">
    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
      <FileText className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests found</h3>
    <p className="text-gray-600 mb-6">You haven't submitted any requests yet. Create your first request to get started.</p>
    <button
      onClick={onNewRequest}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
    >
      <Plus className="w-5 h-5 inline-block mr-2" />
      Submit New Request
    </button>
  </div>
);

// Main Component
const MyRequestsPage = () => {
  const { requests, loading, refetch } = useUserRequests();
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('newest');
  
  const itemsPerPage = 5;

  // Filter and sort logic
  const filteredAndSortedRequests = useMemo(() => {
    let filtered = requests.filter(request => {
      const typeMatch = typeFilter === 'All Types' || request.type === typeFilter;
      const statusMatch = statusFilter === 'All Statuses' || request.status === statusFilter;
      return typeMatch && statusMatch;
    });

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.dateSubmitted).getTime();
      const dateB = new Date(b.dateSubmitted).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [requests, typeFilter, statusFilter, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRequests.length / itemsPerPage);
  const paginatedRequests = filteredAndSortedRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (request) => {
    alert(`Viewing details for: ${request.title}`);
  };

  const handleNewRequest = () => {
    alert('Redirecting to new request form...');
  };

  const types = ['All Types', 'Support', 'Level Reassessment', 'Progress Review'];
  const statuses = ['All Statuses', 'Pending', 'In Review', 'Resolved', 'Rejected'];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Requests</h1>
                <p className="text-gray-600">Track your support tickets, reviews, and assessments</p>
              </div>
            </div>
            <button
              onClick={handleNewRequest}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={refetch}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              <span className="text-sm text-gray-500">
                {filteredAndSortedRequests.length} requests found
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {loading ? (
            // Loading state
            Array.from({ length: 3 }).map((_, index) => (
              <RequestSkeleton key={index} />
            ))
          ) : filteredAndSortedRequests.length === 0 ? (
            // Empty state
            <div className="bg-white rounded-xl border border-gray-200">
              <EmptyState onNewRequest={handleNewRequest} />
            </div>
          ) : (
            // Requests list
            <>
              {paginatedRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onViewDetails={handleViewDetails}
                />
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedRequests.length)} of {filteredAndSortedRequests.length} results
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Previous
                      </button>
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              currentPage === page
                                ? 'bg-purple-600 text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequestsPage;