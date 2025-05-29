import { useState, useEffect } from "react";
import axios from "axios";

export const useUserStats = (username) => {
  const [stats, setStats] = useState({
    classesCompleted: 0,
    studyHours: 0,
    exercisesSolved: 0,
    currentStreak: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Replace with your actual API endpoint
        const response = await axios.get(`/api/users/${username}/stats`);
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user stats");
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchStats();
    }
  }, [username]);

  return { stats, isLoading, error };
};
