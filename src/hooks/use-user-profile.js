import { useState, useEffect } from "react";
import axios from "axios";

export const useUserProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Replace with your actual API endpoint
        const response = await axios.get(`/api/users/${username}/profile`);
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user profile");
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  return { profile, isLoading, error };
};
