import { useEffect, useState } from "react";
import { UserRequest } from "@/types/user-types";
import {
  ApiResponse,
  PaginatedResponse,
  UserRequestParams,
} from "@/types/api-types";

/**
 * Mock user requests data
 */
const mockRequests: UserRequest[] = [
  {
    id: "1",
    type: "Support",
    status: "In Review",
    title: "Unable to access course materials",
    description:
      "I cannot access the intermediate level course materials after payment.",
    submittedAt: "2024-07-19T10:00:00Z",
    updatedAt: "2024-07-21T12:00:00Z",
  },
  {
    id: "2",
    type: "Level Reassessment",
    status: "Pending",
    title: "Request for Advanced Level Assessment",
    description:
      "I believe my current level placement is incorrect and would like a reassessment.",
    submittedAt: "2024-07-17T09:00:00Z",
    updatedAt: "2024-07-17T09:00:00Z",
  },
  // Add more mock requests as needed
];

/**
 * Hook for fetching and managing user requests
 * @param params Optional filter parameters
 * @returns Request data, loading state and error info
 */
export default function useUserRequests(params?: UserRequestParams) {
  const [data, setData] = useState<UserRequest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // In a real implementation, this would use axios or fetch to call the API
    // with params for filtering and pagination
    const fetchUserRequests = async () => {
      try {
        // Simulate API call with optional filtering
        const filteredRequests = params
          ? mockRequests.filter((req) => {
              if (params.type && req.type !== params.type) return false;
              if (params.status && req.status !== params.status) return false;
              if (
                params.searchQuery &&
                !req.title
                  .toLowerCase()
                  .includes(params.searchQuery.toLowerCase()) &&
                !req.description
                  .toLowerCase()
                  .includes(params.searchQuery.toLowerCase())
              ) {
                return false;
              }
              return true;
            })
          : mockRequests;

        // Simulate delayed response
        setTimeout(() => {
          setData(filteredRequests);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch user requests"
        );
        setLoading(false);
      }
    };

    fetchUserRequests();

    return () => {
      // Cleanup for any pending requests if needed
    };
  }, [params]);

  return { data, loading, error };
}
