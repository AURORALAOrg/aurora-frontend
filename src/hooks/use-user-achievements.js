import { useState, useEffect } from "react";
import axios from "axios";

export const useUserAchievements = (username) => {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Replace with your actual API endpoint
        const response = await axios.get(`/api/users/${username}/achievements`);
        setAchievements(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch user achievements"
        );
        setAchievements([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchAchievements();
    }
  }, [username]);

  return { achievements, isLoading, error };
};
