import React from 'react';
import { UserRequest } from '@/hooks/use-user-requests';
import { formatDate } from '@/utils/format-date';

const typeIcons: Record<string, JSX.Element> = {
  'Support': <span className="text-blue-500"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/></svg></span>,
  'Progress Review': <span className="text-green-500"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor"/></svg></span>,
  'Level Reassessment': <span className="text-purple-500"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4.14V2l-5.5 9h11L12 2v2.14zM12 22c-4.97 0-9-4.03-9-9 0-3.87 2.41-7.19 5.84-8.47l1.43 2.48C7.16 7.36 5 9.97 5 13c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.03-2.16-5.64-5.27-6.85l1.43-2.48C18.59 5.81 21 9.13 21 13c0 4.97-4.03 9-9 9z" fill="currentColor"/></svg></span>,
};

const statusColors: Record<string, string> = {
  'Pending': 'bg-yellow-100 text-yellow-700',
  'In Review': 'bg-blue-100 text-blue-700',
  'Resolved': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
};

export default function RequestCard({ request }: { request: UserRequest }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="shrink-0">{typeIcons[request.type]}</div>
        <div className="flex-1">
          <div className="font-semibold text-lg text-gray-900">{request.title}</div>
          <div className="text-gray-600 text-sm mt-1">{request.description}</div>
          <div className="mt-2 flex gap-2">
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">{request.type}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[request.status]}`}>{request.status}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 mt-3">
        <div className="flex gap-4">
          <span>Submitted: {formatDate(request.submittedAt)}</span>
          <span>Updated: {formatDate(request.updatedAt)}</span>
        </div>
        <a href="#" className="text-violet-600 font-medium hover:underline">View Details</a>
      </div>
    </div>
  );
} 