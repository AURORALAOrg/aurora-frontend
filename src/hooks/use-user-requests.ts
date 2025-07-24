import { useEffect, useState } from 'react';

export type UserRequest = {
  id: string;
  type: 'Support' | 'Progress Review' | 'Level Reassessment';
  status: 'Pending' | 'In Review' | 'Resolved' | 'Rejected';
  title: string;
  description: string;
  submittedAt: string;
  updatedAt: string;
};

const mockRequests: UserRequest[] = [
  {
    id: '1',
    type: 'Support',
    status: 'In Review',
    title: 'Unable to access course materials',
    description: 'I cannot access the intermediate level course materials after payment.',
    submittedAt: '2024-07-19T10:00:00Z',
    updatedAt: '2024-07-21T12:00:00Z',
  },
  {
    id: '2',
    type: 'Level Reassessment',
    status: 'Pending',
    title: 'Request for Advanced Level Assessment',
    description: 'I believe my current level placement is incorrect and would like a reassessment.',
    submittedAt: '2024-07-17T09:00:00Z',
    updatedAt: '2024-07-17T09:00:00Z',
  },
  // Add more mock requests as needed
];

export default function useUserRequests() {
  const [data, setData] = useState<UserRequest[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate API call
    const timer = setTimeout(() => {
      setData(mockRequests);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
} 